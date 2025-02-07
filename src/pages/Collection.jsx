import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

function Collection() {
  const { producs } = useContext(ShopContext);

  return (
  <div className="grid grid-cols-[1fr_3fr]">
    <div>
      //filter
    </div>
     </div>
     );
}

export default Collection;
