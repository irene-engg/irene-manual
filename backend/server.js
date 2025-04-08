/*import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import orderRoutes from "./routes/order.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();

const VITE_CLIENT_URL = 'http://frontend-alb-1085658235.ca-central-1.elb.amazonaws.com'; 

// Set up CORS to allow access from frontend
app.use(cors({
	origin: VITE_CLIENT_URL, // Use frontend URL from the .env file
	credentials: true
}));

// Use BACKEND_PORT from .env file
const PORT = process.env.BACKEND_PORT || 5000;

const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api", orderRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Start the server and connect to DB
app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});*/

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import orderRoutes from "./routes/order.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();

// ✅ Make sure this matches your frontend ALB exactly
const VITE_CLIENT_URL = process.env.CLIENT_URL || "http://frontend-alb-1085658235.ca-central-1.elb.amazonaws.com";

// ✅ CORS Setup for secure cross-origin cookie sharing
app.use(cors({
  origin: VITE_CLIENT_URL,
  credentials: true,
}));

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api", orderRoutes);

// Serve frontend build if NODE_ENV=production (Optional)
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Launch the backend server
const PORT = process.env.BACKEND_PORT || 5000;
app.listen(PORT, () => {
  console.log("Backend is running on http://localhost:" + PORT);
  connectDB();
});
