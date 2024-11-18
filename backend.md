# Node.js, Express.js, and MongoDB

## Node.js

- **JavaScript runtime** built on Chrome's V8 engine.
- Runs **JavaScript on the server side**.
- **Non-blocking I/O**: Handles multiple operations concurrently.
- **Single-threaded** but **asynchronous**, allowing for high performance and scalability.

## Express.js

- **Minimalist web framework** for Node.js.
- Simplifies building **web apps** and **APIs**.
- Key features:
  - **Routing**: Manage HTTP requests (`GET`, `POST`, etc.).
  - **Middleware**: Process requests (e.g., authentication, logging).
  - **Template support**: Render dynamic HTML with templating engines like Pug or EJS.

## MongoDB

- **NoSQL database**: Stores data in **flexible, JSON-like documents** (BSON).
- Ideal for handling **large volumes of unstructured data**.
- **Schema-less**: No predefined structure, allowing dynamic fields.
- **Integration with Node.js**: Use libraries like **Mongoose** to model, validate, and interact with MongoDB.

### Example of JSON Data Stored in MongoDB

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "age": 30,
  "isVerified": true,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": 10001
  },
  "hobbies": ["reading", "traveling", "coding"],
  "createdAt": "2023-09-22T10:00:00Z"
}
```

### Step-by-Step Guide to Setting Up Your Node.js Server

#### 1. Initialize Your Project

Open your terminal and create a new directory for your project:

```bash
mkdir my-project
cd my-project
```

Now, initialize a new Node.js project:

```bash
npm init -y
```

This command creates a `package.json` file with default values.

#### 2. Set Up ES Modules

To use ES module syntax (like `import`), open the `package.json` file and add the following line:

```json
"type": "module",
```

Your `package.json` should look something like this:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  ...
}
```

#### 3. Install Necessary Packages

You need to install several packages for your project:

- **Express**: Web framework for Node.js.
- **Nodemon**: Development tool that automatically restarts the server on file changes.
- **Cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **Mongoose**: MongoDB object modeling tool.

Run the following command:

```bash
npm install express cors mongoose
npm install --save-dev nodemon
```

#### 4. Create the `server.js` File

Create a new file named `server.js` in your project directory:

Open `server.js` in your text editor and set up a basic Express server:

```javascript
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydatabase");
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit the process if there's an error
  }
};

// Start the server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
```

#### 5. Update `package.json` for Nodemon

To use `nodemon` for running your server, update the `scripts` section in your `package.json`:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

#### 6. Running the Server

To start your server using `nodemon`, run the following command in your terminal:

```bash
npm run dev
```

Nodemon will start your server and automatically restart it whenever you make changes to the code.

### Summary

1. **Initialized the project**: Created a new directory and initialized with `npm init -y`.
2. **Set ES Modules**: Modified `package.json` to use ES modules.
3. **Installed packages**: Installed `express`, `nodemon`, `cors`, and `mongoose`.
4. **Created the server**: Set up a basic server in `server.js` with MongoDB connection.
5. **Running the server**: Used `nodemon` for easy development.

This setup provides a solid foundation for building a RESTful API or web application with Node.js and MongoDB.

````md
# Creating a Mongoose Schema with CRUD Operations

In this guide, we will explain how to create Mongoose schemas and perform basic CRUD (Create, Read, Update, Delete) operations. Later, we will cover how to reference other schemas and use the `populate()` method.

## 1. Setting Up Mongoose

Before creating schemas, install Mongoose in your project using npm:

```bash
npm install mongoose
```
````

Next, import Mongoose in your project:

```javascript
import mongoose from "mongoose";
```

## 2. Creating a Basic Mongoose Schema

Let’s start by creating a simple schema for a `Product`:

```javascript
const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    image: { type: String, default: null },
  },
  { timestamps: true }
);
```

### Explanation:

- `title`: A required string field for the product title.
- `description`: An optional string field for the product description.
- `price`: A required number field with a minimum value of 0 (no negative prices).
- `quantity`: A required number field that ensures quantity is non-negative.
- `image`: An optional string field for storing the product image URL.
- `timestamps`: Automatically adds `createdAt` and `updatedAt` timestamps to the schema.

Now, create the `Product` model from this schema:

