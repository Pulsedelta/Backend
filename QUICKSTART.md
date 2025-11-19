# 🚀 PulseDelta Backend - Quick Start Guide

## ✅ What's Already Set Up

Your backend is **fully structured** and **ready to run**! Here's what we've built:

### 📦 Installed Dependencies

- ✅ Express.js (API framework)
- ✅ Viem & Ethers.js (blockchain interactions)
- ✅ PostgreSQL driver (database)
- ✅ Winston (logging)
- ✅ Axios (HTTP client)
- ✅ Helmet, CORS, Compression (security & performance)
- ✅ Rate limiting & validation
- ✅ Nodemon (development hot-reload)

### 🏗️ Backend Architecture Created

```
✅ Configuration Layer  → src/config/index.js
✅ Database Layer       → src/database/config.js
✅ Blockchain Client    → src/services/blockchain/client.js
✅ Routes (5 modules)   → src/routes/
✅ Controllers (5)      → src/controllers/
✅ Middleware (3)       → src/middleware/
✅ Utilities (4)        → src/utils/
✅ Contract ABIs (4)    → src/abis/
```

### 📋 API Endpoints Ready

| Endpoint                               | Purpose             |
| -------------------------------------- | ------------------- |
| `GET /health`                          | Health check        |
| `GET /api/v1/markets`                  | Get all markets     |
| `GET /api/v1/markets/:id`              | Get market details  |
| `GET /api/v1/markets/:id/prices`       | Get current prices  |
| `GET /api/v1/markets/:id/history`      | Get historical data |
| `GET /api/v1/markets/:id/forecast`     | Get AI forecast     |
| `GET /api/v1/users/:address`           | Get user profile    |
| `GET /api/v1/users/:address/positions` | Get user positions  |
| `GET /api/v1/comments/market/:id`      | Get market comments |
| `POST /api/v1/comments`                | Create comment      |
| `GET /api/v1/analytics/platform`       | Platform statistics |

---

## 🎯 Next Steps (Implementation Required)

### 1. Database Setup (Priority: HIGH)

**Create PostgreSQL Database:**

```bash
# Option 1: Using createdb
createdb pulsedelta_dev

# Option 2: Using psql
psql -U postgres
CREATE DATABASE pulsedelta_dev;
\q
```

**Update .env:**

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pulsedelta_dev
DB_USER=postgres
DB_PASSWORD=your_password
```

**Create Database Tables:**

- Location: `src/database/migrations/`
- Need to implement: Market tables, user tables, comment tables, event tables

### 2. Blockchain Indexer (BE-1) ⭐

**File to implement:** `src/services/blockchain/indexer.js`

**What it needs to do:**

```javascript
// Listen to smart contract events
// - MarketCreated
// - SharesPurchased
// - SharesSold
// - LiquidityAdded
// - MarketResolved

// Store events in database
// Update market prices in real-time
```

**PRD Reference:** BE-1 - Blockchain Indexer

### 3. External API Integration (BE-2) ⭐

**File to implement:** `src/services/external-api/sports.js`

**What it needs to do:**

```javascript
// Integrate with sports API (e.g., SportsData.io)
// Fetch categorical outcomes (Team A, Team B, Draw)
// Cache responses
// Handle rate limiting
```

**PRD Reference:** BE-2 - External Data API Integration

### 4. Database Models & Migrations (BE-3) ⭐

**Files to create:**

- `src/database/migrations/001_create_markets.js`
- `src/database/migrations/002_create_users.js`
- `src/database/migrations/003_create_comments.js`
- `src/database/models/Market.js`
- `src/database/models/User.js`
- `src/database/models/Comment.js`

**PRD Reference:** BE-3 & BE-7 - Historical Data & Storage

### 5. AI Forecast Service (BE-4) 🤖

**Files to implement:**

- `src/services/ai/forecast.py` (Python ML model)
- `src/services/ai/client.js` (Node.js wrapper)

**What it needs to do:**

```python
# Train on historical data
# Generate probabilistic forecasts
# Return: { outcome: probability, confidence }
```

**PRD Reference:** BE-4 - Foundational AI Insight Service

### 6. Oracle Service (BE-5) ⭐⭐⭐

**File to implement:** `src/services/oracle/resolver.js`

**What it needs to do:**

```javascript
// Cron job runs every 5 minutes
// Check markets approaching resolution time
// Fetch outcome from external API
// Call smart contract's resolveMarket() function
// Handle transaction failures
```

**PRD Reference:** BE-5 - Market Resolution Service (Oracle)

### 7. Social Features (BE-6) ✅ (Mostly Done)

**Already have:**

- ✅ Comment routes
- ✅ Comment controller with CRUD

**Need to implement:**

- Database queries for comments
- Validation
- Pagination

**PRD Reference:** BE-6 - Comment/Social Service

---

## 🏃 Running the Backend

### Development Mode (with hot-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

### Test Health Endpoint

```bash
curl http://localhost:5000/health
```

### Test API Endpoint

```bash
curl http://localhost:5000/api/v1/markets
```

---

## 📊 Implementation Priority

Based on your PRD, here's the recommended order:

### Week 1 (Current)

1. ✅ Backend structure & Express setup
2. 🔨 Database schema & migrations
3. 🔨 External API integration (sports data)

### Week 2

4. 🔨 Blockchain indexer
5. 🔨 AI forecast service (basic)
6. 🔨 Comment service with database

### Week 3

7. 🔨 Oracle/resolver service
8. 🔨 Frontend integration
9. 🔨 Testing

---

## 🔑 Configuration Checklist

Before deploying or testing with real data:

- [ ] Set up PostgreSQL database
- [ ] Update `.env` with database credentials
- [ ] Deploy smart contracts to testnet
- [ ] Update `.env` with contract addresses
- [ ] Get External API key (e.g., SportsData.io)
- [ ] Update `.env` with API key
- [ ] Generate Oracle wallet private key
- [ ] Update `.env` with oracle private key
- [ ] Create database tables via migrations
- [ ] Test all endpoints

---

## 📚 Key Files Reference

| File                                  | Purpose            | Status  |
| ------------------------------------- | ------------------ | ------- |
| `src/server.js`                       | Main Express app   | ✅ Done |
| `src/config/index.js`                 | Centralized config | ✅ Done |
| `src/database/config.js`              | PostgreSQL setup   | ✅ Done |
| `src/services/blockchain/client.js`   | Viem client        | ✅ Done |
| `src/services/blockchain/indexer.js`  | Event indexing     | 🔨 TODO |
| `src/services/oracle/resolver.js`     | Market resolution  | 🔨 TODO |
| `src/services/ai/forecast.py`         | ML predictions     | 🔨 TODO |
| `src/services/external-api/sports.js` | Sports data        | 🔨 TODO |

---

## 🆘 Troubleshooting

### Server won't start

```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill process on port 5000
kill -9 $(lsof -t -i:5000)
```

### Database connection error

```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql
```

### Module import errors

```bash
# Make sure package.json has "type": "module"
# Check all imports use .js extension
# Example: import { x } from './file.js'  ✅
#          import { x } from './file'      ❌
```

---

## 📞 Need Help?

- 📖 See full docs: `README.md`
- 📋 Check PRD: Your Product Requirements Document
- 🔍 Check logs: `logs/` directory

---

**You're all set! Time to implement the services! 🚀**
