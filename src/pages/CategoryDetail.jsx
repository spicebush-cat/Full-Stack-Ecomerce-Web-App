import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";

const CategoryDetail = () => {
  const { categoryName } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [productsBySubcategory, setProductsBySubcategory] = useState({});
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch category info
  useEffect(() => {
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

  // Fetch products by subcategory or by category
  useEffect(() => {
    if (!categoryData) return;

    if (categoryData.subcategories && categoryData.subcategories.length > 0) {
      const fetches = categoryData.subcategories.map((subcat) =>
        fetch(`http://127.0.0.1:8000/api/productlistbysubcategory/${subcat.subcategory_name}`)
          .then((res) => res.json())
          .then((products) => ({ subcategory: subcat.subcategory_name, products }))
          .catch((error) => {
            console.error(`Error fetching products for ${subcat.subcategory_name}:`, error);
            return { subcategory: subcat.subcategory_name, products: [] };
          })
      );

      Promise.all(fetches).then((results) => {
        const productsMap = {};
        results.forEach(({ subcategory, products }) => {
          productsMap[subcategory] = products;
        });
        setProductsBySubcategory(productsMap);
      });
    } else {
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
    <div className="py-10 px-4">
      <h2 className="text-center text-3xl font-bold capitalize mb-8">
        {categoryData.category_name}
      </h2>

      {categoryData.subcategories && categoryData.subcategories.length > 0 ? (
        categoryData.subcategories.map((subcat) => (
          <div key={subcat.id} className="mb-10">
            <h3 className="text-2xl font-semibold capitalize mb-4">{subcat.subcategory_name}</h3>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center sm:justify-items-start">
              {productsBySubcategory[subcat.subcategory_name] && productsBySubcategory[subcat.subcategory_name].length > 0 ? (
                productsBySubcategory[subcat.subcategory_name].map((product) => (
                  <ProductItem
                    key={product.id}
                    id={product.id}
                    name={product.title || product.name}
                    image={product.image}
                    price={product.price}
                    specialPrice={product.special_price || product.specialPrice || null}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-lg">No products found for this subcategory.</p>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <>
          {productsByCategory.length > 0 ? (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center sm:justify-items-start">
              {productsByCategory.map((product) => (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  name={product.title || product.name}
                  image={product.image}
                  price={product.price}
                  specialPrice={product.special_price || product.specialPrice || null}
                />
              ))}
            </div>
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-lg">No products found in this category.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryDetail;
