import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryDetail = () => {
  const { categoryName } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [productsBySubcategory, setProductsBySubcategory] = useState({});
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all categories and find the one matching categoryName
    fetch("http://127.0.0.1:8000/api/allcategory")
      .then((res) => res.json())
      .then((data) => {
        const category = data.find((cat) => cat.category_name === categoryName);
        setCategoryData(category || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
        setLoading(false);
      });
  }, [categoryName]);

  useEffect(() => {
    if (!categoryData) return;

    if (categoryData.subcategories && categoryData.subcategories.length > 0) {
      // For each subcategory, fetch products for that subcategory
      categoryData.subcategories.forEach((subcat) => {
        fetch(`http://127.0.0.1:8000/api/productlistbysubcategory/${subcat.subcategory_name}`)
          .then((res) => res.json())
          .then((products) => {
            setProductsBySubcategory((prev) => ({
              ...prev,
              [subcat.subcategory_name]: products,
            }));
          })
          .catch((error) => {
            console.error(`Error fetching products for ${subcat.subcategory_name}:`, error);
          });
      });
    } else {
      // No subcategories: fetch products by category instead
      fetch(`http://127.0.0.1:8000/api/productlistbycategory/${categoryName}`)
        .then((res) => res.json())
        .then((products) => {
          setProductsByCategory(products);
        })
        .catch((error) => {
          console.error(`Error fetching products for category ${categoryName}:`, error);
        });
    }
  }, [categoryData, categoryName]);

  if (loading) return <div className="text-center py-10">Loading category details...</div>;
  if (!categoryData) return <div className="text-center py-10">Category not found.</div>;

  return (
    <div className="py-10">
      <h2 className="text-center text-3xl font-bold capitalize mb-8">{categoryData.category_name}</h2>

      {categoryData.subcategories && categoryData.subcategories.length > 0 ? (
        // Show products grouped by subcategory
        categoryData.subcategories.map((subcat) => (
          <div key={subcat.id} className="mb-10">
            <h3 className="text-2xl font-semibold capitalize mb-4">{subcat.subcategory_name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productsBySubcategory[subcat.subcategory_name] && productsBySubcategory[subcat.subcategory_name].length > 0 ? (
                productsBySubcategory[subcat.subcategory_name].map((product) => (
                  <div key={product.id} className="border rounded p-4 shadow hover:shadow-lg cursor-pointer">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-40 object-cover rounded"
                    />
                    <h4 className="mt-2 font-semibold">{product.title}</h4>
                    <p className="text-green-600 font-bold">${product.price}</p>
                  </div>
                ))
              ) : (
                <p>No products found for this subcategory.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        // No subcategories - show products by category
        <>
          {productsByCategory.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productsByCategory.map((product) => (
                <div key={product.id} className="border rounded p-4 shadow hover:shadow-lg cursor-pointer">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h4 className="mt-2 font-semibold">{product.title}</h4>
                  <p className="text-green-600 font-bold">${product.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg">No products found in this category.</p>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryDetail;
