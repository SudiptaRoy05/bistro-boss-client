import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export default function useCart() {

    const axiosSecure = useAxiosSecure()
    const { data: cart } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/carts')
            return data;
        }

    })
    return [cart]

}
