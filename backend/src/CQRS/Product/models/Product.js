// src/CQRS/Product/models/Product.js

class Product {
    constructor({ userId, image, title, url }) {
      this.userId = userId || '';
      this.image = image || '';
      this.title = title || '';
      this.url = url || '';
    }
  }
  
  module.exports = Product;
  