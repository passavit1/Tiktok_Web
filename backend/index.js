const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./ecommerce-d9160-firebase-adminsdk-blhwr-9db0bd692a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://ecommerce-d9160.appspot.com'
});

const app = express();
app.use(bodyParser.json());

const userRoutes = require('./src/CQRS/User/routes/UserRoutes');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
