// C:\DEV\Tiktok_Web\backend\src\CQRS\User\models\User.js

class User {
    constructor({ name, email, profileImageUrl, igUrl, tiktokUrl, products }) {
      this.name = name;
      this.email = email;
      this.profileImageUrl = profileImageUrl || '';
      this.igUrl = igUrl || '';
      this.tiktokUrl = tiktokUrl || '';
      this.products = products || [];
    }
  }
  
  module.exports = User;
  