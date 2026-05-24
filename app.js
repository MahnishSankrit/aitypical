import express from "express";

import cors from "cors";

import orderRoutes from "./src/routes/order.Route.js";

const app = express();


// Middlewares
app.use(cors());

app.use(express.json());


// Health Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Realtime MongoDB Orders API Running",
  });
});


// Routes
app.use("/api/orders", orderRoutes);


export default app;