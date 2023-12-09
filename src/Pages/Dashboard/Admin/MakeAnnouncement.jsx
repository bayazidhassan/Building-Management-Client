import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2'

const MakeAnnouncement = () => {

    const axiosSecure = useAxiosSecure();

    const handleAnnouncement = (e) => {
        e.preventDefault();
        const form = e.target;

        const announcement = {
            title: form.title.value,
            description: form.description.value
        }

        axiosSecure.post('/makeAnnouncement', announcement)
            .then(res => {
                console.log(res);
                if (res.data._id) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Announcement updated successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    form.reset();
                }
            })
            .catch(error => {
                console.log(error);
            })

    }



    return (
        <div>

            <h2 className="text-2xl font-bold underline text-center text-cyan-500 mt-4 mb-10">Make Announcement</h2>

            <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">

                <form onSubmit={handleAnnouncement} className="card-body">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" name="title" placeholder="title" className="input input-bordered w-full max-w-xs" required />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea name="description" placeholder="description" className="input input-bordered w-full max-w-xs" required></textarea>
                    </div>
                    <div className="form-control mt-4">
                        <input className="btn btn-primary" type="submit" value="Make Announcement" />
                    </div>
                </form>

            </div>


        </div>
    );
};

export default MakeAnnouncement;