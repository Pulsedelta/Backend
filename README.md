# PulseDelta Backend 🚀

> **Production-ready backend for PulseDelta Prediction Market platform**  
> Blockchain indexer, Oracle service, AI insights, and Social features

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Setup & Installation](#setup--installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Services](#services)
- [Database Schema](#database-schema)
- [Development](#development)

---

## 🌟 Overview

The PulseDelta backend is a comprehensive Node.js/Express application that handles:

1. **Blockchain Indexing (BE-1)**: Listen to smart contract events and index on-chain data
2. **External API Integration (BE-2)**: Fetch real-world data for market resolution
3. **Historical Data Service (BE-3)**: Store and serve historical market data
4. **AI Insight Service (BE-4)**: Generate probabilistic forecasts using machine learning
5. **Market Resolution Service (BE-5)**: Oracle that automatically resolves markets
6. **Comment/Social Service (BE-6)**: Off-chain user comments and social features
7. **Data Storage (BE-7)**: Centralized PostgreSQL database

---

## 🏗 Architecture

```
┌─────────────┐
│  Frontend   │
│  (Next.js)  │
└──────┬──────┘
       │
       ↓
┌──────────────────────────────────┐
│     Express API (Port 5000)      │
│  ┌────────────────────────────┐  │
│  │  Routes & Controllers      │  │
│  └────────┬───────────────────┘  │
│           ↓                      │
│  ┌────────────────────────────┐  │
│  │  Services Layer            │  │
│  │  • Blockchain Indexer      │  │
│  │  • Oracle Service          │  │
│  │  • AI Service              │  │
│  │  • Social Service          │  │
│  │  • External API Client     │  │
│  └────────┬───────────────────┘  │
└───────────┼───────────────────────┘
            ↓
   ┌────────┴────────┐
   │                 │
┌──▼───────┐  ┌─────▼──────┐
│PostgreSQL│  │ Blockchain │
│ Database │  │  (Celo)    │
└──────────┘  └────────────┘
```

---

## 📁 Folder Structure

```
Backend/
├── src/
│   ├── config/              # Configuration files
│   │   └── index.js         # Centralized config
│   │
│   ├── database/            # Database layer
│   │   ├── config.js        # PostgreSQL pool & query helpers
│   │   ├── models/          # Data models
│   │   ├── migrations/      # Database migrations
│   │   └── seeds/           # Seed data for testing
│   │
│   ├── routes/              # API route definitions
│   │   ├── health.js        # Health check routes
│   │   ├── markets.js       # Market routes
│   │   ├── users.js         # User routes
│   │   ├── comments.js      # Comment routes
│   │   └── analytics.js     # Analytics routes
│   │
│   ├── controllers/         # Request handlers
│   │   ├── healthController.js
│   │   ├── marketController.js
│   │   ├── userController.js
│   │   ├── commentController.js
│   │   └── analyticsController.js
│   │
│   ├── services/            # Business logic & external integrations
│   │   ├── blockchain/      # Blockchain interactions
│   │   │   ├── client.js    # Viem client setup
│   │   │   ├── indexer.js   # Event indexing service
│   │   │   └── contracts.js # Contract interaction helpers
│   │   │
│   │   ├── oracle/          # Oracle service (BE-5)
│   │   │   ├── resolver.js  # Market resolution logic
│   │   │   └── scheduler.js # Cron jobs for checking markets
│   │   │
│   │   ├── ai/              # AI service (BE-4)
│   │   │   ├── forecast.py  # Python ML model
│   │   │   └── client.js    # Node.js wrapper
│   │   │
│   │   ├── external-api/    # External API integration (BE-2)
│   │   │   ├── sports.js    # Sports data API
│   │   │   └── client.js    # Generic API client
│   │   │
│   │   └── social/          # Social features (BE-6)
│   │       └── comments.js  # Comment service logic
│   │
│   ├── middleware/          # Express middleware
│   │   ├── errorHandler.js  # Global error handler
│   │   ├── notFoundHandler.js
│   │   ├── rateLimiter.js   # Rate limiting
│   │   └── validator.js     # Input validation
│   │
│   ├── utils/               # Utility functions
│   │   ├── logger.js        # Winston logger
│   │   ├── errors.js        # Custom error classes
│   │   ├── response.js      # Standardized responses
│   │   └── asyncHandler.js  # Async error wrapper
│   │
│   ├── validators/          # Input validation schemas
│   │   └── marketValidator.js
│   │
│   ├── abis/                # Smart contract ABIs
│   │   ├── CategoricalMarket.json
│   │   ├── CategoricalMarketFactory.json
│   │   ├── FeeManager.json
│   │   └── SocialPredictions.json
│   │
│   └── server.js            # Main Express application
│
├── logs/                    # Application logs
├── tests/                   # Test files
├── public/                  # Static assets
│
├── .env                     # Environment variables (not in git)
├── .env.example             # Example environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## 🛠 Setup & Installation

### Prerequisites

- **Node.js**: v18+ ([Download](https://nodejs.org/))
- **PostgreSQL**: v14+ ([Download](https://www.postgresql.org/download/))
- **Python**: v3.9+ (for AI service) ([Download](https://www.python.org/downloads/))
- **Git**: ([Download](https://git-scm.com/downloads))

### Installation Steps

1. **Clone the repository** (already done)

   ```bash
   cd /home/mrwicks/Desktop/PulseDelta/Backend
   ```

2. **Install Node.js dependencies**

   ```bash
   npm install
   ```

3. **Install Python dependencies** (for AI service)

   ```bash
   pip3 install pandas numpy scikit-learn requests
   ```

4. **Set up PostgreSQL database**

   ```bash
   # Create database
   createdb pulsedelta_dev

   # Or using psql
   psql -U postgres
   CREATE DATABASE pulsedelta_dev;
   \q
   ```

5. **Configure environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   nano .env
   ```

6. **Run database migrations** (once implemented)
   ```bash
   npm run db:migrate
   ```

---

## ⚙️ Configuration (.env Setup)

Edit the `.env` file with your configuration. Here's what each variable means:

### 🚨 Required NOW (To Run Server)

#### **PORT=5000**

- **What**: Port number where backend runs
- **Why**: So your server knows where to listen
- **Action**: ✅ Keep as is

#### **NODE_ENV=development**

- **What**: Environment mode (development or production)
- **Why**: Shows detailed errors in development
- **Action**: ✅ Keep as is (change to `production` when deploying)

#### **CORS_ORIGIN=http://localhost:3000**

- **What**: Which frontend URL can access your API
- **Why**: Security - prevents unauthorized access
- **Action**: ✅ Keep as is (update when you deploy frontend)

---

### 🗄️ Required SOON (For Database)

#### **DB_HOST=localhost**

- **What**: Where PostgreSQL is running
- **Why**: Backend needs to connect to database
- **Action**: Keep `localhost` if running locally

#### **DB_PORT=5432**

- **What**: PostgreSQL port
- **Why**: Default PostgreSQL port
- **Action**: ✅ Keep as is

#### **DB_NAME=pulsedelta_dev**

- **What**: Database name
- **Why**: Where all your data is stored
- **Action**:
  1. Install PostgreSQL first
  2. Run: `createdb pulsedelta_dev`
  3. Keep this value

#### **DB_USER=postgres**

- **What**: Database username
- **Why**: Credentials to access database
- **Action**: Use your PostgreSQL username (usually `postgres`)

#### **DB_PASSWORD=**

- **What**: Database password
- **Why**: Security for database access
- **Action**: ⚠️ **SET THIS** to your PostgreSQL password

---

### ⛓️ Required for BLOCKCHAIN (After Contract Deployment)

#### **BLOCKCHAIN_RPC_URL=https://alfajores-forno.celo-testnet.org**

- **What**: URL to connect to Celo blockchain
- **Why**: To read data from smart contracts
- **Action**: ✅ Already set (free public RPC for Celo testnet)

#### **BLOCKCHAIN_CHAIN_ID=44787**

- **What**: Celo Alfajores testnet chain ID
- **Why**: Identifies which blockchain network
- **Action**: ✅ Keep as is

#### **MARKET_FACTORY_ADDRESS=**

#### **FEE_MANAGER_ADDRESS=**

#### **SOCIAL_PREDICTIONS_ADDRESS=**

#### **COLLATERAL_TOKEN_ADDRESS=**

- **What**: Addresses of your deployed smart contracts
- **Why**: Backend needs to know which contracts to interact with
- **Action**: ⚠️ **SET THESE** after deploying contracts
  1. Go to `Contracts/` folder
  2. Deploy contracts: `forge script script/Deploy.s.sol --broadcast`
  3. Copy the deployed addresses
  4. Paste them here

---

### 🔮 Required for ORACLE (Auto Market Resolution)

#### **ORACLE_PRIVATE_KEY=**

- **What**: Private key of wallet that resolves markets
- **Why**: Backend needs to sign transactions to call `resolveMarket()`
- **Action**: ⚠️ **SET THIS** when ready for oracle
  1. Create a new wallet (MetaMask)
  2. Export private key (starts with 0x...)
  3. Paste it here
  4. ⚠️ **KEEP SECRET!** Never share or commit to git
  5. ⚠️ **Use testnet wallet only!**

#### **ORACLE_ADDRESS=**

- **What**: Public address of the oracle wallet
- **Why**: For logging and verification
- **Action**: Set to the public address of the wallet above

#### **ORACLE_ENABLED=false**

- **What**: Turn oracle on/off
- **Why**: Control when automatic resolution starts
- **Action**:
  - Keep `false` during development
  - Set to `true` when oracle is ready

#### **ORACLE_CHECK_INTERVAL=300000**

- **What**: How often to check for markets to resolve (in milliseconds)
- **Why**: Oracle runs as a cron job
- **Action**: ✅ Keep as is (5 minutes = 300,000ms)

---

### 📡 Required for EXTERNAL DATA (Sports/Real-World Data)

#### **EXTERNAL_API_KEY=**

- **What**: API key for external data provider (e.g., SportsData.io)
- **Why**: To fetch real outcomes for market resolution
- **Action**: ⚠️ **GET THIS** from data provider
  1. Go to https://sportsdata.io (or similar)
  2. Sign up for free tier
  3. Get API key
  4. Paste it here

#### **EXTERNAL_API_BASE_URL=https://api.sportsdata.io/v3**

- **What**: Base URL for external API
- **Why**: Where to fetch data from
- **Action**: ✅ Keep as is (or change if using different provider)

#### **EXTERNAL_API_RATE_LIMIT=100**

- **What**: Max API calls per time window
- **Why**: Avoid hitting rate limits
- **Action**: ✅ Keep as is

---

### 🤖 Optional for AI (Can Enable Later)

#### **AI_SERVICE_ENABLED=false**

- **What**: Turn AI predictions on/off
- **Why**: AI needs training data first
- **Action**: Keep `false` for MVP, enable after training model

#### **AI_SERVICE_PORT=5001**

- **What**: Port for Python AI service
- **Why**: Separate from main API
- **Action**: ✅ Keep as is

#### **AI_MODEL_PATH=./models/forecast_model.pkl**

- **What**: Path to trained ML model file
- **Why**: Where AI loads model from
- **Action**: Update after training model

---

### 🔐 Security Settings

#### **JWT_SECRET=dev_secret_change_in_production**

- **What**: Secret key for JWT tokens
- **Why**: For user authentication (if you add login)
- **Action**:
  - Keep as is for development
  - ⚠️ Change to random string before production
  - Generate: `openssl rand -base64 32`

#### **JWT_EXPIRES_IN=7d**

- **What**: How long login tokens last
- **Why**: Security vs convenience
- **Action**: ✅ Keep as is (7 days)

#### **RATE_LIMIT_WINDOW_MS=900000**

- **What**: Rate limit time window (15 minutes)
- **Why**: Prevent API abuse
- **Action**: ✅ Keep as is

#### **RATE_LIMIT_MAX_REQUESTS=100**

- **What**: Max requests per window
- **Why**: Prevent spam/DDoS
- **Action**: ✅ Keep as is

---

### 📊 Indexer Settings

#### **INDEXER_START_BLOCK=latest**

- **What**: Which block to start indexing from
- **Why**: Avoid indexing entire blockchain history
- **Action**:
  - Keep `latest` for fresh start
  - Or set specific block number to index historical data

#### **INDEXER_BATCH_SIZE=1000**

- **What**: How many blocks to process at once
- **Why**: Performance optimization
- **Action**: ✅ Keep as is

#### **INDEXER_POLL_INTERVAL=5000**

- **What**: How often to check for new blocks (5 seconds)
- **Why**: Balance between speed and performance
- **Action**: ✅ Keep as is

---

### 💬 Social Features Settings

#### **COMMENT_MAX_LENGTH=1000**

- **What**: Maximum characters per comment
- **Why**: Prevent spam and abuse
- **Action**: ✅ Keep as is

#### **COMMENT_MIN_LENGTH=3**

- **What**: Minimum characters per comment
- **Why**: Prevent empty comments
- **Action**: ✅ Keep as is

---

### 🎯 Priority Checklist

Use this to track what you need:

```
Week 1 (Setup):
✅ PORT, NODE_ENV, CORS_ORIGIN - Already set
□ DB_* settings - Set up PostgreSQL
□ Deploy contracts - Get addresses

Week 2 (Core Features):
□ ORACLE_* settings - Create wallet & enable
□ EXTERNAL_API_KEY - Sign up for data provider

Week 3 (Advanced):
□ AI_* settings - Train model & enable
□ JWT_SECRET - Change for production
```

---

## 🚀 Running the Server

### Development Mode (with hot-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

### Run specific services

```bash
# Blockchain Indexer
npm run indexer

# Oracle Service
npm run oracle

# AI Forecast Service
npm run ai:forecast
```

### Health Check

Once running, visit:

- **Basic**: http://localhost:5000/health
- **Detailed**: http://localhost:5000/health/detailed

---

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api/v1
```

### Endpoints

#### **Markets**

- `GET /markets` - Get all markets (paginated)
- `GET /markets/:marketId` - Get single market details
- `GET /markets/:marketId/prices` - Get current outcome prices
- `GET /markets/:marketId/history` - Get historical data
- `GET /markets/:marketId/forecast` - Get AI forecast

#### **Users**

- `GET /users/:address` - Get user profile
- `GET /users/:address/positions` - Get user's open positions
- `GET /users/:address/history` - Get user's trading history

#### **Comments**

- `GET /comments/market/:marketId` - Get market comments
- `POST /comments` - Create a comment
- `DELETE /comments/:commentId` - Delete a comment

#### **Analytics**

- `GET /analytics/platform` - Get platform statistics
- `GET /analytics/volume` - Get trading volume data
- `GET /analytics/trending` - Get trending markets

### Response Format

**Success Response:**

```json
{
  "success": true,
  "message": "Success message",
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Error Response:**

```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## 🔧 Services

### 1. Blockchain Indexer (BE-1)

**Purpose**: Listen to smart contract events and index on-chain data

**File**: `src/services/blockchain/indexer.js`

**Key Features**:

- Watch `MarketCreated`, `SharesPurchased`, `SharesSold` events
- Store indexed data in PostgreSQL
- Handle chain reorgs
- Batch process historical events

### 2. External API Integration (BE-2)

**Purpose**: Fetch real-world data for market resolution

**File**: `src/services/external-api/sports.js`

**Key Features**:

- Integrate with sports/data APIs
- Handle rate limiting
- Cache responses
- Provide categorical outcomes (Team A, Team B, Draw)

### 3. Historical Data Service (BE-3)

**Purpose**: Store and serve historical data

**Database Tables**:

- `markets_history` - Price/volume snapshots
- `external_data` - API responses
- `market_events` - All market events

### 4. AI Insight Service (BE-4)

**Purpose**: Generate probabilistic forecasts

**Files**:

- `src/services/ai/forecast.py` (Python ML model)
- `src/services/ai/client.js` (Node.js wrapper)

**Key Features**:

- Train on historical data
- Generate probability distributions
- Update forecasts periodically
- Confidence scoring

### 5. Market Resolution Service (BE-5)

**Purpose**: Oracle that automatically resolves markets

**File**: `src/services/oracle/resolver.js`

**Key Features**:

- Cron job checks active markets
- Fetch outcome from external API
- Call smart contract's `resolveMarket()` function
- Handle transaction failures

### 6. Comment/Social Service (BE-6)

**Purpose**: Off-chain social features

**File**: `src/services/social/comments.js`

**Key Features**:

- CRUD operations for comments
- Pagination
- User ownership validation
- Content moderation (future)

---

## 🗄️ Database Schema

### Core Tables

```sql
-- Markets table
CREATE TABLE markets (
  id VARCHAR(42) PRIMARY KEY,
  question TEXT NOT NULL,
  description TEXT,
  category VARCHAR(50),
  status VARCHAR(20),
  resolution_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Comments table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  market_id VARCHAR(42) REFERENCES markets(id),
  author VARCHAR(42) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Market events (indexed from blockchain)
CREATE TABLE market_events (
  id SERIAL PRIMARY KEY,
  market_id VARCHAR(42),
  event_type VARCHAR(50),
  user_address VARCHAR(42),
  data JSONB,
  block_number BIGINT,
  transaction_hash VARCHAR(66),
  timestamp TIMESTAMP
);

-- Historical data
CREATE TABLE markets_history (
  id SERIAL PRIMARY KEY,
  market_id VARCHAR(42),
  prices JSONB,
  volume NUMERIC,
  liquidity NUMERIC,
  timestamp TIMESTAMP
);
```

---

## 👨‍💻 Development

### Code Style

- **ES6 Modules**: Using `import/export`
- **Async/Await**: For all async operations
- **Error Handling**: Centralized error middleware
- **Logging**: Winston for structured logging

### Best Practices

1. **Separation of Concerns**
   - Routes → Controllers → Services → Database
2. **Error Handling**
   - Use `asyncHandler` wrapper for async routes
   - Custom error classes for different error types
3. **Database Queries**
   - Use parameterized queries to prevent SQL injection
   - Use connection pooling for performance
4. **Security**
   - Helmet for security headers
   - Rate limiting for API endpoints
   - Input validation with Joi/express-validator

### Adding a New Endpoint

1. **Create route** in `src/routes/`
2. **Create controller** in `src/controllers/`
3. **Add business logic** in `src/services/`
4. **Update** `src/server.js` to include route

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- marketController.test.js
```

---

## 📝 License

MIT License - see LICENSE file for details

---

## 🙏 Contributing

1. Create feature branch
2. Implement changes
3. Add tests
4. Submit PR

---

## 📞 Support

For questions or issues:

- 📧 Email: dev@pulsedelta.com
- 💬 Discord: [Join Server](https://discord.gg/pulsedelta)

---

**Built with ❤️ by the PulseDelta Team**
