import React, { useState } from "react";
import NewsLatterBox from "../components/NewsLatterBox";
import { assets } from "../../public/assets/frontend_assets/assets";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/postcontact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending your message.");
    }
  };

  return (
    <div className="pb-[130px] pt-5 flex flex-col justify-center items-center gap-y-10 ">
      {/* Title */}
      <div className="flex items-center gap-2 text-[#414141]">
        <p className="font-semibold text-2xl">
          <span className="font-extralight text-gray-500">CONTACT </span> US
        </p>
        <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
      </div>

      {/* Container with image and form side by side */}
      <div className="flex flex-col sm:flex-row items-start gap-10 px-4 w-full max-w-6xl">
        {/* Image on the left */}
        <img
          src={assets.contact_img}
          alt="contactimg"
          className="w-full sm:w-1/2 object-cover"
        />

        {/* Form container */}
        <div className="w-full sm:w-1/2 pt-20 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 text-gray-500 w-full max-w-sm"
          >
            <label className="flex flex-col gap-2 text-sm w-full">
              <span className="text-black font-semibold">Email</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
                required
              />
            </label>

            <label className="flex flex-col gap-2 text-sm w-full">
              <span className="text-black font-semibold">Name</span>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
                required
              />
            </label>

            <label className="flex flex-col gap-2 text-sm w-full">
              <span className="text-black font-semibold">Message</span>
              <textarea
                name="message"
                placeholder="Your message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded resize-none focus:outline-none focus:ring-1 focus:ring-black"
                required
              />
            </label>

            <button
              type="submit"
              className="w-full border-[1px] border-black px-4 py-3 font-light text-black hover:bg-black hover:text-white transition-all ease-in-out text-sm"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* <NewsLatterBox /> */}
    </div>
  );
}

export default Contact;