```javascript
const Product = mongoose.model("Product", productSchema);
export default Product;
```

## 3. Performing CRUD Operations

### 3.1. Create a Product (C - Create)

To create a new product, use `async/await` to handle the asynchronous nature of Mongoose queries:

```javascript
const createProduct = async () => {
  try {
    const newProduct = new Product({
      title: "Laptop",
      description: "High-performance laptop",
      price: 1000,
      quantity: 50,
      image: "laptop.jpg",
    });

    const product = await newProduct.save();
    console.log("Product Created:", product);
  } catch (err) {
    console.error("Error creating product:", err);
  }
};
```

### 3.2. Read Products (R - Read)

To fetch all products from the database:

```javascript
const fetchAllProducts = async () => {
  try {
    const products = await Product.find();
    console.log("All Products:", products);
  } catch (err) {
    console.error("Error fetching products:", err);
  }
};
```

To fetch a single product by its `id`:

```javascript
const fetchProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      console.log("Product not found");
    } else {
      console.log("Product Details:", product);
    }
  } catch (err) {
    console.error("Error fetching product:", err);
  }
};
```

### 3.3. Update a Product (U - Update)

To update a product’s information using `async/await`:

```javascript
const updateProduct = async (productId) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { price: 1200, quantity: 45 },
      { new: true }
    );

    if (!updatedProduct) {
      console.log("Product not found");
    } else {
      console.log("Updated Product:", updatedProduct);
    }
  } catch (err) {
    console.error("Error updating product:", err);
  }
};
```

### 3.4. Delete a Product (D - Delete)

To delete a product by its `id`:

```javascript
const deleteProduct = async (productId) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      console.log("Product not found");
    } else {
      console.log("Product Deleted:", deletedProduct);
    }
  } catch (err) {
    console.error("Error deleting product:", err);
  }
};
```

## 4. Adding a Reference to Another Schema

Now that we’ve covered basic CRUD operations, let's extend the `Product` schema to reference a `Category` model.

### Updated Product Schema with Category Reference

```javascript
const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: { type: String, default: null },
  },
  { timestamps: true }
);
```

### Explanation:

- `category`: This field is now a reference to another model (`Category`). The `ref` option links it to the `Category` model, using `mongoose.Schema.Types.ObjectId`.

### Creating the Category Schema

Here is the `Category` schema, which stores categories for products:

```javascript
const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: null },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
```

### 5. Using Populate to Fetch Referenced Data

When querying products, you can use Mongoose’s `populate()` method to retrieve the referenced `Category` document along with the product details.

### Example Query with `populate()`:

```javascript
const fetchProductsWithCategory = async () => {
  try {
    const products = await Product.find().populate("category");
    console.log("Products with Categories:", products);
  } catch (err) {
    console.error("Error fetching products with categories:", err);
  }
};
```

### Explanation:

- `.populate("category")`: This tells Mongoose to replace the `category` field in the `Product` document with the full `Category` document.

## 6. Summary

- **Schema**: Defines the structure of documents in MongoDB.
- **Model**: Provides an interface to interact with the database.
- **CRUD Operations**: Perform Create, Read, Update, and Delete actions on documents.
- **Reference**: Links two documents together using `ObjectId` and `ref`.
- **Populate**: Fetches referenced documents to provide more meaningful data in queries.

This guide shows you how to create schemas, perform CRUD operations, and use the `populate()` method to work with related data in a MongoDB database using Mongoose.

```

### Key Changes:
1. **CRUD operations**: Now use `async/await` for better readability and avoiding callback hell.
2. **Clear error handling**: Used `try/catch` blocks to handle errors in the async functions.
3. **Structure**: Kept the guide focused on explaining CRUD before introducing schema references and `populate()`.
```

Mongoose provides a robust validation system for schema fields, allowing you to ensure data integrity before saving to the database. There are several built-in validators and you can also create custom ones.

### Built-in Validators

1. **`required`**: Ensures the field is mandatory.

   ```js
   const userSchema = new mongoose.Schema({
     name: { type: String, required: true },
   });
   ```

2. **`min` and `max`**: Set a range for numbers.

   ```js
   const productSchema = new mongoose.Schema({
     price: { type: Number, min: 0, max: 1000 },
   });
   ```

