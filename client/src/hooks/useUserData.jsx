import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useUserData = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userData = {}, refetch } = useQuery({
        queryKey: ['userData', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    });

    return [userData, refetch];
};

export default useUserData;