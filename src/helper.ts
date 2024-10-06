// Import the Account entity type from the generated schema
import { Account } from "../generated/schema";

// Import required types from the Graph Protocol library
import { Bytes, BigInt } from "@graphprotocol/graph-ts";

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
    account.totalSpent = BigInt.fromI32(0); // Initialize the total spent amount to 0 (BigInt type)
    account.sentCount = 0; // Initialize the count of NFTs sent to 0
    account.receivedCount = 0; // Initialize the count of NFTs received to 0

    // You can add any other fields or initialize additional fields here if needed
    // For example: account.mintCount = 0; // Uncomment to initialize mintCount

    // Save the newly created account entity to the store to persist its state
    account.save();
  }

  // Return the account entity, which will be either the existing one or the newly created one
  return account as Account; // Cast to Account type for TypeScript type checking
}
