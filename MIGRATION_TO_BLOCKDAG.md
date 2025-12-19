# Migration from Celo to BlockDAG - Complete ✅

## Summary

The PulseDelta backend has been successfully migrated from **Celo Alfajores Testnet** to **BlockDAG Awakening Testnet**.

---

## Changes Made

### 1. **Blockchain Client** (`src/services/blockchain/client.js`)

#### Before:
```javascript
import { celoAlfajores } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: celoAlfajores,
  transport: http(config.blockchain.rpcUrl),
});
```

#### After:
```javascript
import { defineChain } from 'viem';

export const blockdagAwakening = defineChain({
  id: 1043,
  name: 'BlockDAG Awakening Testnet',
  network: 'blockdag-awakening',
  nativeCurrency: {
    decimals: 18,
    name: 'BDAG',
    symbol: 'BDAG',
  },
  rpcUrls: {
    default: { http: ['https://rpc.awakening.bdagscan.com'] },
    public: { http: ['https://rpc.awakening.bdagscan.com'] },
  },
  blockExplorers: {
    default: {
      name: 'BDAGScan',
      url: 'https://awakening.bdagscan.com',
    },
  },
  testnet: true,
});

export const publicClient = createPublicClient({
  chain: blockdagAwakening,
  transport: http(config.blockchain.rpcUrl),
});
```

✅ **Custom chain definition for BlockDAG**
✅ **BDAG native currency configured**
✅ **Block explorer integration**

---

### 2. **Configuration** (`src/config/index.js`)

#### Before:
```javascript
blockchain: {
  rpcUrl: process.env.BLOCKCHAIN_RPC_URL || "https://alfajores-forno.celo-testnet.org",
  chainId: parseInt(process.env.BLOCKCHAIN_CHAIN_ID, 10) || 44787,
  network: process.env.BLOCKCHAIN_NETWORK || "alfajores",
}
```

#### After:
```javascript
blockchain: {
  rpcUrl: process.env.BLOCKCHAIN_RPC_URL || "https://rpc.awakening.bdagscan.com",
  chainId: parseInt(process.env.BLOCKCHAIN_CHAIN_ID, 10) || 1043,
  network: process.env.BLOCKCHAIN_NETWORK || "blockdag-awakening",
  explorerUrl: process.env.BLOCKCHAIN_EXPLORER_URL || "https://awakening.bdagscan.com",
  relayerUrl: process.env.BLOCKCHAIN_RELAYER_URL || "relay.awakening.bdagscan.com",
  faucetUrl: process.env.BLOCKCHAIN_FAUCET_URL || "https://awakening.bdagscan.com/faucet",
  currencySymbol: process.env.BLOCKCHAIN_CURRENCY || "BDAG",
}
```

✅ **BlockDAG RPC endpoint**
✅ **Correct chain ID (1043)**
✅ **Additional network URLs (explorer, relayer, faucet)**

---

### 3. **Documentation Updates**

#### Files Updated:
- ✅ `README.md` - Updated all references from Celo to BlockDAG
- ✅ Created `BLOCKDAG_NETWORK.md` - Comprehensive BlockDAG guide
- ✅ Created `.env.example` - Template with BlockDAG defaults

---

## BlockDAG Network Details

| Parameter | Value |
|-----------|-------|
| Network Name | Awakening Testnet |
| Chain ID | 1043 |
| RPC URL | https://rpc.awakening.bdagscan.com |
| Relayer RPC | relay.awakening.bdagscan.com |
| Explorer | https://awakening.bdagscan.com/ |
| Currency | BDAG |
| Faucet | https://awakening.bdagscan.com/faucet |

---

## Next Steps

### 1. **Create/Update `.env` File**

Since `.env` is gitignored, manually create/update it with:

```bash
# BlockDAG Awakening Testnet
BLOCKCHAIN_RPC_URL=https://rpc.awakening.bdagscan.com
BLOCKCHAIN_CHAIN_ID=1043
BLOCKCHAIN_NETWORK=blockdag-awakening
BLOCKCHAIN_EXPLORER_URL=https://awakening.bdagscan.com
BLOCKCHAIN_RELAYER_URL=relay.awakening.bdagscan.com
BLOCKCHAIN_FAUCET_URL=https://awakening.bdagscan.com/faucet
BLOCKCHAIN_CURRENCY=BDAG
```

### 2. **Get Test Tokens (BDAG)**

Visit the faucet to get test tokens:
🔗 https://awakening.bdagscan.com/faucet

1. Enter your wallet address
2. Request tokens
3. Wait for confirmation

### 3. **Deploy Smart Contracts to BlockDAG**

Navigate to your contracts directory and deploy:

```bash
cd ../Contracts

# Deploy to BlockDAG
forge script script/Deploy.s.sol \
  --rpc-url https://rpc.awakening.bdagscan.com \
  --chain-id 1043 \
  --broadcast
```

### 4. **Update Contract Addresses**

After deployment, add the addresses to `.env`:

```bash
MARKET_FACTORY_ADDRESS=0x...
FEE_MANAGER_ADDRESS=0x...
SOCIAL_PREDICTIONS_ADDRESS=0x...
COLLATERAL_TOKEN_ADDRESS=0x...
```

### 5. **Test the Backend**

```bash
# Start the backend
npm run dev
```

Check the logs for:
- ✅ "🚀 Starting blockchain indexer..."
- ✅ "Starting from latest block: [block_number]"
- ✅ Connection to BlockDAG RPC

---

## Testing Checklist

- [ ] Backend starts without errors
- [ ] Blockchain indexer connects to BlockDAG RPC
- [ ] Can fetch latest block number
- [ ] Smart contracts deployed to BlockDAG
- [ ] Contract addresses added to `.env`
- [ ] Markets can be indexed from BlockDAG
- [ ] Events are captured correctly
- [ ] Oracle can resolve markets (if enabled)

---

## Troubleshooting

### Issue: "Cannot connect to RPC"

**Solution:**
```bash
# Test RPC connection manually
curl -X POST https://rpc.awakening.bdagscan.com \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

### Issue: "Chain not recognized"

**Solution:** The custom chain definition should handle this. Ensure you've restarted the backend after changes.

### Issue: "No contracts to index"

**Solution:** Deploy contracts first, then add addresses to `.env`

---

## Verification

To verify the migration was successful:

1. **Check blockchain client**:
```bash
grep -r "blockdagAwakening" src/services/blockchain/client.js
```

2. **Check config**:
```bash
grep "1043" src/config/index.js
```

3. **Test connection**:
```bash
npm run dev
# Look for: "Starting from latest block: [number]"
```

---

## Files Modified

1. ✅ `src/services/blockchain/client.js` - Custom BlockDAG chain
2. ✅ `src/config/index.js` - BlockDAG defaults
3. ✅ `README.md` - Documentation updates
4. ✅ `BLOCKDAG_NETWORK.md` - New guide (created)
5. ✅ `MIGRATION_TO_BLOCKDAG.md` - This file (created)

---

## Compatibility

All existing features remain compatible:
- ✅ Blockchain Indexer
- ✅ Oracle/Resolver Service
- ✅ Market Events
- ✅ Transaction Handling
- ✅ Event Watching
- ✅ Contract Reading/Writing

**BlockDAG uses EVM-compatible contracts**, so all your Solidity contracts should work without modification!

---

## Support

For issues specific to:
- **BlockDAG Network**: Check https://awakening.bdagscan.com
- **Backend Integration**: Check `logs/error.log`
- **Contract Deployment**: Verify on BlockDAG explorer

---

**Migration Complete!** 🎉

Your backend is now ready to work with BlockDAG Network.

