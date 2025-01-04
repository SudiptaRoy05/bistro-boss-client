import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

export default function useCart() {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/carts?email=${user.email}`)
            return data;
        }

    })
    return [cart, refetch]

}
