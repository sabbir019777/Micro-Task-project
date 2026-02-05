import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useNotifications = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: notifications = [], refetch } = useQuery({
        queryKey: ['notifications', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/notifications/${user?.email}`);
            return res.data;
        }
    });

    return [notifications, refetch];
};

export default useNotifications;