// Import the Account entity type from the generated schema
import { Account, Sale } from "../../generated/schema";
// Import required types from the Graph Protocol library
import { Bytes } from "@graphprotocol/graph-ts";
import { BIGINT_ZERO } from "../CryptoCoven/coven-consts";

export enum Marketplace {
  OPENSEAV1,
  OPENSEAV2,
  SEAPORT,
  LOOKS_RARE,
  OxProtocol,
  BLUR,
  RARIBLE,
  X2Y2,
  Unknown,
  CRYPTO_COVEN,
}

export enum NFT {
  CRYPTO_COVEN,
  CRYPTO_KITTIES,
  Unknown,
}

// Function to get or create an Account entity based on an Ethereum address
export function getOrCreateAccount(address: Bytes): Account {
  // Convert the provided Ethereum address to a hexadecimal string for use as the unique ID for the Account entity
  let accountId = address.toHex();

  // Try to load the account entity from the store using the accountId
  let account = Account.load(accountId);

  // Check if the account entity exists in the store
  if (account == null) {
    // If the account does not exist, create a new Account entity
    account = new Account(accountId); // Use accountId as the unique identifier

    // Initialize fields for the new account entity
    account.totalSpent = BIGINT_ZERO; // Initialize the total spent amount to 0 (BigInt type)
    account.covenSendCount = BIGINT_ZERO; // Initialize the count of NFTs sent to 0
    account.covenReceiveCount = BIGINT_ZERO; // Initialize the count of NFTs received to 0
    account.covenMintCount = BIGINT_ZERO;
    account.kittyMintCount = BIGINT_ZERO;

    // Save the newly created account entity to the store to persist its state
    account.save();
  }

  // Return the account entity, which will be either the existing one or the newly created one
  return account as Account;
}

/**
 * Converts a Marketplace enum value to its corresponding string representation.
 *
 * @param marketplace - The Marketplace enum value to convert.
 * @returns A string representing the name of the marketplace.
 */
export function getMarketplaceName(marketplace: Marketplace): string {
  // Using if-else statements to map the enum value to a string
  if (marketplace === Marketplace.OPENSEAV1) {
    return "OpenSeaV1"; // If the marketplace is OpenSea, return its string representation
  } else if (marketplace === Marketplace.OPENSEAV2) {
    return "OpenSeaV2";
  } else if (marketplace === Marketplace.RARIBLE) {
    return "Rarible"; // If the marketplace is Rarible, return its string representation
  } else if (marketplace === Marketplace.SEAPORT) {
    return "SeaPort"; // If the marketplace is SeaPort, return its string representation
  } else if (marketplace === Marketplace.LOOKS_RARE) {
    return "LooksRare"; // If the marketplace is LooksRare, return its string representation
  } else if (marketplace === Marketplace.OxProtocol) {
    return "OxProtocol"; // If the marketplace is OxProtocol, return its string representation
  } else if (marketplace === Marketplace.BLUR) {
    return "Blur"; // If the marketplace is Blur, return its string representation
  } else if (marketplace === Marketplace.X2Y2) {
    return "X2Y2"; // If the marketplace is X2Y2, return its string representation
  } else {
    return "Unknown"; // If the marketplace doesn't match any known values, return "Unknown"
  }
}
