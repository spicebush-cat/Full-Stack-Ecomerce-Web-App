import { assets } from "../../public/assets/frontend_assets/assets";
const OurPlicy = () => {
  return (
    <div className="flex flex-col  md:flex-row justify-center items-center gap-8">
      {/* first */}
      <div className="flex flex-col items-center  ">
        <img className="pb-8 w-12" src={assets.exchange_icon} alt="img" />
        <h3 className="font-semibold">Easey Exchang Policy</h3>
        <p className="text-gray-500"> we offer hassls free exchang policy</p>
      </div>
      {/* second */}
      <div className="flex flex-col items-center  ">
        <img className="pb-8 w-12" src={assets.quality_icon} alt="img" />
        <h3 className="font-semibold">7 Day Return Policy</h3>
        <p className="text-gray-500">We provide 7 days free return policy</p>
      </div>
      {/* third */}
      <div className="flex flex-col items-center  ">
        <img className="pb-8 w-12" src={assets.support_img} alt="img" />
        <h3 className="font-semibold">Best customer support</h3>
        <p className="text-gray-500 ">we provide 24/7 customer support</p>
      </div>
    </div>
  );
};
export default OurPlicy;
