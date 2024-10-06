import { Account } from "../generated/schema";
import { Bytes, BigInt } from "@graphprotocol/graph-ts";

// Function to get or create an Account entity
export function getOrCreateAccount(address: Bytes): Account {
  // Convert the Address to a string for use as the ID
  let accountId = address.toHex();

  // Try to load the account entity from the store
  let account = Account.load(accountId);

  // If the account doesn't exist, create a new one
  if (account == null) {
    account = new Account(accountId);

    // Initialize fields for a new account entity
    account.totalSpent = BigInt.fromI32(0); // Initialize totalSent field to 0
    account.sentCount = 0;
    account.receivedCount = 0;

    // You can add any other fields or initialize additional fields here if needed

    account.save(); // Save the new account entity to the store
  }

  // Return the account entity (existing or newly created)
  return account as Account;
}
