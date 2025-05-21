import React from "react";
import NewsLatterBox from "../components/NewsLatterBox";
import { assets } from "../../public/assets/frontend_assets/assets";
function Contact() {
  return (
    <div className="pb-[130px] pt-5 flex flex-col justify-center items-center gap-y-10 ">
      <div className="flex items-center gap-2 text-[#414141]">
        <p className="font-semibold text-2xl ">
          <span className="font-extralight text-gray-500 ">CONTACT </span> US
        </p>
        <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
      </div>
      <div className="flex flex-col sm:flex-row items-center   gab-3">
        <img
          src={assets.contact_img}
          alt="contactimg"
          className="w-[33vw] mr-[40px]"
        />
        <div className="flex flex-col justify-between items-start gap-5 text-gray-500">
          <p className="text-black font-semibold">Our Store</p>
          <div>
            <p>54709 Willms Station</p>
            <p>Suite 350, Washington, USA</p>
          </div>
          <div>
            <p>Tel: (415) 555-0132</p>
            <p>Email: admin@forever.com</p>
          </div>
          <p className="text-black font-semibold">Careers at Forever</p>
          <p>Learn more about our teams and job openings.</p>
          <button className="border-[1px] border-black px-4 py-3 font-light text-black hover:bg-black hover:text-white transition-all ease-in-out text-sm ">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLatterBox />
    </div>
  );
}

export default Contact;
