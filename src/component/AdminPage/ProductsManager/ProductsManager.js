import React from "react";
import { Card, Upload, Input, Button } from "antd";
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import "./ProductsManager.css";

const { Meta } = Card;

const ProductsManager = ({
  products,
  handleProductImageChange,
  handleProductChange,
  handleAddProduct,
  handleSaveProducts,
  handleDeleteProduct
}) => {
  return (
    <div className="products-manager">
      <h3>Products</h3>
      <div className="product-grid">
        {products.map((product, index) => (
          <Card
            key={index}
            hoverable
            style={{ width: 300, margin: '0 10px 20px 0' }}
            cover={
              product.image && (
                <img
                  alt={product.title}
                  src={product.image}
                  className="product-image"
                />
              )
            }
            actions={[
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteProduct(product.id, index)}
                style={{color : "red"}}
              >
                Delete Product
              </Button>
            ]}
          >
            <Meta title="Product Details" style={{marginBottom : "12px"}}/>
            <Upload
              beforeUpload={(file) => {
                handleProductImageChange({ target: { files: [file] } }, index);
                return false;
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Product Image</Button>
            </Upload>
            <Input
              placeholder="Product Title"
              value={product.title}
              onChange={(e) => handleProductChange(index, "title", e.target.value)}
              style={{ margin: '10px 0' }}
            />
            <Input
              placeholder="Product URL"
              value={product.url}
              onChange={(e) => handleProductChange(index, "url", e.target.value)}
              style={{ margin: '10px 0' }}
            />
            <Input
              placeholder="Product Category"
              value={product.category}
              onChange={(e) => handleProductChange(index, "category", e.target.value)}
              style={{ margin: '10px 0' }}
            />
          </Card>
        ))}
      </div>
      <Button type="primary" onClick={handleAddProduct} style={{ margin: '10px 10px 10px 0' }}>
        Add Product
      </Button>
      <Button type="primary" onClick={handleSaveProducts}>
        Save Products
      </Button>
    </div>
  );
};

export default ProductsManager;
