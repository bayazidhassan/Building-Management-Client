import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const AdminHome = () => {


    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [totalRoom, setTotalRoom] = useState([]);
    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState([]);
    const [bookedApartment, setBookedApartment] = useState([]);


    useEffect(() => {

        axiosSecure.get('/apartments')
            .then(res => {
                setTotalRoom(res.data);
            })
            .catch(error => {
                console.log(error);
            })


        axiosSecure.get('/getAllMembers')
            .then(res => {
                setMembers(res.data);
            })
            .catch(error => {
                console.log(error);
            })


        axiosSecure.get('/getAllUsers')
            .then(res => {
                setUsers(res.data);
            })
            .catch(error => {
                console.log(error);
            })


        axiosSecure.get('/getBookedApartment')
            .then(res => {
                setBookedApartment(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [axiosSecure]);




    return (
        <div>
            <div className="flex gap-4">
                <img className="w-16 md:w-24 h-16 md:h-24 rounded-lg" src={user?.photoURL} alt="" />
                <h2 className="text-xl text-cyan-500 font-bold">Admin</h2>
            </div>
            <h2>Name: {user?.displayName}</h2>
            <h2>Email: {user?.email}</h2>

            <dir className="divider"></dir>



            <h2>Total number of apartment: {totalRoom.length}</h2>
            <h2>Percentage of available apartment: {((totalRoom.length - bookedApartment.length) * 100) / totalRoom.length} %</h2>
            <h2>Percentage of booked/rented apartment: {((bookedApartment.length) * 100) / totalRoom.length} %</h2>
            <h2>Number of users: {users.length}</h2>
            <h2>Number of members: {members.length}</h2>

        </div>
    );
};

export default AdminHome;