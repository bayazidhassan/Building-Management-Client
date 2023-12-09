import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";



const MemberHome = () => {

    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();


    const { data: agreements = [] } = useQuery({
        queryKey: ['agreements'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/getAgreements/${user?.email}`)
            return res.data;
        }
    });



    return (
        <div>
            <div className="flex gap-4">
                <img className="w-16 md:w-24 h-16 md:h-24 rounded-lg" src={user?.photoURL} alt="" />
                <h2 className="text-xl text-cyan-500 font-bold">Member</h2>
            </div>
            <h2>Name: {user?.displayName}</h2>
            <h2>Email: {user?.email}</h2>

            <dir className="divider"></dir>


            <div className="mt-10 overflow-x-auto">

                <table className="table">

                    <thead>
                        <tr className="text-center text-xl font-bold">
                            <th>#</th>
                            <th>Image</th>
                            <th>Floor</th>
                            <th>Block</th>
                            <th>Apartment</th>
                            <th>Rent</th>
                            <th>Request Date</th>
                            <th>Accept Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            agreements.map((agreement, index) =>
                                <tr className="text-center" key={agreement._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={agreement?.apartment_image} alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {agreement?.floor_no}
                                    </td>
                                    <td>
                                        {agreement?.block_name}
                                    </td>
                                    <td>
                                        {agreement?.apartment_no}
                                    </td>
                                    <td>
                                        {agreement?.rent}
                                    </td>
                                    <td>
                                        {agreement?.date}
                                    </td>
                                    <td>
                                        {agreement?.accept_date}
                                    </td>
                                    <td>
                                        {
                                            agreement?.status === 'pending' ?
                                                <h2 className="text-red-500 font-bold">{agreement.status}</h2>
                                                :
                                                <h2 className="text-green-500 font-bold">{agreement.status}</h2>
                                        }
                                    </td>
                                </tr>)
                        }
                    </tbody>

                </table>

            </div>


        </div>
    );
};

export default MemberHome;