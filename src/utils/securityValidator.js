import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

/**
 * Security Validator
 * Checks for security issues and misconfigurations
 */

/**
 * Validate JWT secret in production
 */
export const validateJWTSecret = () => {
  if (config.server.isProduction) {
    const defaultSecrets = [
      'change-this-secret-in-production',
      'your-secret-here',
      'secret',
      'jwt-secret',
    ];

    if (defaultSecrets.includes(config.security.jwtSecret)) {
      logger.error('❌ CRITICAL: Using default JWT_SECRET in production!');
      throw new Error(
        'Security Error: JWT_SECRET must be changed in production. Set a secure random string in environment variables.'
      );
    }

    if (config.security.jwtSecret.length < 32) {
      logger.warn(
        '⚠️  WARNING: JWT_SECRET is shorter than recommended (minimum 32 characters)'
      );
    }
  }
};

/**
 * Validate database credentials in production
 */
export const validateDatabaseConfig = () => {
  if (config.server.isProduction) {
    if (!config.database.password || config.database.password === '') {
      logger.error('❌ CRITICAL: Database password not set in production!');
      throw new Error(
        'Security Error: DB_PASSWORD must be set in production.'
      );
    }

    const weakPasswords = ['password', 'admin', '123456', 'postgres'];
    if (weakPasswords.includes(config.database.password.toLowerCase())) {
      logger.error('❌ CRITICAL: Using weak database password in production!');
      throw new Error(
        'Security Error: Database password is too weak. Use a strong password.'
      );
    }
  }
};

/**
 * Validate blockchain configuration
 */
export const validateBlockchainConfig = () => {
  const requiredContracts = [
    'marketFactory',
    'feeManager',
    'socialPredictions',
    'collateralToken',
  ];

  const missingContracts = requiredContracts.filter(
    (contract) => !config.blockchain.contracts[contract]
  );

  if (missingContracts.length > 0) {
    logger.warn(
      `⚠️  Missing contract addresses: ${missingContracts.join(', ')}`
    );
    logger.warn('Some features may not work without these addresses.');
  }

  // Validate RPC URL
  if (!config.blockchain.rpcUrl || config.blockchain.rpcUrl === '') {
    logger.error('❌ CRITICAL: Blockchain RPC URL not configured!');
    throw new Error('Configuration Error: BLOCKCHAIN_RPC_URL is required.');
  }
};

/**
 * Validate Oracle configuration if enabled
 */
export const validateOracleConfig = () => {
  if (config.oracle.enabled) {
    if (!config.oracle.privateKey || config.oracle.privateKey === '') {
      logger.error('❌ CRITICAL: Oracle enabled but ORACLE_PRIVATE_KEY not set!');
      throw new Error(
        'Configuration Error: ORACLE_PRIVATE_KEY required when oracle is enabled.'
      );
    }

    if (!config.oracle.privateKey.startsWith('0x')) {
      logger.error('❌ CRITICAL: ORACLE_PRIVATE_KEY must start with 0x');
      throw new Error(
        'Configuration Error: Invalid ORACLE_PRIVATE_KEY format.'
      );
    }

    if (config.oracle.privateKey.length !== 66) {
      logger.error('❌ CRITICAL: ORACLE_PRIVATE_KEY has invalid length');
      throw new Error(
        'Configuration Error: ORACLE_PRIVATE_KEY must be 64 hex characters (+ 0x prefix).'
      );
    }
  }
};

/**
 * Validate CORS configuration
 */
export const validateCORSConfig = () => {
  if (config.server.isProduction) {
    const dangerousOrigins = ['*', 'http://localhost:3000'];
    
    if (dangerousOrigins.includes(config.cors.origin)) {
      logger.warn(
        `⚠️  WARNING: CORS origin is set to "${config.cors.origin}" in production!`
      );
      logger.warn('Consider setting CORS_ORIGIN to your actual frontend URL.');
    }
  }
};

/**
 * Run all security validations
 */
export const runSecurityChecks = () => {
  logger.info('🔒 Running security validation checks...');

  try {
    validateJWTSecret();
    validateDatabaseConfig();
    validateBlockchainConfig();
    validateOracleConfig();
    validateCORSConfig();

    logger.info('✅ Security checks passed');
    return true;
  } catch (error) {
    logger.error('❌ Security validation failed:', error.message);
    
    // Exit in production, warn in development
    if (config.server.isProduction) {
      process.exit(1);
    }
    
    return false;
  }
};

export default {
  validateJWTSecret,
  validateDatabaseConfig,
  validateBlockchainConfig,
  validateOracleConfig,
  validateCORSConfig,
  runSecurityChecks,
};

