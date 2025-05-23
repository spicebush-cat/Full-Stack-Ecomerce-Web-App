import { NavLink } from "react-router-dom";
import { assets } from "../../public/assets/frontend_assets/assets";
import {  Link } from "react-router-dom"
const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-7 py-[10px]">
      
        <div className="flex flex-col gap-4">
          <NavLink to="/">
            <img src="/assets/frontend_assets/handy-logo1.png" alt="Company Logo" className="h-24" />
 </NavLink>
          <p className="text-gray-600 text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and <br />
            typesetting industry. Lorem Ipsum has been the industry's <br />
            standard dummy text ever since the 1500s, when an unknown <br />
            printer took a galley of type and scrambled it to make a <br />
            type specimen book.
          </p>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-7">
          <h2 className="text-lg font-semibold text-gray-800">Company</h2>
          <ul className="text-gray-600 text-sm space-y-1">
            <li className="hover:text-gray-900">Home</li>
            <li className="hover:text-gray-900">About Us</li>
           <li className="hover:text-gray-900"><Link to='/PlaceOrder'> Delivery</Link></li>
            <li className="hover:text-gray-900">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-7">
          <h2 className="text-lg font-semibold text-gray-800">Get in Touch</h2>
          <ul className="text-gray-600 text-sm space-y-1">
            <li> +213-771-420-736</li>
            <li> boutalbisamy61@gmail.com</li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://LinkedIn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
