import dotenv from "dotenv";

dotenv.config();

export const config = {
  // Server configuration
  server: {
    env: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT, 10) || 5000,
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
  },

  // API configuration
  api: {
    version: process.env.API_VERSION || "v1",
  },

  // Database configuration
  database: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME || "pulsedelta_dev",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    pool: {
      min: parseInt(process.env.DB_POOL_MIN, 10) || 2,
      max: parseInt(process.env.DB_POOL_MAX, 10) || 10,
    },
  },

  // Blockchain configuration
  blockchain: {
    rpcUrl:
      process.env.BLOCKCHAIN_RPC_URL ||
      "https://alfajores-forno.celo-testnet.org",
    chainId: parseInt(process.env.BLOCKCHAIN_CHAIN_ID, 10) || 44787,
    network: process.env.BLOCKCHAIN_NETWORK || "alfajores",
    contracts: {
      marketFactory: process.env.MARKET_FACTORY_ADDRESS,
      feeManager: process.env.FEE_MANAGER_ADDRESS,
      socialPredictions: process.env.SOCIAL_PREDICTIONS_ADDRESS,
      collateralToken: process.env.COLLATERAL_TOKEN_ADDRESS,
    },
  },

  // Oracle configuration
  oracle: {
    privateKey: process.env.ORACLE_PRIVATE_KEY,
    address: process.env.ORACLE_ADDRESS,
    checkInterval: parseInt(process.env.ORACLE_CHECK_INTERVAL, 10) || 300000, // 5 minutes
    enabled: process.env.ORACLE_ENABLED === "true",
  },

  // External API configuration
  externalApi: {
    key: process.env.EXTERNAL_API_KEY,
    baseUrl:
      process.env.EXTERNAL_API_BASE_URL || "https://api.sportsdata.io/v3",
    rateLimit: parseInt(process.env.EXTERNAL_API_RATE_LIMIT, 10) || 100,
  },

  // AI Service configuration
  ai: {
    enabled: process.env.AI_SERVICE_ENABLED === "true",
    port: parseInt(process.env.AI_SERVICE_PORT, 10) || 5001,
    modelPath: process.env.AI_MODEL_PATH || "./models/forecast_model.pkl",
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || "info",
    filePath: process.env.LOG_FILE_PATH || "./logs",
  },

  // Security configuration
  security: {
    jwtSecret: process.env.JWT_SECRET || "change-this-secret-in-production",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },

  // Rate limiting configuration
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000, // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  },

  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  },

  // Indexer configuration
  indexer: {
    startBlock: process.env.INDEXER_START_BLOCK || "latest",
    batchSize: parseInt(process.env.INDEXER_BATCH_SIZE, 10) || 1000,
    pollInterval: parseInt(process.env.INDEXER_POLL_INTERVAL, 10) || 5000, // 5 seconds
  },

  // Social features configuration
  social: {
    comment: {
      maxLength: parseInt(process.env.COMMENT_MAX_LENGTH, 10) || 1000,
      minLength: parseInt(process.env.COMMENT_MIN_LENGTH, 10) || 3,
    },
  },
};

export default config;
