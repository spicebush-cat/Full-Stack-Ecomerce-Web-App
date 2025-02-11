import React from "react";
import { assets } from "../../public/assets/frontend_assets/assets";
 import WhyChooseUs from "../components/WhyChooseUs";
import NewsLatterBox from "../components/NewsLatterBox";
function About() {
  return (
    <div className=" pb-[130px] pt-5 flex flex-col justify-center items-center gap-y-10  ">
      <div className="flex items-center gap-2 text-[#414141]">
        <p className="font-semibold text-2xl ">
          <span className="font-extralight text-gray-500 ">ABOUT </span> US
        </p>
        <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
      </div>

      <div className=" flex flex-col sm:flex-row items-center   gab-3 ">
        <img
          src={assets.about_img}
          alt="aboutimg"
          className="w-[33vw] mr-[40px] "
        />
        <div className=" flex flex-col justify-between gap-4 text-gray-500  ">
          <p>
            Forever was born out of a passion for innovation and a desire to{" "}
            <br /> revolutionize the way people shop online. Our journey began
            with a simple <br /> idea: to provide a platform where customers can
            easily discover, explore, <br /> and purchase a wide range of
            products from the comfort of their homes.
          </p>
          <p>
            {" "}
            Since our inception, we've worked tirelessly to curate a diverse
            selection of <br /> high-quality products that cater to every taste
            and preference. From <br /> fashion and beauty to electronics and
            home essentials, we offer an <br /> extensive collection sourced
            from trusted brands and suppliers.
          </p>
          <p className="text-black"> Our Mission</p>
          <p>
            Our mission at Forever is to empower customers with choice ,
            <br /> convenience, and confidence. We're dedicated to providing a
            seamless
            <br />
            shopping experience that exceeds expectations, from browsing and
            <br />
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8 w-full">
        <div className="flex items-center gap-2 text-[#414141]">
          <p className="font-semibold text-2xl ">
            <span className="font-extralight text-gray-500 ">WHY </span> CHOOSE US
          </p>
          <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
        </div>

        <WhyChooseUs />
      </div>
      <div>
        <NewsLatterBox />
      </div>
    </div>
  );
}

export default About;
