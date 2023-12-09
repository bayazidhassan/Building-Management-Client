import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";


const MakePayment = () => {

    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const { data: agreements = [] } = useQuery({
        queryKey: ['agreements'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/paymentAgreements/${user?.email}`)
            return res.data;
        }
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        localStorage.setItem('month', form.month.value);
        localStorage.setItem('id', form.id.value);
        localStorage.setItem('rent', form.rent.value);

        navigate('/dashboard/payment');
    }


    return (
        <div>

            <h2 className="text-2xl font-bold underline text-center text-cyan-500 mt-4 mb-10">Payment History</h2>

            <div className="card shadow-2xl bg-base-100">
                {
                    agreements.map(agreement =>
                        <form key={agreement._id} onSubmit={handleSubmit} className="card-body">
                            <img className="w-full h-32 md:h-60 rounded-lg" src={agreement.apartment_image} alt="" />
                            <div className="flex flex-col lg:flex-row gap-2">
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Member email:</span>
                                    </label>
                                    <input placeholder={agreement?.email} readOnly type="text" className="input input-bordered w-full max-w-xs" />
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Floor no:</span>
                                    </label>
                                    <input placeholder={agreement?.floor_no} readOnly type="text" className="input input-bordered w-full max-w-xs" />
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-2">
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Block no:</span>
                                    </label>
                                    <input placeholder={agreement?.block_name} readOnly type="text" className="input input-bordered w-full max-w-xs" />
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Apartment no:</span>
                                    </label>
                                    <input placeholder={agreement?.apartment_no} readOnly type="text" className="input input-bordered w-full max-w-xs" />
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-2">
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Rent:</span>
                                    </label>
                                    <input placeholder={agreement?.rent} name="rent" defaultValue={agreement?.rent} readOnly type="text" className="input input-bordered w-full max-w-xs" />
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-red-500">*Month:</span>
                                    </label>
                                    <select name="month" className="select select-bordered border-red-500 w-full max-w-xs">
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                    </select>
                                </div>
                            </div>
                            <input placeholder={agreement?._id} defaultValue={agreement?._id} name="id" type="text" className="hidden input input-bordered w-full max-w-xs" />
                            <input className="btn btn-accent mt-2" type="submit" value="Make Payment" />

                            <dir className="divider"></dir>
                        </form>
                    )

                }
            </div>

        </div>
    );
};

export default MakePayment;