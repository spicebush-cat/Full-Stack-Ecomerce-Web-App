import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../../public/assets/frontend_assets/assets";

const Cart = () => {
  const { card, currency, setCard, delevry_fee } = useContext(ShopContext);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    setSubTotal(
      card.reduce((total, p) => total + p.productData.price * p.quentity, 0)
    );
  }, [card]);

  return (
    <div className="flex flex-col pt-9 pb-[150px]">
      <div className="flex items-center gap-2 text-[#414141]">
        <p className="font-semibold text-2xl">
          <span className="font-extralight text-gray-500">YOUR </span> CART
        </p>
        <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
      </div>

      <div className="flex flex-col gap-5">
        {card.map((p, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row w-full items-center justify-between mt-7">
              <div className="flex flex-rox gap-5">
                <img
                  src={p.productData.image}
                  alt="img"
                  className="h-[100px] w-[70px]"
                />
                <div className="flex flex-col gap-4">
                  <p className="font-semibold">{p.productData.name}</p>
                  <div className="flex flex-row gap-7 font-medium text-gray-600">
                    <p>
                      {currency}
                      {p.productData.price}
                    </p>
                    <p className="border-[0.5px] bg-slate-100 px-2">
                      {p.selectedSize}
                    </p>
                  </div>
                </div>
              </div>
              <input
                type="number"
                value={p.quentity}
                className="border-[0.5px] w-[45px] pl-2 outline-none"
                onChange={(e) => {
                  const updateQuentity = parseInt(e.target.value, 10);
                  if (updateQuentity >= 1 && updateQuentity <= 7) {
                    setCard((prevCard) =>
                      prevCard.map((item, i) =>
                        i === index
                          ? { ...item, quentity: updateQuentity }
                          : item
                      )
                    );
                  }
                }}
              />
              <img
                src={assets.bin_icon}
                alt="delete"
                className="aspect-square w-6 h-6"
                onClick={() => {
                  setCard(card.filter((_, i) => i !== index));
                }}
              />
            </div>
            <hr className="border-[0.5px] text-gray-700" />
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-[50px]">
        <div className="flex flex-col w-[400px]">
          <div className="flex items-center gap-2 text-[#414141]">
            <p className="font-semibold text-2xl">
              <span className="font-extralight text-gray-500">CART </span> TOTALS
            </p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
          </div>
          <div className="flex w-full flex-col mt-6 mb-6 space-y-3">
            <div className="flex justify-between py-1 text-sm">
              <p>Subtotal</p>
              <p>
                {currency}
                {subTotal}
              </p>
            </div>
            <hr />
            <div className="flex justify-between py-1 text-sm">
              <p>Shipping Fee</p>
              <p>
                {currency}
                {delevry_fee}
              </p>
            </div>
            <hr />
            <div className="flex justify-between py-1 text-sm font-semibold">
              <p>Total</p>
              <p>
                {currency}
                {subTotal + delevry_fee}
              </p>
            </div>
            <hr />
          </div>
          <button className="border-[1px] border-black px-4 py-3 font-light bg-black text-white text-sm w-1/2 self-end">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
