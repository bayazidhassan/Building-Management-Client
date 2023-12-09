
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


const Banner = () => {
    return (
        <div className="text-center">
            <Carousel showArrows={false} autoPlay={true} infiniteLoop={true} emulateTouch={true} showStatus={false}>
                <div>
                    <img src='https://i.ibb.co/GkdNLcQ/1.jpg' />
                </div>
                <div>
                    <img src='https://i.ibb.co/z8rFPcs/2.jpg' />
                </div>
                <div>
                    <img src='https://i.ibb.co/ns2n39R/3.jpg' />
                </div>
                <div>
                    <img src='https://i.ibb.co/mhzXkB2/4.jpg' />
                </div>
                <div>
                    <img src='https://i.ibb.co/bvrCw82/5.jpg' />
                </div>
                <div>
                    <img src='https://i.ibb.co/N7FQfFS/6.jpg' />
                </div>
            </Carousel>

        </div>
    );
};

export default Banner;