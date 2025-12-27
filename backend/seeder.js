const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const ShopOwnerApplication = require('./models/ShopOwnerApplication'); // अगर यह मॉडल बन गया है तो

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected for Seeding...');
        // फंक्शन कॉल करें
        if (process.argv[2] === '-d') {
            destroyData();
        } else {
            importData();
        }
    })
    .catch((err) => {
        console.error('Error connecting to DB:', err);
        process.exit(1);
    });

const importData = async () => {
  try {
    // पुराना कचरा साफ़ करें
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    // अगर ShopOwnerApplication मॉडल बन गया है तो उसे भी साफ़ करें
    if(mongoose.models.ShopOwnerApplication) {
       await ShopOwnerApplication.deleteMany();
    }

    // 1. Users बनाएं
    const createdUsers = await User.create(users);

    // 2. एडमिन यूजर को निकालें (पहला यूजर admin है array में)
    const adminUser = createdUsers[0]._id;

    // 3. प्रोडक्ट्स को एडमिन से लिंक करें
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // 4. प्रोडक्ट्स डालें
    await Product.insertMany(sampleProducts);

    console.log('Data Imported Successfully! ✅');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    if(mongoose.models.ShopOwnerApplication) {
       await ShopOwnerApplication.deleteMany();
    }

    console.log('Data Destroyed! 💥');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};