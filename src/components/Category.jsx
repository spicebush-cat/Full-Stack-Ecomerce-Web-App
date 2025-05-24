import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./Title";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCategories, setVisibleCategories] = useState(5);
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

  const showMore = () => {
    setVisibleCategories(prev => prev + 5);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        <Title text1="OUR" text2="CATEGORIES" />
      </div>

      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center pt-6">
        {categories.slice(0, visibleCategories).map((categoryObj, index) => {
          const categoryName = categoryObj.category_name;

          return (
            <div
              key={index}
              className="w-full max-w-[200px] cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => navigate(`/category/${categoryName}`)}
            >
              <div className="w-full h-[200px] overflow-hidden rounded-xl shadow-md">
                <img
                  src={categoryObj.category_image}
                  alt={categoryName}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <p className="text-center text-lg font-semibold mt-3 capitalize">
                {categoryName}
              </p>
            </div>
          );
        })}
      </div>

      {visibleCategories < categories.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={showMore}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Category;