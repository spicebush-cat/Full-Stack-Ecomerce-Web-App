import React, { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { assets } from "../../public/assets/frontend_assets/assets";
import WhyChooseUs from "../components/WhyChooseUs";
// import NewsLatterBox from "../components/NewsLatterBox"; // if needed

function About() {
  const [aboutHtml, setAboutHtml] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/allsiteinfo")
      .then(response => {
        const aboutContent = response.data[0]?.about || "";
        setAboutHtml(aboutContent);
      })
      .catch(error => {
        console.error("Failed to load About content", error);
      });
  }, []);

  return (
    <div className="pb-[130px] pt-5 flex flex-col justify-center items-center gap-y-10">
      <div className="flex items-center gap-2 text-[#414141]">
        <p className="font-semibold text-2xl">
          <span className="font-extralight text-gray-500">ABOUT </span> US
        </p>
        <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <img
          src={assets.about_img}
          alt="aboutimg"
          className="w-[33vw] mr-[40px]"
        />
        <div className="flex flex-col justify-between gap-4 text-gray-500 max-w-3xl">
          {/* Dynamically inserted HTML from the backend */}
          {aboutHtml ? parse(aboutHtml) : <p>Loading...</p>}
        </div>
      </div>

      <div className="flex flex-col gap-8 w-full">
        <div className="flex items-center gap-2 text-[#414141]">
          <p className="font-semibold text-2xl">
            <span className="font-extralight text-gray-500">WHY </span> CHOOSE US
          </p>
          <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
        </div>

        <WhyChooseUs />
      </div>
    </div>
  );
}

export default About;
