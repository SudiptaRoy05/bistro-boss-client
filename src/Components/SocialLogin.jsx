import { FcGoogle } from 'react-icons/fc';
import useAuth from '../Hook/useAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Hook/useAxiosPublic';

export default function SocialLogin() {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { googleLogin } = useAuth();
    const handleSocialLOgin = () => {
        googleLogin()
            .then(result => {
                console.log(result);
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    image: result.user?.photoURL,
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                    })
            })
        navigate('/');
    }
    return (
        <div>
            <div className="form-control mt-2">
                <button
                    onClick={handleSocialLOgin}
                    className="btn btn-outline w-full flex items-center justify-center gap-2 text-primary hover:bg-primary-light hover:text-white"
                >
                    <FcGoogle size={20} />
                    Continue with Google
                </button>
            </div>
        </div>
    );
}
