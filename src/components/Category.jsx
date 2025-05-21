import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./Title";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/allcategory")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading categories...</div>;
  }

  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        <Title text1="OUR" text2="CATEGORIES" />
      </div>

      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center pt-6">
        {categories.map((categoryObj, index) => {
          const categoryName = categoryObj.category_name;

          return (
            <div
              key={index}
              className="w-full max-w-[200px] cursor-pointer"
              onClick={() => navigate(`/category/${categoryName}`)}
            >
              <div className="w-full h-[200px] overflow-hidden rounded-xl shadow-md">
                <img
                  src={categoryObj.category_image}
                  alt={categoryName}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-lg font-semibold mt-3 capitalize">
                {categoryName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;