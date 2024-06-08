const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

// Explicitly specify the path to the .env file in the root directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (!process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_PATH is not defined');
}

const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://ecommerce-d9160.appspot.com'
});

const app = express();
app.use(bodyParser.json());

app.use(cors());

const userRoutes = require('./src/CQRS/User/routes/UserRoutes');
const productRoutes = require('./src/CQRS/Product/routes/ProductRoutes');


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
