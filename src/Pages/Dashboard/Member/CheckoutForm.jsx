import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const CheckoutForm = () => {

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    // const [transactionID, setTransactionID] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();


    const month = localStorage.getItem('month');
    const id = localStorage.getItem('id');


    const [agreement, setAgreement] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/getAgreementPayment/${id}`)
            .then(res => {
                setAgreement(res.data);

                axiosSecure.post('/create-payment-intent', { rent: res.data.rent })
                    .then(res => {
                        setClientSecret(res.data.clientSecret);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }, [axiosSecure, id, agreement]);



    // useEffect(() => {
    //     if (agreement.rent > 0) {
    //         axiosSecure.post('/create-payment-intent', { rent: agreement.rent })
    //             .then(res => {
    //                 console.log(res.data.clientSecret);
    //                 setClientSecret(res.data.clientSecret);
    //             })
    //     }
    // }, [axiosSecure, agreement]);


    const handleCoupon = async (e) => {
        e.preventDefault()

        let coupon = document.getElementById('couponID');

        if (coupon.value !== '') {
            await axiosSecure.get(`/getCouponPercentage/${coupon.value}`)
                .then(res => {
                    if (res.data === '') {
                        toast.error('Your coupon is wrong!', {
                            position: "top-center",
                            autoClose: 500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        return;
                    }
                    if (res.data.coupon_status === 'on') {
                        let button = document.getElementById("couponButton");
                        button.disabled = true;
                        const percentage = parseInt(res.data.discount_percentage);
                        let x = localStorage.getItem('rent');
                        x = x - ((x * percentage) / 100);
                        localStorage.setItem('rent', x);
                        return;
                    }
                    if (res.data.coupon_status === 'off') {
                        toast.error('This coupon in not active now!', {
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
        else {
            toast.error('Coupon field is empty!', {
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


    }




    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error);
            setError(error.message);
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log(confirmError);
        }
        else {
            // console.log('Payment Intent: ', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                // console.log('Transaction ID: ', paymentIntent.id);
                // setTransactionID(paymentIntent.id);

                const paymentInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    agreement_id: agreement._id,
                    floor_no: agreement.floor_no,
                    block_name: agreement.block_name,
                    apartment_no: agreement.apartment_no,
                    // rent: agreement.rent,
                    rent: localStorage.getItem('rent'),
                    payMonth: month,
                    paymentDate: moment().format("h:mm:ss a, DD MMMM, YYYY"),
                    transactionId: paymentIntent.id,
                }
                await axiosSecure.post('/savePaymentHistory', paymentInfo)


                Swal.fire({
                    title: "Payment Successful!",
                    icon: "success"
                });

                navigate('/dashboard/paymentHistory');
            }
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            >
            </CardElement>
            <div className="mt-10 flex flex-col space-y-4">

                <h2 className="text-center text-xl font-semibold">Rent: {localStorage.getItem('rent')}</h2>

                <div className="flex items-center justify-center">
                    <input id="couponID" type="text" placeholder="coupon" className="input input-bordered w-full max-w-xs rounded-r-none" />
                    <button id="couponButton" onClick={handleCoupon} className="btn btn-accent rounded-l-none">Apply Coupon</button>
                </div>

                <button className="btn btn-primary" type="submit" disabled={!stripe || !clientSecret}>Pay</button>
            </div>

            <p className="mt-6 text-center text-red-500">{error}</p>

            {/* {
                transactionID && <p className="text-green-500">Your transaction successfully. transactionID: {transactionID} </p>
            } */}
            <ToastContainer />
        </form>
    );
};

export default CheckoutForm;