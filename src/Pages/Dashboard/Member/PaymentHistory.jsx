import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";


const PaymentHistory = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [originalPaymentHistory, setOriginalPaymentHistory] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        axiosSecure.get(`/getPaymentHistory/${user?.email}`)
            .then(res => {
                setOriginalPaymentHistory(res.data);
                setPaymentHistory(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [axiosSecure, user]);


    const handleSearch = () => {
        const searchPaymentHistory = originalPaymentHistory.filter((p) =>
            p.payMonth.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setPaymentHistory(searchPaymentHistory);
    }
    const resetSearch = () => {
        setPaymentHistory(originalPaymentHistory);
        setSearchTerm("");
    };




    return (
        <div>

            <h2 className="text-2xl font-bold underline text-center text-cyan-500 mt-4">Payment History</h2>

            <div className="mt-10 flex flex-col lg:flex-row gap-2 justify-center">
                <input placeholder="enter month name" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input input-bordered w-full max-w-xs" />
                <button className="btn btn-info" onClick={handleSearch}>Search</button>
                <button className="btn btn-error" onClick={resetSearch}>Reset</button>
            </div>


            <div className="mt-4 overflow-x-auto">

                <table className="table">

                    <thead>
                        <tr className="text-center text-xl font-bold">
                            <th>#</th>
                            <th>Floor</th>
                            <th>Block</th>
                            <th>Apartment</th>
                            <th>Rent</th>
                            <th>Month</th>
                            <th>Payment Date</th>
                            <th>Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paymentHistory.map((agreement, index) =>
                                <tr className="text-center" key={agreement._id}>
                                    <th>
                                        {index + 1}
                                    </th>
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
                                        {agreement?.payMonth}
                                    </td>
                                    <td>
                                        {agreement?.paymentDate}
                                    </td>
                                    <td>
                                        {agreement?.transactionId}
                                    </td>
                                </tr>)
                        }
                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default PaymentHistory;