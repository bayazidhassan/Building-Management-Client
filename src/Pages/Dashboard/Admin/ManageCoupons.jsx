import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageCoupons = () => {

    const axiosSecure = useAxiosSecure();

    const { data: coupons = [], refetch } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/getAllCoupons')
            return res.data;
        }
    });


    const handleAvailability = (coupon) => {

        const data = {
            id: coupon._id,
            status: coupon.coupon_status === 'on' ? 'off' : 'on'
        }
        axiosSecure.patch('/changeCouponStatus', data)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleAddCoupon = (e) => {
        const form = e.target;
        const coupon_code = form.coupon_code.value;
        const discount_percentage = form.discount_percentage.value;
        const coupon_description = form.coupon_description.value;
        form.reset();

        const coupon_data = {
            coupon_code: coupon_code,
            discount_percentage: discount_percentage,
            coupon_description: coupon_description,
            coupon_status: 'on'
        }

        axiosSecure.post('/addCoupon', coupon_data)
            .then(res => {
                if (res.data._id) {
                    toast.success('Coupon added successfully', {
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

            <h2 className="text-2xl font-bold underline text-center text-cyan-500 mt-4">Manage  coupons</h2>

            <div className="my-10 flex justify-center">
                <button className="btn btn-accent" onClick={() => document.getElementById('my_modal_1').showModal()}>ADD COUPON</button>
            </div>


            <div className="mt-10 overflow-x-auto">

                <table className="table">
                    <thead>
                        <tr className="text-center text-xl font-bold">
                            <th>#</th>
                            <th>Coupon code</th>
                            <th>Discount percentage</th>
                            <th>Coupon description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            coupons.map((coupon, index) =>
                                <tr className="text-center" key={coupon._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        {
                                            coupon?.coupon_code
                                        }
                                    </td>
                                    <td>
                                        {
                                            coupon?.discount_percentage
                                        }
                                    </td>
                                    <td>
                                        {
                                            coupon?.coupon_description
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleAvailability(coupon)} className={`${coupon.coupon_status === 'on' ? 'btn btn-error' : 'btn btn-success'} `}>
                                            {coupon.coupon_status === 'on' ? 'OFF' : 'ON'}
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>

            </div>

            <div>

                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <form onSubmit={handleAddCoupon} className="card-body" method="dialog">
                            <div className="form-control">
                                <label className="label hidden md:flex">
                                    <span className="label-text">Coupon Code</span>
                                </label>
                                <input required type="text" name="coupon_code" placeholder="coupon code" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label hidden md:flex">
                                    <span className="label-text">Discount Percentage</span>
                                </label>
                                <input required type="text" name="discount_percentage" placeholder="discount percentage" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label hidden md:flex">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea required name="coupon_description" placeholder="write a description" className="input input-bordered"></textarea>
                            </div>
                            <div className="form-control mt-2">
                                <input className="btn btn-primary" type="submit" value="SUBMIT" />
                            </div>
                        </form>
                        <div className="modal-action flex justify-center -mt-4">
                            <form method="dialog">
                                <button className="btn btn-warning">ClOSE</button>
                            </form>
                        </div>
                    </div>
                </dialog>

            </div>
            <ToastContainer />
        </div>
    );
};

export default ManageCoupons;