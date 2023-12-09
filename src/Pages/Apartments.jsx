import useAxiosPublic from "../Hooks/useAxiosPublic";
import ApartmentsShow from "./ApartmentsShow";
import { useEffect, useState } from "react";


const Apartments = () => {

    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();
    const [apartments, setApartments] = useState([]);


    const [count, setCount] = useState();
    useEffect(() => {
        axiosPublic.get('/apartmentsCount')
            .then(res => {
                setCount(res.data.count);
                setLoading(true);
            })
            .catch(error => {
                console.log(error);
            })
    }, [axiosPublic]);


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    var pages, numberOfPages;
    if (loading) {
        numberOfPages = Math.ceil(count / itemsPerPage);
        pages = [...Array(numberOfPages).keys()].map(i => i + 1);
    }



    useEffect(() => {
        axiosPublic.get(`/apartments?page=${currentPage - 1}&size=${itemsPerPage}`)
            .then(res => {
                setApartments(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [axiosPublic, currentPage, itemsPerPage]);



    const handleItemsPerPage = (e) => {
        const val = parseInt(e.target.value);
        setItemsPerPage(val);
        setCurrentPage(1);
    }
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const handleNext = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    }




    return (
        <div className="pt-28">
            {
                !loading ?
                    <>
                        <div className="mt-20 mb-60 text-center">
                            <span className="text-red-500 loading loading-spinner loading-lg"></span>
                            <span className="loading loading-spinner loading-lg"></span>
                            <span className="text-blue-500 loading loading-spinner loading-lg"></span>
                            <span className="text-purple-500 loading loading-spinner loading-lg"></span>
                            <span className="text-green-500 loading loading-spinner loading-lg"></span>
                        </div>
                    </>
                    :
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center px-6 lg:px-0">
                            {
                                loading && apartments.map(apartment => <ApartmentsShow key={apartment._id} apartment={apartment}></ApartmentsShow>)
                            }
                        </div>
                        <div className='mt-10 space-y-4 md:space-y-0 text-lg font-bold text-center mb-14'>
                            <button className={`btn btn-neutral mr-4 ${currentPage === 1 ? 'btn-disabled' : ''}`} onClick={handlePrevious}>Previous</button>
                            {
                                loading && pages.map(page => <button
                                    className={currentPage === page ? 'btn btn-warning mr-2' : 'mr-2 btn btn-outline'}
                                    onClick={() => setCurrentPage(page)}
                                    key={page}>{page}</button>)
                            }
                            <button className={`btn btn-neutral ml-2 mr-4 ${numberOfPages === currentPage ? 'btn-disabled' : ''}`} onClick={handleNext}>Next</button>
                            <select className="select border-1 border-black" value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
                                <option value="3">3</option>
                                <option value="6">6</option>
                                <option value="9">9</option>
                            </select>
                        </div>
                    </>
            }

        </div>
    );
};

export default Apartments;