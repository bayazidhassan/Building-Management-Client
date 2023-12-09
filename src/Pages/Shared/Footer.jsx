import { FaFacebook, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='bg-black flex flex-col md:flex-row gap-4 md:gap-0 justify-evenly items-center text-white px-4 md:px-0 py-6 md:py-10'>
            <div>
                <img className='w-14 h-14 mx-auto' src="https://i.ibb.co/rFkRtFZ/logo.png" alt="" />
                <p className="footer-title text-xs text-center">Discover the perfect home for every chapter of your life</p>
                <p className="footer-title text-xs text-center">Copyright © 2023 - All right reserved</p>
            </div>
            <div className='mt-4'>
                <h2 className="footer-title text-xs text-center">Find us on</h2>
                <div className="flex justify-center gap-4">
                    <a href="https://www.facebook.com/"><FaFacebook className='w-6 h-6'></FaFacebook></a>
                    <a href="https://www.youtube.com/"><FaYoutube className='w-6 h-6'></FaYoutube></a>
                    <a href="https://twitter.com/"><FaTwitter className='w-6 h-6'></FaTwitter></a>
                </div>
            </div>
        </div>
    );
};

export default Footer;