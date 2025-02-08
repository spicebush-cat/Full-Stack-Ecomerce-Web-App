import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

function Collection() {
  const { producs } = useContext(ShopContext);

  return (
    <div className="grid grid-row sm:grid-cols-[1fr_2fr] md:grid-cols-[1fr_3fr] pb-[200px]">
      <div>
        <p>Filter</p>
        <div>
          <p></p>
          <div></div>
        </div>
        <div></div>
      </div>
      <div>{/*all collection */}</div>
    </div>
  );
}

export default Collection;
