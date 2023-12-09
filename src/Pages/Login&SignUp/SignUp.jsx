import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form"


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const SignUp = () => {

    const { createUser, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset } = useForm();


    const onSubmit = async (data) => {


        if (data.password.length < 6) {
            toast.error('Password must be 6 characters long!', {
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
        else if (!/[A-Z]/.test(data.password)) {
            toast.error('Password must contain at least one capital letter!', {
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
        else if (!/[^a-zA-Z0-9]/.test(data.password)) {
            toast.error('Password must contain at least one special character!', {
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

        //image upload to imagebb and then get url
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });


        if (res.data.success) {

            createUser(data.email, data.password)
                .then(result => {

                    updateProfile(result.user, {
                        displayName: data.name,
                        photoURL: res.data.data.display_url
                    })
                        .then(() => {
                            const userInfo = {
                                Name: data.name,
                                Email: data.email,
                                Photo: res.data.data.display_url,
                                Role: 'user'
                            }
                            axiosPublic.post('/users', userInfo)
                                .then(() => {
                                    toast.success('Registration Successful!', {
                                        position: "top-center",
                                        autoClose: 500,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                    logOut();
                                    navigate('/login');
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
                .catch(error => {
                    reset();
                    toast.error(`${error}`, {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
        }
        else {
            toast.error('Photo uploaded unsuccessful', {
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


    return (
        <div className="max-w-7xl mx-auto hero min-h-screen bg-base-200 lg:rounded-lg md:px-40 pt-20">
            <div className="hero-content flex-col-reverse lg:flex-row lg:gap-20">
                <div className="text-center lg:text-left">
                    <img className="shadow-xl rounded-2xl hidden lg:flex" src="https://i.ibb.co/Q9Qn5M0/signup.jpg" alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h2 className="text-2xl font-bold text-center">Please SignUp</h2>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name*</span>
                            </label>
                            <input {...register("name", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email*</span>
                            </label>
                            <input {...register("email", { required: true })} type="email" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password*</span>
                            </label>
                            <input {...register("password", { required: true })} type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo*</span>
                            </label>
                            <input {...register("image", { required: true })} type="file" className="file-input w-full max-w-xs" />
                        </div>
                        <h2 className="text-center">Already have an account? Please <Link className="text-red-500 font-bold hover:underline" to='/login'>Login</Link> </h2>
                        <button className="btn btn-primary mt-2">
                            SignUp
                        </button>
                    </form>

                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;