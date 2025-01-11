import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import useCart from '../../Hook/useCart';
import { SiQwant } from 'react-icons/si';
import useAuth from '../../Hook/useAuth';

export default function CheckoutForm() {
    const { user } = useAuth()
    const [errors, setError] = useState();
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart] = useCart();
    const price = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                console.log(res.data);
                setClientSecret(res.data.clientSecret)
            })
    }, [])
    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setError(error.message)
            console.log('payment error', error)
        } else {
            setError(' ')
            console.log('payment method', paymentMethod)
        }

        // confirmPayment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName || 'Anonymous',
                }
            }
        })
        if (confirmError) {
            console.log('error', confirmError)
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id)
                setTransactionId(paymentIntent.id)
            }
        }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white shadow-md rounded-md p-4">
                <CardElement
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#374151',
                                '::placeholder': {
                                    color: '#9CA3AF',
                                },
                            },
                            invalid: {
                                color: '#DC2626',
                            },
                        },
                    }}
                />
            </div>
            <button
                className="btn btn-primary w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 disabled:opacity-50"
                type="submit"
                disabled={!stripe || !clientSecret}
            >
                Pay
            </button>
            <p className='text-red-600'>{errors}</p>
            {transactionId && <p className='text-green-600'>Your transactionId {transactionId}</p>}
        </form>
    )
}
