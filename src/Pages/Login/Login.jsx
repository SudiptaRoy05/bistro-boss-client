import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Login() {
    const captchaRef = useRef(null)
    const [diasble, setDisable] = useState(true);
    const { login, } = useContext(AuthContext);
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])
    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');

        console.table({ email, password })
        login(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
            })
    }
    const handleValidateCaptcha = () => {
        const userCapValue = captchaRef.current.value;
        console.log(userCapValue)
        if (validateCaptcha(userCapValue)) {
            setDisable(false)
        }
        else {
            setDisable(true)
        }
    }
    return (
        <div className="hero bg-base-200 min-h-screen px-4">
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="hero-content flex flex-col lg:flex-row gap-12 items-center">
                {/* Text Section */}
                <div className="text-center lg:text-left max-w-lg">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                {/* Form Section */}
                <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        {/* Email Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        {/* Password Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered"
                                required
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input
                                type="text"
                                name="captcha"
                                ref={captchaRef}
                                placeholder="type the captcha above"
                                className="input input-bordered"
                                required

                            />
                            <button onClick={handleValidateCaptcha} className='btn btn-outline btn-xs mt-2'>Validate</button>

                        </div>
                        {/* Login Button */}
                        <div className="form-control mt-6">
                            <input type="submit" disabled={diasble} className="btn btn-primary w-full" value="Login" />
                        </div>
                    </form>
                    <div className="text-center py-4">
                        <span className="text-gray-600">
                            Don’t have an account?{" "}
                            <Link
                                to="/register"
                                className="text-primary font-medium hover:underline"
                            >
                                Register here
                            </Link>
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
}
