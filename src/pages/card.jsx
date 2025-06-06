import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // import navigate hook
import { ShopContext } from "../context/ShopContext";
import { assets } from "../../public/assets/frontend_assets/assets";

const Cart = () => {
  const { card, currency, setCard, delevry_fee } = useContext(ShopContext);
  const [subTotal, setSubTotal] = useState(0);
  const navigate = useNavigate(); // initialize navigate function

  useEffect(() => {
    setSubTotal(
      card.reduce(
        (total, p) => (p ? total + (p.price || 0) * (p.quantity || 0) : total),
        0
      )
    );
  }, [card]);

  // Filter out invalid items
  const validCard = card.filter((p) => p && p._id);

  // Handle checkout button click
  const handleCheckout = () => {
    if (validCard.length > 0) {
      navigate("/placeorder"); // go to PlaceOrder page
    } else {
      alert("Your cart is empty! Add products before proceeding to checkout.");
    }
  };

  return (
    <div className="flex flex-col pt-9 pb-[150px]">
      <div className="flex items-center gap-2 text-[#414141]">
        <p className="font-semibold text-2xl">
          <span className="font-extralight text-gray-500">YOUR </span> CART
        </p>
        <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
      </div>
      <div className="flex flex-col gap-5">
        {validCard.map((p, index) => (
          <div className="flex flex-col gap-4" key={`${p._id}-${index}`}>
            <div className="flex flex-col sm:flex-row w-full items-center justify-between mt-7">
              <div className="flex flex-row gap-5">
                <img
                  src={p.image}
                  alt={p.name || "product image"}
                  className="h-[100px] w-[70px] object-cover"
                />
                <div className="flex flex-col gap-4">
                  <p className="font-semibold">{p.name}</p>
                  <div className="flex flex-row gap-7 font-medium text-gray-600">
                    <p>
                      {currency}
                      {p.price}
                    </p>
                    {p.selectedSize && (
                      <p className="border-[0.5px] bg-slate-100 px-2">
                        {p.selectedSize}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={p.quantity}
                  className="border-[0.5px] w-[45px] pl-2 outline-none"
                  onChange={(e) => {
                    const updateQuantity = parseInt(e.target.value, 10);
                    if (updateQuantity >= 1 && updateQuantity <= 7) {
                      setCard((prevCard) =>
                        prevCard.map((item, i) =>
                          i === index
                            ? { ...item, quantity: updateQuantity }
                            : item
                        )
                      );
                    }
                  }}
                />
                <img
                  src={assets.bin_icon}
                  alt="delete"
                  className="aspect-square w-6 h-6 cursor-pointer"
                  onClick={() => {
                    setCard(card.filter((_, i) => i !== index));
                  }}
                />
              </div>
            </div>
            <hr className="border-[0.5px] text-gray-700" />
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-[50px]">
        <div className="flex flex-col w-full md:w-[400px]">
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
                {subTotal.toFixed(2)}
              </p>
            </div>
            <hr />
            <div className="flex justify-between py-1 text-sm">
              <p>Shipping Fee</p>
              <p>
                {currency}
                {delevry_fee.toFixed(2)}
              </p>
            </div>
            <hr />
            <div className="flex justify-between py-1 text-sm font-semibold">
              <p>Total</p>
              <p>
                {currency}
                {(subTotal + delevry_fee).toFixed(2)}
              </p>
            </div>
            <hr />
          </div>
          <button
            onClick={handleCheckout}
            className="border-[1px] border-black px-4 py-3 font-light bg-black text-white text-sm w-full md:w-1/2 self-end hover:bg-gray-800 transition-colors"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
