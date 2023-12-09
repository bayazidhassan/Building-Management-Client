import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Announcements = () => {

    const axiosSecure = useAxiosSecure();

    const [announcement, setAnnouncement] = useState([]);
    useEffect(() => {
        axiosSecure.get('/getAnnouncement')
            .then(res => {
                setAnnouncement(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [axiosSecure]);


    return (
        <div>

            <h2 className="mb-10 text-2xl font-bold underline text-center text-cyan-500 mt-4">Announcements</h2>


            {
                announcement.map(annc =>
                    <div key={annc._id} className="mb-10 flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-6">
                        <div className="flex flex-col items-center w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Title:</span>
                            </label>
                            <input type="text" defaultValue={annc.title} readOnly className="shadow-xl input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="flex flex-col items-center w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Description:</span>
                            </label>
                            <textarea defaultValue={annc.description} readOnly rows={4} className="border-2 border-gray-400 rounded-lg shadow-xl w-full max-w-xs"></textarea>
                        </div>

                    </div>)
            }




        </div >
    );
};

export default Announcements;