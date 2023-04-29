import React, { useState, useEffect } from "react";

const ProductDetailPage = (props) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(
        `https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products/${props.name}`
      );
      const data = await response.json();
      setProduct(data);
    }
    fetchProduct();
  }, [props.name]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>Category: {product.category}</p>
    </div>
  );
};

export default ProductDetailPage;
