import {
  createPublicClient,
  createWalletClient,
  http,
  defineChain,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { config } from "../../config/index.js";
import { logger } from "../../utils/logger.js";

/**
 * BlockDAG Awakening Testnet Chain Definition
 */
export const blockdagAwakening = defineChain({
  id: 1043,
  name: "BlockDAG Awakening Testnet",
  network: "blockdag-awakening",
  nativeCurrency: {
    decimals: 18,
    name: "BDAG",
    symbol: "BDAG",
  },
  rpcUrls: {
    default: {
      http: [config.blockchain.rpcUrl],
    },
    public: {
      http: [config.blockchain.rpcUrl],
    },
  },
  blockExplorers: {
    default: {
      name: "BDAGScan",
      url: "https://awakening.bdagscan.com",
    },
  },
  testnet: true,
});

/**
 * Public Client for reading blockchain data
 */
export const publicClient = createPublicClient({
  chain: blockdagAwakening,
  transport: http(config.blockchain.rpcUrl),
});

/**
 * Wallet Client for writing transactions (Oracle)
 */
let walletClient = null;

if (config.oracle.privateKey && config.oracle.enabled) {
  try {
    const account = privateKeyToAccount(config.oracle.privateKey);

    walletClient = createWalletClient({
      account,
      chain: blockdagAwakening,
      transport: http(config.blockchain.rpcUrl),
    });

    logger.info(`🔑 Oracle wallet initialized: ${account.address}`);
  } catch (error) {
    logger.error("Failed to initialize oracle wallet:", error);
  }
}

/**
 * Get current block number
 */
export const getBlockNumber = async () => {
  try {
    return await publicClient.getBlockNumber();
  } catch (error) {
    logger.error("Error getting block number:", error);
    throw error;
  }
};

/**
 * Get transaction receipt
 */
export const getTransactionReceipt = async (hash) => {
  try {
    return await publicClient.getTransactionReceipt({ hash });
  } catch (error) {
    logger.error("Error getting transaction receipt:", error);
    throw error;
  }
};

/**
 * Read contract data
 */
export const readContract = async ({
  address,
  abi,
  functionName,
  args = [],
}) => {
  try {
    return await publicClient.readContract({
      address,
      abi,
      functionName,
      args,
    });
  } catch (error) {
    logger.error(`Error reading contract ${functionName}:`, error);
    throw error;
  }
};

/**
 * Write contract transaction (Oracle only)
 */
export const writeContract = async ({
  address,
  abi,
  functionName,
  args = [],
}) => {
  if (!walletClient) {
    throw new Error(
      "Wallet client not initialized. Check oracle configuration."
    );
  }

  try {
    const { request } = await publicClient.simulateContract({
      address,
      abi,
      functionName,
      args,
      account: walletClient.account,
    });

    const hash = await walletClient.writeContract(request);
    logger.info(`Transaction submitted: ${hash}`);

    // Wait for transaction receipt
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    logger.info(`Transaction confirmed in block ${receipt.blockNumber}`);

    return receipt;
  } catch (error) {
    logger.error(`Error writing contract ${functionName}:`, error);
    throw error;
  }
};

/**
 * Watch contract events
 */
export const watchContractEvent = ({
  address,
  abi,
  eventName,
  onLogs,
  onError,
}) => {
  return publicClient.watchContractEvent({
    address,
    abi,
    eventName,
    onLogs,
    onError: onError || ((error) => logger.error("Event watch error:", error)),
  });
};

/**
 * Get logs for specific event
 */
export const getContractLogs = async ({
  address,
  abi,
  eventName,
  fromBlock,
  toBlock,
}) => {
  try {
    const logs = await publicClient.getContractEvents({
      address,
      abi,
      eventName,
      fromBlock: fromBlock || "earliest",
      toBlock: toBlock || "latest",
    });

    return logs;
  } catch (error) {
    logger.error(`Error getting logs for ${eventName}:`, error);
    throw error;
  }
};

export default {
  publicClient,
  walletClient,
  getBlockNumber,
  getTransactionReceipt,
  readContract,
  writeContract,
  watchContractEvent,
  getContractLogs,
};
