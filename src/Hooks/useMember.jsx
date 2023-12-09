import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";



const useMember = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: isMember, isPending: isMemberLoading } = useQuery({
        queryKey: [user?.email, 'isMember'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/member/${user.email}`);
            return res.data?.member;
        }
    });
    return [isMember, isMemberLoading]

};

export default useMember;