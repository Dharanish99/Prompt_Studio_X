import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import helmet from "helmet";
import connectDB from "./config/db.js";
import { initPassport } from "./config/passport.js";

import authRoutes from "./routes/authRoutes.js";
import promptRoutes from "./routes/promptRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
import textRoutes from "./routes/textRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

dotenv.config();

const app = express();

// Trust proxy for secure cookies behind reverse proxies (Render, Heroku)
app.set('trust proxy', 1);

// --- SECURITY HEADERS ---
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false // Disable if causing issues with images
}));

// --- CORS SETUP ---
// Use environment variables for flexible origin configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.FRONTEND_ORIGIN,
  "http://localhost:3000",
  "http://localhost:5173"
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.log('Blocked origin:', origin);
    return callback(new Error('CORS policy violation'), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// --- SESSION MANAGEMENT ---
app.use(
  session({
    name: process.env.SESSION_COOKIE_NAME || "promptstudio.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      touchAfter: 24 * 3600,
    }),
    cookie: {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
      ...(process.env.COOKIE_DOMAIN ? { domain: process.env.COOKIE_DOMAIN } : {}),
    },
  })
);

console.log("Session cookie settings:", {
  name: process.env.SESSION_COOKIE_NAME || "promptstudio.sid",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production"
});

// --- PASSPORT INIT ---
initPassport();
app.use(passport.initialize());
app.use(passport.session());

// --- ROUTES ---

// 1. Health Check (Required for Render to know app is alive)
app.get("/", (req, res) => {
  res.status(200).send("Prompt Studio API is healthy and running...");
});

// 2. API Routes
app.use("/auth", authRoutes);
app.use("/api/image-enhance", promptRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/text", textRoutes);
app.use("/api/history", historyRoutes);

console.log('✅ All routes mounted successfully');

// --- SERVER STARTUP ---
const startServer = async () => {
  try {
    await connectDB();
    
    // Start listening ONLY after DB connection is successful
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();