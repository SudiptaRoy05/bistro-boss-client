import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from 'sweetalert2';
import useAxiosPublic from "../../Hook/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin";

export default function Register() {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const fromPath = location.state?.from?.pathname || '/';
    console.log(fromPath)
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        const email = data.email;
        const password = data.password;
        const name = data.name;
        const image = data.image;

        // Create user
        createUser(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);

                // Update user profile
                updateUserProfile(name, image)
                    .then(() => {
                        console.log("User profile updated");

                        const userInfo = {
                            name: name,
                            email: email,
                            image: image,
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                console.log(res.data)
                                if (res.data.insertedId) {
                                    // SweetAlert2 success alert
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Registration Successful!',
                                        text: 'Your account has been created and profile updated.',
                                        showConfirmButton: true,
                                        timer: 3000, // Optional: Automatically close after 3 seconds
                                    });

                                    reset(); // Reset form
                                }
                            })

                    })
                    .catch((error) => {
                        console.error(error.message);
                        // SweetAlert2 error alert for profile update
                        Swal.fire({
                            icon: 'error',
                            title: 'Profile Update Failed',
                            text: error.message,
                            showConfirmButton: true,
                        });
                    });

                navigate(fromPath, { replace: true });
            })
            .catch((error) => {
                console.error(error.message);

                // SweetAlert2 error alert for registration failure
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message,
                    showConfirmButton: true,
                });
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen px-4">
            <Helmet>
                <title>Bistro Boss | Register</title>
            </Helmet>
            <div className="hero-content flex flex-col lg:flex-row-reverse items-center gap-12">
                {/* Text Section */}
                <div className="text-center lg:text-left max-w-lg">
                    <h1 className="text-5xl font-bold text-primary">Register now!</h1>
                    <p className="py-6 text-gray-600">
                        Join us today and explore the best features. Create your account now and start your journey.
                    </p>
                </div>
                {/* Form Section */}
                <div className="card bg-white w-full max-w-md shrink-0 shadow-xl border border-gray-200 rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-4">
                        {/* Name Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                {...register("name", { required: "Name is required" })}
                                placeholder="Enter your name"
                                className="input input-bordered w-full text-gray-800"
                            />
                            {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                        </div>
                        {/* Image Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Image URL</span>
                            </label>
                            <input
                                type="url"
                                name="image"
                                {...register("image", { pattern: { value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/, message: "Invalid image URL" } })}
                                placeholder="Enter image URL"
                                className="input input-bordered w-full text-gray-800"
                            />
                            {errors.image && <span className="text-red-600">{errors.image.message}</span>}
                        </div>
                        {/* Email Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                {...register("email", { required: "Email is required" })}
                                placeholder="Enter your email"
                                className="input input-bordered w-full text-gray-800"
                            />
                            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                        </div>

                        {/* Password Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    maxLength: { value: 20, message: "Password must be less than 20 characters" },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
                                        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                                    }
                                })}
                                placeholder="Enter your password"
                                className="input input-bordered w-full text-gray-800"
                            />
                            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                        </div>

                        {/* Register Button */}
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full text-white hover:bg-primary-dark">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="text-center py-4">
                        <span className="text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-primary font-medium hover:underline"
                            >
                                Login here
                            </Link>
                        </span>
                    </div>
                    {/* Continue with Login Button */}
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
}
