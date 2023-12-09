import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2'


const ManageMembers = () => {


    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/getAllMembers')
            return res.data;
        }
    });


    const handleRemove = (user) => {

        Swal.fire({
            title: 'Are you want to remove?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/removeMember/${user?.Email}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'Removed successfully.',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            })
                            refetch();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        })
    }



    return (
        <div>

            <h2 className="text-2xl font-bold underline text-center text-cyan-500 mt-4">Manage Members</h2>

            <div className="mt-10 overflow-x-auto">

                <table className="table">
                    <thead>
                        <tr className="text-center text-xl font-bold">
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr className="text-center" key={user._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        {user?.Name}
                                    </td>
                                    <td>
                                        {user?.Email}
                                    </td>
                                    <td>
                                        {user?.Role}
                                    </td>
                                    <td>
                                        <button onClick={() => handleRemove(user)} className="btn btn-error">Remove</button>
                                    </td>
                                </tr>)
                        }
                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default ManageMembers;