import { useNavigate } from "react-router-dom";

const About = () => {

    const navigate = useNavigate();

    const handleBooking = () => {
        navigate('/apartments');
    }

    return (
        <div className="mt-14 lg:mt-20">

            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/N7FQfFS/6.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 font-serif text-3xl lg:text-4xl font-bold">OUR APARTMENT</h1>
                        <p className="mb-5 font-mono text-base md:text-lg text-justify">Discover modern living in our meticulously designed apartments. From in-unit laundry to smart home technology, every detail enhances your lifestyle. Explore virtually through our banner section, highlighting spacious closets and stylish kitchens. Your safety is our priority, and community events foster a vibrant atmosphere. Join us for exceptional living where promises become daily realities. Welcome home!</p>
                        <button onClick={handleBooking} className="btn btn-accent">Start Agreement</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;