3. **`maxlength` and `minlength`**: Define character limits for strings.

   ```js
   const postSchema = new mongoose.Schema({
     title: { type: String, minlength: 5, maxlength: 100 },
   });
   ```

4. **`enum`**: Restrict the value to a set of predefined options.

   ```js
   const orderSchema = new mongoose.Schema({
     status: { type: String, enum: ["pending", "shipped", "delivered"] },
   });
   ```

5. **`match`**: Use regex to validate string patterns.
   ```js
   const userSchema = new mongoose.Schema({
     email: { type: String, match: /.+\@.+\..+/ },
   });
   ```

### Custom Validators

You can also define custom validators using the `validate` property.

```js
const userSchema = new mongoose.Schema({
  age: {
    type: Number,
    validate: {
      validator: function (value) {
        return value >= 18;
      },
      message: "Age must be at least 18",
    },
  },
});
```

This custom validator ensures that the `age` field value is at least 18.

### Asynchronous Validators

If you need to validate against an asynchronous operation (e.g., checking if a username already exists), you can pass a callback with `validate`.

```js
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    validate: {
      validator: async function (value) {
        const user = await User.findOne({ username: value });
        return !user;
      },
      message: "Username already exists",
    },
  },
});
```

This approach allows you to handle asynchronous operations in your custom validation logic.

Ah, I see! You want to implement the **login**, **register**, and **product-related routes** from scratch with middleware applied properly in ES6 format. Let's go step by step and implement everything, including user authentication, middleware, and product-related operations.

### 1. **User Model** (ES6)

The `User` model will handle user data, including username, email, and password, and will hash the password before saving it to the database.

#### `models/User.js`

```js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
```

### 2. **Auth Middleware** (For Protected Routes)

This middleware ensures that only authenticated users can access certain routes by checking their JWT token.

#### `middlewares/authMiddleware.js`

```js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Extract the token part after "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "yourSecretKey");
    req.user = decoded; // Attach decoded user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
```

### 3. **Register Route**

This route will handle user registration, creating a new user and saving it to the database.

#### `controllers/authController.js`

```js
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
```

### 4. **Login Route**

This route allows users to log in, validating their credentials and returning a JWT token.

#### `controllers/authController.js`

```js
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "yourSecretKey",
      { expiresIn: "1h" }
    );
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
```

### 5. **Product Routes** with Middleware

Let's now implement the product-related routes (CRUD operations) and apply the authentication middleware where necessary.

#### `controllers/productController.js`

```js
export const getProduct = (req, res) => {
  res.json({ message: "Fetching all products" });
};

export const addProduct = (req, res) => {
  res.json({ message: "Product added successfully" });
};

export const updateProduct = (req, res) => {
  res.json({ message: "Product updated successfully" });
};

export const deleteProduct = (req, res) => {
  res.json({ message: "Product deleted successfully" });
};

export const getProductDetail = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Fetching details for product ${id}` });
};
```

### 6. **Product Routes with Auth Middleware**

Now, you need to protect your product routes with authentication, so that only logged-in users can add, update, and delete products.

#### `routes/productRoutes.js`

```js
import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProductDetail,
  updateProduct,
} from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProduct);
router.route("/add").post(authMiddleware, addProduct);
router.route("/update").put(authMiddleware, updateProduct);
router
  .route("/:id")
  .delete(authMiddleware, deleteProduct)
  .get(getProductDetail);

export default router;
```

### 7. **Main Server Setup**

Finally, tie everything together in your main server file.

#### `app.js`

```js
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js"; // For login/register
import productRoutes from "./routes/productRoutes.js"; // For product-related routes

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/yourDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
```

### 8. **Auth Routes Setup**

Lastly, create routes for **login** and **register**.

#### `routes/authRoutes.js`

```js
import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
```

### Summary

- **User Model**: Defines how users are created, hashed passwords, and methods for comparing passwords.
- **Auth Middleware**: Protects routes by verifying JWT tokens.
- **Login & Register Routes**: Handles user authentication (registration and login).
- **Product Routes**: Includes product CRUD routes, some of which are protected by the authentication middleware.
- **Main Server**: The main app ties everything together.

You can now add further business logic to each route as needed.
