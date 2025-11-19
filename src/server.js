import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import { config } from "./config/index.js";
import { logger } from "./utils/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import rateLimiter from "./middleware/rateLimiter.js";

// Import routes
import healthRoutes from "./routes/health.js";
import marketRoutes from "./routes/markets.js";
import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";
import analyticsRoutes from "./routes/analytics.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ============================================
// MIDDLEWARE
// ============================================

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting
app.use("/api/", rateLimiter);

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });
  next();
});

// ============================================
// ROUTES
// ============================================

// Health check routes (no API prefix for monitoring)
app.use("/health", healthRoutes);

// API routes
const apiPrefix = `/api/${config.api.version}`;
app.use(`${apiPrefix}/markets`, marketRoutes);
app.use(`${apiPrefix}/users`, userRoutes);
app.use(`${apiPrefix}/comments`, commentRoutes);
app.use(`${apiPrefix}/analytics`, analyticsRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    name: "PulseDelta Backend API",
    version: config.api.version,
    status: "running",
    timestamp: new Date().toISOString(),
    endpoints: {
      health: "/health",
      api: apiPrefix,
      docs: `${apiPrefix}/docs`,
    },
  });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// ============================================
// SERVER STARTUP
// ============================================

const PORT = config.server.port;

const server = app.listen(PORT, () => {
  logger.info(`🚀 PulseDelta Backend Server started`);
  logger.info(`📍 Environment: ${config.server.env}`);
  logger.info(`🌐 Server running on port ${PORT}`);
  logger.info(`🔗 API Base URL: http://localhost:${PORT}${apiPrefix}`);
  logger.info(`💚 Health Check: http://localhost:${PORT}/health`);

  // Log enabled services
  if (config.oracle.enabled) {
    logger.info(`🔮 Oracle Service: ENABLED`);
  }
  if (config.ai.enabled) {
    logger.info(`🤖 AI Service: ENABLED`);
  }
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  logger.info("SIGINT signal received: closing HTTP server");
  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

export default app;
