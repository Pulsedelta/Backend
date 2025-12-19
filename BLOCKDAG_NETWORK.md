# BlockDAG Network Configuration

## Overview

PulseDelta Backend is integrated with the **BlockDAG Network**, a high-performance blockchain that utilizes a Directed Acyclic Graph (DAG) structure to process transactions efficiently.

---

## Awakening Testnet Details

The testnet allows developers to test dApps and smart contracts in a sandbox environment before deploying them on the mainnet.

### Network Specifications

| Parameter | Value |
|-----------|-------|
| **Network Name** | Awakening Testnet |
| **Chain ID** | 1043 |
| **RPC URL** | https://rpc.awakening.bdagscan.com |
| **Relayer RPC URL** | relay.awakening.bdagscan.com |
| **Explorer URL** | https://awakening.bdagscan.com/ |
| **Currency Symbol** | BDAG |
| **Faucet** | https://awakening.bdagscan.com/faucet |

---

## Configuration

### Environment Variables

Add these to your `.env` file:

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

---

## Getting Test Tokens (BDAG)

To interact with the testnet, you'll need test BDAG tokens:

1. **Visit the Faucet**: https://awakening.bdagscan.com/faucet
2. **Enter your wallet address**
3. **Request test tokens**
4. **Wait for transaction confirmation**

---

## Smart Contract Deployment

Deploy your smart contracts to BlockDAG Awakening Testnet:

### Using Foundry

```bash
cd Contracts

# Deploy to BlockDAG
forge script script/Deploy.s.sol \
  --rpc-url https://rpc.awakening.bdagscan.com \
  --chain-id 1043 \
  --broadcast \
  --verify
```

### Using Hardhat

Update `hardhat.config.js`:

```javascript
module.exports = {
  networks: {
    blockdag: {
      url: "https://rpc.awakening.bdagscan.com",
      chainId: 1043,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

Deploy:

```bash
npx hardhat run scripts/deploy.js --network blockdag
```

---

## Blockchain Indexer

The backend automatically indexes events from BlockDAG:

- **Market Creation** events
- **Trade (Buy/Sell)** events
- **Liquidity** events
- **Market Resolution** events

### Indexer Configuration

```bash
# Start indexing from latest block
INDEXER_START_BLOCK=latest

# Or start from specific block
INDEXER_START_BLOCK=1000000

# Batch size for historical sync
INDEXER_BATCH_SIZE=1000

# Poll interval (5 seconds)
INDEXER_POLL_INTERVAL=5000
```

---

## Oracle Service

The oracle service reads market outcomes and writes resolution data to BlockDAG:

### Setup

1. **Create a wallet** for the oracle service
2. **Get BDAG tokens** from the faucet
3. **Export private key** from your wallet
4. **Add to .env**:

```bash
ORACLE_ENABLED=true
ORACLE_PRIVATE_KEY=0x...
ORACLE_ADDRESS=0x...
```

⚠️ **Security Note**: Never commit private keys to git. Use environment variables only.

---

## Explorer Integration

View transactions and contract interactions on BDAGScan:

**Testnet Explorer**: https://awakening.bdagscan.com

- View transactions
- Verify contracts
- Track events
- Monitor gas usage

---

## Troubleshooting

### Cannot connect to RPC

```bash
# Test RPC connection
curl -X POST https://rpc.awakening.bdagscan.com \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

### Transactions Failing

1. **Check BDAG balance**: Ensure oracle wallet has sufficient BDAG
2. **Check gas settings**: BlockDAG may have different gas requirements
3. **View on explorer**: Check transaction status on BDAGScan

### Indexer Not Syncing

1. **Check RPC URL**: Ensure it's correct in `.env`
2. **Check logs**: Look for connection errors in `logs/combined.log`
3. **Restart indexer**: Sometimes a restart helps with connection issues

---

## Network Features

### High Performance
- **Fast block times**: Sub-second finality
- **High throughput**: Process thousands of transactions per second
- **Low fees**: Minimal transaction costs

### DAG Structure
- **Parallel processing**: Multiple blocks can be added simultaneously
- **No mining**: Faster and more eco-friendly
- **Scalability**: Better than traditional blockchain

---

## Mainnet Migration

When ready to deploy to mainnet:

1. Update RPC URL to mainnet endpoint
2. Update Chain ID to mainnet chain ID
3. Deploy contracts to mainnet
4. Update contract addresses in backend
5. **Test thoroughly before going live**

---

## Resources

- **BlockDAG Documentation**: https://docs.blockdag.network (if available)
- **Awakening Testnet Explorer**: https://awakening.bdagscan.com
- **Faucet**: https://awakening.bdagscan.com/faucet
- **Community Support**: Discord/Telegram (add links if available)

---

## Support

For BlockDAG-specific questions:
- Check the explorer for transaction status
- Use the faucet for test tokens
- Monitor logs for connection issues

For backend integration issues:
- Check `logs/error.log` for detailed errors
- Ensure all environment variables are set
- Verify smart contract addresses are correct

---

**Built for BlockDAG Network** 🚀

