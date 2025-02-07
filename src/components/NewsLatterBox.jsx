import { useState } from "react";

const NewsLatterBox = () => {
  const [email, setEmail] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const FormHandler=(e)=>{
e.preventDefault()
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-gray-700">Subscribe now & get 20% off</p>
      <p className="text-gray-500 text-center mt-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
      <form onSubmit={FormHandler} className="flex flex-col md:flex-row mt-4 w-full">
        <input
          type="email"
          placeholder="Enter your email"
          onChange={handleChangeEmail}
          value={email}
          className="p-2 border border-gray-300 rounded-l-md focus:outline-none  flex-1"
        />
        <button className="bg-black text-white px-4 py-2 rounded-r-md  ">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLatterBox;
