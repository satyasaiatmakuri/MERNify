const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

const products = require("../data/product.json");

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products Deleted");

    await Product.insertMany(products);
    console.log("Products got added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
