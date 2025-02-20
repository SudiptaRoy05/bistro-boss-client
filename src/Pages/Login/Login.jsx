import { useContext, useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SocialLogin from '../../Components/SocialLogin';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const fromPath = location.state?.from?.pathname || '/';
    console.log(fromPath)



    const captchaRef = useRef(null);
    const [disable, setDisable] = useState(true);
    const { login } = useContext(AuthContext);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');

        login(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);

                // Show success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome back, ${user.displayName || 'User'}!`,
                    confirmButtonColor: '#3085d6',
                });


            })
            .catch((error) => {
                console.error(error);

                // Show error alert
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid email or password. Please try again.',
                    confirmButtonColor: '#d33',
                });
            });
        // console.log(fromPath)
        navigate(fromPath, { replace: true });
    };

    const handleValidateCaptcha = (e) => {
        e.preventDefault();
        const userCapValue = captchaRef.current.value;

        if (validateCaptcha(userCapValue)) {
            setDisable(false);

            // Show success alert for valid captcha
            Swal.fire({
                icon: 'success',
                title: 'Captcha Validated',
                text: 'You can now proceed to login.',
                confirmButtonColor: '#3085d6',
            });
        } else {
            setDisable(true);

            // Show error alert for invalid captcha
            Swal.fire({
                icon: 'error',
                title: 'Invalid Captcha',
                text: 'Please try again.',
                confirmButtonColor: '#d33',
            });
        }
    };

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
                                placeholder="Type the captcha above"
                                className="input input-bordered"
                                required
                            />
                            <button
                                onClick={handleValidateCaptcha}
                                className="btn btn-outline btn-xs mt-2"
                            >
                                Validate
                            </button>
                            {/* can use onBlur if i dont want to use btn */}
                        </div>
                        {/* Login Button */}
                        <div className="form-control mt-6">
                            <input
                                type="submit"
                                disabled={disable}
                                className="btn btn-primary w-full"
                                value="Login"
                            />
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
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
}
