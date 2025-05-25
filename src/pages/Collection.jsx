import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";

function Collection() {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProduct] = useState([]);
  const [selectSortBy, setSelectSortBy] = useState("Relevent");

  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState({});

  const { search } = useContext(ShopContext); // ⬅️ Add search from context

  // Fetch categories and initialize selectedCategories
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/allcategory")
      .then((res) => {
        setCategoriesData(res.data);
        const initialCategoryState = {};
        res.data.forEach((cat) => {
          initialCategoryState[cat.category_name] = false;
        });
        setSelectedCategories(initialCategoryState);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Fetch all products on mount
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/products")
      .then((res) => {
        setProducts(res.data);
        setFilterProduct(res.data);
      })
      .catch((err) => console.error("Error fetching all products:", err));
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    const activeCategories = Object.keys(selectedCategories).filter(
      (cat) => selectedCategories[cat]
    );

    if (activeCategories.length === 1) {
      const category = activeCategories[0];
      axios
        .get(`http://127.0.0.1:8000/api/productlistbycategory/${category}`)
        .then((res) => {
          setProducts(res.data);
          setFilterProduct(res.data);

          const catData = categoriesData.find(
            (c) => c.category_name === category
          );
          const subState = {};
          catData?.subcategories?.forEach((sub) => {
            subState[sub.subcategory_name] = false;
          });
          setAvailableSubcategories(catData?.subcategories || []);
          setSelectedSubcategories(subState);
        })
        .catch((err) => {
          console.error("Error loading products:", err);
          setProducts([]);
          setFilterProduct([]);
          setAvailableSubcategories([]);
          setSelectedSubcategories({});
        });
    } else if (activeCategories.length === 0) {
      // Show all products if no category selected
      axios.get("http://127.0.0.1:8000/api/products")
        .then((res) => {
          setProducts(res.data);
          setFilterProduct(res.data);
          setAvailableSubcategories([]);
          setSelectedSubcategories({});
        })
        .catch((err) => console.error("Error re-fetching all products:", err));
    } else {
      // Multiple categories selected (you can adjust this behavior)
      setProducts([]);
      setFilterProduct([]);
      setAvailableSubcategories([]);
      setSelectedSubcategories({});
    }
  }, [selectedCategories, categoriesData]);

  // Filter products by subcategories and search
  useEffect(() => {
    let filtered = [...products];

    // Subcategory filter
    const activeSub = Object.keys(selectedSubcategories).filter(
      (sub) => selectedSubcategories[sub]
    );
    if (activeSub.length > 0) {
      filtered = filtered.filter((p) => activeSub.includes(p.subcategory));
    }

    // Search filter
    if (search.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilterProduct(filtered);
  }, [selectedSubcategories, products, search]);

  // Sort products
  const handleSelectSortBy = (e) => {
    const value = e.target.value;
    setSelectSortBy(value);

    let sorted = [...filterProducts];
    if (value === "Low to High") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === "High to Low") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setFilterProduct(sorted);
  };

  // Handle category checkbox
  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    const updated = Object.keys(selectedCategories).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    updated[name] = checked;
    setSelectedCategories(updated);
  };

  // Handle subcategory checkbox
  const handleSubcategoryChange = (e) => {
    const { name, checked } = e.target;
    setSelectedSubcategories((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="grid grid-row sm:grid-cols-[1fr_2fr] md:grid-cols-[1fr_3fr] pb-[200px] pt-10 gap-8">
      {/* Filter Section */}
      <div className="flex flex-col gap-3">
        <p className="text-2xl pb-10">Filter</p>

        {/* Categories */}
        <div className="flex flex-col gap-3 box-border p-5 border-2 border-gray-200 rounded-lg">
          <p className="font-medium">CATEGORIES</p>
          <div className="flex flex-col items-start gap-2">
            {categoriesData.map((cat) => (
              <div key={cat.category_name} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={cat.category_name}
                  checked={selectedCategories[cat.category_name] || false}
                  onChange={handleCategoryChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label>{cat.category_name}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Subcategories */}
        {availableSubcategories.length > 0 && (
          <div className="flex flex-col gap-3 box-border p-5 border-2 border-gray-200 rounded-lg">
            <p className="font-medium">SUBCATEGORIES</p>
            <div className="flex flex-col items-start gap-2">
              {availableSubcategories.map((sub) => (
                <div key={sub.subcategory_name} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={sub.subcategory_name}
                    checked={selectedSubcategories[sub.subcategory_name] || false}
                    onChange={handleSubcategoryChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label>{sub.subcategory_name}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Section */}
      <div>
        <div className="flex flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-semibold">
              <span className="font-light text-gray-500">ALL</span> COLLECTIONS
            </h1>
            <span className="w-8 md:w-11 h-0.5 bg-gray-700"></span>
          </div>

          <div className="border-2 border-gray-200 rounded-md py-2 px-4">
            <label htmlFor="sort" className="mr-2">Sort by:</label>
            <select
              id="sort"
              onChange={handleSelectSortBy}
              value={selectSortBy}
              className="outline-none bg-transparent"
            >
              <option value="Relevent">Relevant</option>
              <option value="High to Low">High to Low</option>
              <option value="Low to High">Low to High</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center sm:justify-items-start">
          {filterProducts.length > 0 ? (
            filterProducts.map((p) => (
              <ProductItem
                key={p.id}
                name={p.title}
                id={p.id}
                image={p.image}
                price={p.price}
                specialPrice={p.special_price || p.specialPrice || null}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-lg">No products to show. Please select a category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collection;
