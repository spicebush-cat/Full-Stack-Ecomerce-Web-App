import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";

function Collection() {
  const { search, setSearch } = useContext(ShopContext);
  const [productsSplit, setProductsSplit] = useState([]);
  const [filterProducts, setFilterProduct] = useState([]);

  useEffect(() => {
    //if it empty
    if (!search.trim) {
      setFilterProduct(productsSplit);
    } else {
      const filtred = productsSplit.filter(
        (p) => p.name && p.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilterProduct(filtred);
    }
  }, [search]);

  useEffect(() => {
    setProductsSplit(products.slice(2));
  }, []);
  
  console.log(productsSplit);
  useEffect(() => {
    setFilterProduct(productsSplit);
  }, [productsSplit]);
  const [showFilter, setShowFilter] = useState(false); //this for the mobile responsive
  const { products } = useContext(ShopContext);
  //this to check the type of wear
  const [checkType, setCheckType] = useState({
    Topwear: false,
    Bottomwear: false,
    Winterwear: false,
  });

  const handelChangType = (e) => {
    const { name, checked } = e.target;
    const newCheckType = { ...checkType, [name]: checked };
    setCheckType(newCheckType);
    const ActiveSubCategory = Object.keys(newCheckType).filter(
      (p) => newCheckType[p]
    );
    const filterd =
      ActiveSubCategory.length === 0
        ? filterProducts
        : filterProducts.filter((p) =>
            ActiveSubCategory.includes(p.subCategory)
          );
    setFilterProduct(filterd);
    // setFilterProducts(products.filter((p) => p.subCategory === name));
    // console.log(filterProducts);
  };
  //this to check the category of people
  const [checkItems, setCheckItems] = useState({
    Men: false,
    Women: false,
    Kids: false,
  });
  const handelChange = (e) => {
    // console.log(e);

    const { name, checked } = e.target;

    const newCheckItems = { ...checkItems, [name]: checked };
    setCheckItems(newCheckItems);
    const activeCategory = Object.keys(newCheckItems).filter(
      (category) => newCheckItems[category]
    ); //her we get from the object just the true element

    const filterd =
      activeCategory.length === 0
        ? productsSplit
        : productsSplit.filter((p) => activeCategory.includes(p.category));
    setFilterProduct(filterd);
  };
  //sort ficheur
  const [selectSortBy, setSelectSortBy] = useState("");
  const handelSelectSortBy = (e) => {
    setSelectSortBy(e.target.value);
    if (e.target.value === "Low to High") {
      const ascendingsorted = filterProducts
        .slice()
        .sort((a, b) => a.price - b.price);
      setFilterProduct(ascendingsorted);
    } else if (e.target.value === "High to Low") {
      const desascendingsorted = filterProducts
        .slice()
        .sort((a, b) => b.price - a.price);
      setFilterProduct(desascendingsorted);
    }
  };
  return (
    <div className="grid grid-row sm:grid-cols-[1fr_2fr] md:grid-cols-[1fr_3fr] pb-[200px] pt-10 gap-8">
      <div className="flex flex-col gap-3 ">
        <p className="text-2xl pb-10">Filter</p>
        <div className="flex flex-col gap-3 box-border p-5 border-2 border-black-300  ">
          <p> CATEGORIES </p>
          <div className="flex flex-col items-start">
            <div className="flex gap-1">
              <input
                name="Men"
                type="checkbox"
                onChange={handelChange}
                checked={checkItems.Men}
              />
              <label>Men</label>
            </div>
            <div className="flex gap-1">
              <input
                name="Women"
                onChange={handelChange}
                checked={checkItems.Women}
                type="checkbox"
              />
              <label>Women</label>
            </div>
            <div className="flex gap-1">
              <input
                name="Kids"
                onChange={handelChange}
                checked={checkItems.kids}
                type="checkbox"
              />
              <label>Kids</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 box-border p-5 border-2 border-black-300">
          <p> Type </p>
          <div className="flex flex-col items-start">
            <div className="flex gap-1">
              <input
                type="checkbox"
                onChange={handelChangType}
                checked={checkType.Topwear}
                name="Topwear"
              />
              <label>Topwear</label>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                onChange={handelChangType}
                checked={checkType.Bottomwear}
                name="Bottomwear"
              />
              <label>Bottomwear</label>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                onChange={handelChangType}
                checked={checkType.Winterwear}
                name="Winterwear"
              />
              <label>Winterwear</label>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex flex-row justify-between flex-1">
          <div className="flex items-center gap-2 text-[#414141]">
            <p className="font-semibold text-3xl ">
              <span className="font-extralight text-gray-500 ">ALL</span>{" "}
              COLLECTIONS
            </p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
          </div>
          {/* //sortfecheur */}
          <div className="border-2  py-2 px-4 ">
            <label htmlFor="sort">sort by : </label>
            <select
              id="sort"
              onChange={handelSelectSortBy}
              value={selectSortBy}
              className="outline-0   "
            >
              <option value="Relevent">Relevent</option>
              <option value="High to Low">High to Low</option>
              <option value="Low to High">Low to High</option>
            </select>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-col-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center  pt-10 ">
          {filterProducts.map((p, index) => (
            <ProductItem
              name={p.name}
              id={p.id}
              image={p.image}
              price={p.price}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
