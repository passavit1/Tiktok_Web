import React from "react";

const ProductsManager = ({
  products,
  handleProductImageChange,
  handleProductChange,
  handleAddProduct,
  handleSaveProducts,
}) => {
  return (
    <div>
      <h3>Products</h3>
      {products.map((product, index) => (
        <div key={index}>
          <label>Product Image:</label>
          <input
            type="file"
            onChange={(e) => handleProductImageChange(e, index)}
          />
          <label>Product Title:</label>
          <input
            type="text"
            value={product.title}
            onChange={(e) =>
              handleProductChange(index, "title", e.target.value)
            }
          />
          <label>Product URL:</label>
          <input
            type="text"
            value={product.url}
            onChange={(e) => handleProductChange(index, "url", e.target.value)}
          />
          <label>Product Category:</label>
          <input
            type="text"
            value={product.category}
            onChange={(e) =>
              handleProductChange(index, "category", e.target.value)
            }
          />
        </div>
      ))}
      <button onClick={handleAddProduct}>Add Product</button>
      <button onClick={handleSaveProducts}>Save Products</button>
    </div>
  );
};

export default ProductsManager;
