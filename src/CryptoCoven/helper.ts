// Import the Account entity type from the generated schema
import { Account, Sale } from "../../generated/schema";
// Import required types from the Graph Protocol library
import { BigDecimal, Bytes } from "@graphprotocol/graph-ts";
import { BIGINT_ZERO } from "./constants";

export enum Marketplace {
  OPENSEAV1,
  SeaPort,
  LooksRare,
  OxProtocol,
  Blur,
  Rarible,
  X2Y2,
  Unknown,
  CryptoCoven,
  OPENSEAV2,
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
    account.sendCount = BIGINT_ZERO; // Initialize the count of NFTs sent to 0
    account.receiveCount = BIGINT_ZERO; // Initialize the count of NFTs received to 0
    account.txHash = Bytes.empty();

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
  // Use if-else statements to map the enum value to a string
  if (marketplace === Marketplace.OPENSEAV1) {
    return "OpenSeaV1"; // If the marketplace is OpenSea, return its string representation
  } else if (marketplace === Marketplace.OPENSEAV2) {
    return "OpenSeaV2";
  } else if (marketplace === Marketplace.Rarible) {
    return "Rarible"; // If the marketplace is Rarible, return its string representation
  } else if (marketplace === Marketplace.SeaPort) {
    return "SeaPort"; // If the marketplace is SeaPort, return its string representation
  } else if (marketplace === Marketplace.LooksRare) {
    return "LooksRare"; // If the marketplace is LooksRare, return its string representation
  } else if (marketplace === Marketplace.OxProtocol) {
    return "OxProtocol"; // If the marketplace is OxProtocol, return its string representation
  } else if (marketplace === Marketplace.Blur) {
    return "Blur"; // If the marketplace is Blur, return its string representation
  } else if (marketplace === Marketplace.X2Y2) {
    return "X2Y2"; // If the marketplace is X2Y2, return its string representation
  } else {
    return "Unknown"; // If the marketplace doesn't match any known values, return "Unknown"
  }
}

/**export function getOrCreateSale(id: string): Sale {
  let trade = Sale.load(id);

  if (!trade) {
    trade = new Sale(id);
    trade.referenceId = BIGINT_ZERO;
    trade.value = BIGINT_ZERO;
    trade.marketplace = "";
    trade.buyer = Bytes.empty();
    trade.seller = Bytes.empty();
    trade.totalSalesCount = BIGINT_ZERO;
    trade.totalSalesVolume = BIGINT_ZERO;
    trade.averageSalePrice = BigDecimal.zero();
    trade.highestSalePrice = BIGINT_ZERO;
    trade.lowestSalePrice = BIGINT_ZERO;

    trade.save();
  }
  return trade as Sale;
}**/
