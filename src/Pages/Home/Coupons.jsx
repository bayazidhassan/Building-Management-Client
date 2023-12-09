import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Coupons = () => {


    const axiosSecure = useAxiosSecure();
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        axiosSecure.get('/getAllCoupons')
            .then(res => {
                setCoupons(res.data);
            })
    }, [axiosSecure]);

    return (
        <div className="my-16 lg:my-28">

            <dir className="divider"></dir>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
                {
                    coupons.map(coupon => <div key={coupon._id} className="flex flex-col items-center gap-2">
                        <h2 className={`${coupon.coupon_status === 'on' ? 'badge badge-warning' : 'badge badge-ghost'} p-6 lg:p-8 text-lg font-bold`}>{coupon.coupon_code}</h2>
                        <h2 className="text-slate-500 font-semibold">{`GET ${coupon.discount_percentage}% DISCOUNT`}</h2>
                    </div>)
                }
            </div>
            <dir className="divider"></dir>
        </div>
    );
};

export default Coupons;