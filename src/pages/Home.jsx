import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import Categories from '../components/Category';

import OurPlicy from "../components/OurPolicy";
import NewsLatterBox from "../components/NewsLatterBox";
import Category from "../components/Category";
function Home() {
  return (
    <div className="flex flex-col gap-20 justify-center items-center pb-[150px]">
      <Hero />
      <LatestCollection />
      <BestSeller />
       <Category />
      <OurPlicy />
      <NewsLatterBox/>
    </div>
  );
}

export default Home;
