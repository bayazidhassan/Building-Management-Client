import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import moment from 'moment';
import useAdmin from '../Hooks/useAdmin';
import Swal from 'sweetalert2'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from "framer-motion"


const ApartmentsShow = ({ apartment }) => {

    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [isAdmin] = useAdmin();

    const { user } = useContext(AuthContext);
    const { _id, floor_no, block_name, apartment_image, apartment_no, rent } = apartment;

    const date = moment().format("DD MMMM, YYYY")


    const handleAgreement = async () => {

        if (isAdmin) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Only member or user can agreement!",
            });
            return;
        }


        if (user) {
            await axiosSecure.get(`/getApartmentStatus/${_id}`)
                .then(res => {

                    if (res.data === 'pending') {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "This apartment is already requested!",
                        });
                        return;
                    }
                    if (res.data === 'booked') {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "This apartment is already booked!",
                        });
                        return;
                    }
                    if (res.data !== 'pending' && res.data !== 'booked') {

                        const agreementInfo = {
                            apartment_id: _id,
                            name: user?.displayName,
                            email: user?.email,
                            floor_no: floor_no,
                            block_name: block_name,
                            apartment_no: apartment_no,
                            apartment_image: apartment_image,
                            rent: rent,
                            date: date,
                            accept_date: '------',
                            status: 'pending'
                        }

                        axiosSecure.patch(`/setApartmentStatusPending/${_id}`)
                            .then()
                            .catch(error => {
                                console.log(error);
                            })

                        axiosSecure.post('/setAgreements', agreementInfo)
                            .then(res => {
                                if (res.data._id) {
                                    toast.success('Your request send to owner', {
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
                })
                .catch(error => {
                    console.log(error);
                })
        }
        else {
            toast.error('Login first', {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/login');
        }
    }




    const aosEffects = [
        'fade-up',
        'fade-down',
        'flip-up',
        'flip-down',
        'zoom-in',
        'zoom-in-up',
        'zoom-in-down',
        'zoom-out',
        'zoom-out-up',
        'zoom-out-down',

    ];

    const getRandomAosEffect = () => {
        const randomIndex = Math.floor(Math.random() * aosEffects.length);
        return aosEffects[randomIndex];
    };

    useEffect(() => {
        AOS.init();
        AOS.refresh();
        window.addEventListener('scroll', () => {
            AOS.refresh();
        });
        return () => {
            window.removeEventListener('scroll', () => {
                AOS.refresh();
            });
        };
    }, []);




    return (
        <div data-aos={getRandomAosEffect()} className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={apartment_image} alt="apartment" /></figure>
            <div className="card-body">

                <h2 className="card-title text-lg lg:text-xl">Floor no: {floor_no}</h2>
                <h2 className="card-title text-lg lg:text-xl">Block name: {block_name}</h2>
                <h2 className="card-title text-lg lg:text-xl">Apartment no: {apartment_no}</h2>
                <h2 className="card-title text-lg lg:text-xl">Rent: {rent}</h2>

                <div className="card-actions justify-center">
                    <button onClick={handleAgreement} className="btn btn-accent md:text-lg">Agreement</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

ApartmentsShow.propTypes = {
    apartment: PropTypes.object
};

export default ApartmentsShow;