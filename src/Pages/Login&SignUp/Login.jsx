import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/Fc';
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";



const Login = () => {

    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();


    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;


        signInUser(email, password)
            .then(() => {
                toast.success('Login Successful!', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                // navigate(location?.state ? location.state : '/');
                navigate(location?.state?.from?.pathname ? location.state.from.pathname : '/');
            })
            .catch(error => {
                form.reset();
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


    const handleSignInWithGoogle = () => {
        signInWithGoogle()

            .then(res => {
                const userInfo = {
                    Name: res.user.displayName,
                    Email: res.user.email,
                    Photo: res.user.photoURL,
                    Role: 'user'
                }
                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        toast.success('Login Successful!', {
                            position: "top-center",
                            autoClose: 500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        // navigate(location?.state ? location.state : '/');
                        navigate(location?.state?.from?.pathname ? location.state.from.pathname : '/');
                    })
                    .catch(error => {
                        console.log(error);
                    })

            })
            .catch(error => {
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


    return (
        <div className="max-w-7xl mx-auto hero min-h-screen bg-base-200 lg:rounded-lg md:px-40 pt-14 lg:pt-0">
            <div className="hero-content flex-col-reverse lg:flex-row lg:gap-24">
                <div className="text-center lg:text-left">
                    <img className="rounded-2xl shadow-xl hidden lg:flex" src="https://i.ibb.co/Kh2dFw5/login.jpg" alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <h2 className="text-2xl font-bold text-center">Please Login</h2>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered w-full max-w-xs" required />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered w-full max-w-xs" required />
                        </div>
                        <h2 className="text-center">Do not have an account? Please <Link className="text-red-500 font-bold hover:underline" to='/signup'>SignUp</Link> </h2>
                        <div className="form-control mt-4">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <div className="card-body -mt-12">
                        <button className="btn" onClick={handleSignInWithGoogle}> <FcGoogle className="w-6 h-6"></FcGoogle> <span>Sign In With Google</span> </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;