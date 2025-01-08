import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Components/Loading";
import useAdmin from "../Hook/useAdmin"
import useAuth from "../Hook/useAuth";

export default function AdminRoutes({ childrean }) {
    const { user, loading } = useAuth()
    const [isAdmin, isAdminLOading] = useAdmin();
    const location = useLocation();
    if (Loading || isAdminLOading) {
        return <Loading></Loading>
    }
    if (user && isAdmin) {
        return childrean
    }

    return <Navigate to='/login' state={{ form: location }} replace></Navigate>
}
