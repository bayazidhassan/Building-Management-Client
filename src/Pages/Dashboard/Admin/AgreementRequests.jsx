import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

const AgreementRequests = () => {

    const axiosSecure = useAxiosSecure();
    const date = moment().format("DD MMMM, YYYY")


    const { data: agreements = [], refetch } = useQuery({
        queryKey: ['agreements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/getAllAgreements')
            return res.data;
        }
    });



    const handleAccept = async (agreement) => {

        const data = {
            id: agreement._id,
            apartment_id: agreement.apartment_id,
            date: date
        }

        await axiosSecure.patch(`/setMemberRole/${agreement.email}`, data)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Accept!', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    refetch();
                }
                else {
                    toast.error('Already accepted!', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }



    const handleReject = async (agreement) => {
        const data = {
            id: agreement._id,
            apartment_id: agreement.apartment_id
        }
        await axiosSecure.patch('/setRejectStatus', data)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    toast.success('Reject!', {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    refetch();
                }
            })
            .catch(error => {
                console.log(error);
            })
    }




    return (
        <div>

            <h2 className="text-2xl font-bold underline text-center text-cyan-500 mt-4">Agreement Request</h2>

            <div className="mt-10 overflow-x-auto">

                <table className="table">

                    <thead>
                        <tr className="text-center text-xl font-bold">
                            {/* <th>#</th> */}
                            <th>Name</th>
                            <th>Email</th>
                            <th>Floor</th>
                            <th>Block</th>
                            <th>Apartment</th>
                            <th>Rent</th>
                            <th>Request Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // agreements.map((agreement, index) =>
                            agreements.map((agreement) =>
                                <tr className="text-center" key={agreement._id}>
                                    {/* <th>
                                        {index + 1}
                                    </th> */}
                                    <td>
                                        {agreement?.name}
                                    </td>
                                    <td>
                                        {agreement?.email}
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
                                        {
                                            agreement?.status === 'pending' ?
                                                <h2 className="text-red-500 font-bold">{agreement.status}</h2>
                                                :
                                                <h2 className="text-green-500 font-bold">{agreement.status}</h2>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleAccept(agreement)} className="btn btn-success">Accept</button>
                                        <button onClick={() => handleReject(agreement)} className="mt-2 btn btn-error">Reject</button>
                                    </td>
                                </tr>)
                        }
                    </tbody>

                </table>

            </div>
            <ToastContainer />

        </div>
    );
};

export default AgreementRequests;