import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { Result } from "postcss";

export default function Register() {
    const { createUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = data => {
        console.log(data);
        const email = data.email;
        const password = data.password;
        createUser(email, password)
            .then(Result => {
                const user = Result.user
                console.log(user);
            })
    }



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
                                {...register("name", { required: true })}
                                placeholder="Enter your name"
                                className="input input-bordered w-full text-gray-800"
                            />
                            {errors.name && <span className="text-red-600">This field is required</span>}
                        </div>
                        {/* Image Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Image URL</span>
                            </label>
                            <input
                                type="url"
                                name="image"
                                {...register("image")}
                                placeholder="Enter image URL"
                                className="input input-bordered w-full text-gray-800"
                                required
                            />
                        </div>
                        {/* Email Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                {...register("email", { required: true })}
                                placeholder="Enter your email"
                                className="input input-bordered w-full text-gray-800"
                            />
                            {errors.email && <span className="text-red-600">This field is required</span>}
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
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/
                                })}
                                placeholder="Enter your password"
                                className="input input-bordered w-full text-gray-800"
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-primary">Forgot password?</a>
                            </label>
                            {errors.password?.type === "required" && <span className="text-red-600">This field is required</span>}
                            {errors.password?.type === 'minLength' && <span className="text-red-600">password should be minimum 6 character</span>}
                            {errors.password?.type === 'maxLength' && <span className="text-red-600">passwor must be less than 20 character</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-600">passwor must one uppercase one lowercase minimum one number and a special charecter</span>}
                        </div>
                        {/* Register Button */}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary w-full text-white hover:bg-primary-dark">
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
                </div>
            </div>
        </div>
    );
}
