// Import the Transfer event from the CryptoCoven contract ABI
import { Transfer as TransferEvent } from "../generated/CryptoCoven/CryptoCoven";
import { Address, log } from "@graphprotocol/graph-ts";

// Import the Transfer entity from the generated schema, allowing us to create and update Transfer records in the store
import { Transfer, Sale } from "../generated/schema";
import {
  ZERO_ADDRESS,
  OPENSEAV1,
  OPENSEAV2,
  RARIBLE,
  SEAPORT,
  LOOKS_RARE,
  OXProtocol,
  BLUR,
  X2Y2,
  BIGINT_ONE,
  CRYPTO_COVEN,
} from "./constants";

// Import a helper function that ensures accounts are created or retrieved
import { getOrCreateAccount, getMarketplaceName, Marketplace } from "./helper";

export function handleTransfer(event: TransferEvent): void {
  // Get or create an account entity for the sender ('from') address.
  // If the sender's account doesn't exist yet, 'getOrCreateAccount' will create it.
  let fromAccount = getOrCreateAccount(event.params.from);

  // Get or create an account entity for the receiver ('to') address.
  let toAccount = getOrCreateAccount(event.params.to);

  toAccount.txHash = event.transaction.hash;
  fromAccount.txHash = event.transaction.hash;

  // Tracking the Sender:**
  // Increment the number of NFTs the sender has sent.
  // If the sender's sendCount is already set (not null), increment it by one (BIGINT_ONE).
  // If sendCount is null (i.e., it's the sender's first time sending), initialize it to BIGINT_ONE.
  if (fromAccount.sendCount !== null) {
    fromAccount.sendCount = fromAccount.sendCount.plus(BIGINT_ONE); // Add 1 to sendCount
  } else {
    fromAccount.sendCount = BIGINT_ONE; // Initialize sendCount as 1 if it's the sender's first transaction
  }

  // **Tracking the Receiver:**
  // Increment the number of NFTs the receiver has received.
  // Same logic as sendCount: increment if it's not null, otherwise initialize as BIGINT_ONE.
  if (toAccount.receiveCount !== null) {
    toAccount.receiveCount = toAccount.receiveCount.plus(BIGINT_ONE); // Add 1 to receiveCount
  } else {
    toAccount.receiveCount = BIGINT_ONE; // Initialize receiveCount as 1 if it's the receiver's first transaction
  }

  // **Tracking Total Spending:**
  // The totalSpent field keeps track of how much the receiver has spent on NFTs.
  // Add the value of the current transaction to the totalSpent field.
  // If totalSpent is null (meaning no prior spending), initialize it with the current transaction value.
  if (toAccount.totalSpent !== null) {
    toAccount.totalSpent = toAccount.totalSpent.plus(event.transaction.value); // Add the value of this transaction to the total spent
  } else {
    toAccount.totalSpent = event.transaction.value; // Initialize totalSpent to the value of this transaction if no prior record
  }

  // **Checking for Minting Event:**
  // A minting event happens when the 'from' address is the zero address (0x000000...).
  // In a minting event, the NFT is being created rather than transferred from another account.
  // If the 'from' address in the transfer is the zero address, or if the transaction's 'from' field is the zero address,
  // this means the receiver is minting an NFT.
  if (
    event.params.from == ZERO_ADDRESS ||
    event.transaction.from == ZERO_ADDRESS
  ) {
    // Increment the mintCount for the receiver (i.e., the number of NFTs they've minted).
    if (toAccount.mintCount !== null) {
      toAccount.mintCount = BIGINT_ONE; // Set mintCount to 1 if it's null
    } else {
      toAccount.mintCount = BIGINT_ONE; // Initialize mintCount as 1 if this is the receiver's first minted NFT
    }
  }

  // Save Accounts
  fromAccount.save();
  toAccount.save();

  // Create a unique ID for the Transfer entity using the transaction hash and log index to avoid collisions
  let transfer = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString() // Unique ID format: transaction hash + log index
  );

  // Set the properties of the Transfer entity with relevant data from the transfer event
  transfer.from = fromAccount.id; // Store the ID of the sender account
  transfer.to = toAccount.id; // Store the ID of the receiver account
  transfer.tokenId = event.params.tokenId; // Set the unique token ID for the NFT being transferred
  transfer.logIndex = event.logIndex; // Store the value associated with the transaction
  transfer.txHash = event.transaction.hash; // Save the transaction hash for referencing this transfer

  // Check for the Marketplace
  let sender: Address | null = event.transaction.to;
  let marketplace: Marketplace = Marketplace.Unknown; // Default value

  if (sender) {
    if (sender.equals(CRYPTO_COVEN)) marketplace = Marketplace.CryptoCoven;
    else if (sender.equals(OPENSEAV1)) marketplace = Marketplace.OPENSEAV1;
    else if (sender.equals(OPENSEAV2)) marketplace = Marketplace.OPENSEAV2;
    else if (sender.equals(RARIBLE)) marketplace = Marketplace.Rarible;
    else if (sender.equals(SEAPORT)) marketplace = Marketplace.SeaPort;
    else if (sender.equals(LOOKS_RARE)) marketplace = Marketplace.LooksRare;
    else if (sender.equals(OXProtocol)) marketplace = Marketplace.OxProtocol;
    else if (sender.equals(BLUR)) marketplace = Marketplace.Blur;
    else if (sender.equals(X2Y2)) marketplace = Marketplace.X2Y2;
    else
      log.info("Transfer from unknown marketplace: {}", [
        event.transaction.hash.toHexString(),
      ]);
  } else {
    log.info("Transfer from unknown sender: {}", ["null"]);
  }

  transfer.marketplace = getMarketplaceName(marketplace);
  transfer.save();
}
/**Check the transaction's sender address to determine the marketplace
  let marketplace: Marketplace; // Declare the marketplace variable as the enum type

  // Get the transaction's 'to' address (can be null)
  let sender: Address | null = event.transaction.to; // Explicitly declare sender type

  // Check if the sender is null before proceeding with the if-else statements
  if (sender == null) {
    // If the sender is null, log this as an unknown sender
    log.info("Transfer from unknown sender: {}", ["null"]);
    marketplace = Marketplace.Unknown; // Assign marketplace as Unknown
  } else {
    // Check the sender's address and determine the marketplace based on known addresses
    if (sender.equals(OPENSEA)) {
      // If the sender matches the OpenSea address, set the marketplace accordingly
      marketplace = Marketplace.OpenSea;
    } else if (sender.equals(RARIBLE)) {
      // If the sender matches the Rarible address, set the marketplace accordingly
      marketplace = Marketplace.Rarible;
    } else if (sender.equals(SEAPORT)) {
      // If the sender matches the SeaPort address, set the marketplace accordingly
      marketplace = Marketplace.SeaPort;
    } else if (sender.equals(LOOKS_RARE)) {
      // If the sender matches the LooksRare address, set the marketplace accordingly
      marketplace = Marketplace.LooksRare;
    } else if (sender.equals(OXProtocol)) {
      // If the sender matches the OxProtocol address, set the marketplace accordingly
      marketplace = Marketplace.OxProtocol;
    } else if (sender.equals(BLUR)) {
      // If the sender matches the Blur address, set the marketplace accordingly
      marketplace = Marketplace.Blur;
    } else if (sender.equals(X2Y2)) {
      // If the sender matches the X2Y2 address, set the marketplace accordingly
      marketplace = Marketplace.X2Y2;
    } else {
      // If the sender doesn't match any known addresses, log it as an unknown marketplace
      log.info("Transfer from unknown marketplace: {}", [sender.toHexString()]);
      marketplace = Marketplace.Unknown; // Assign marketplace as Unknown
    }
  }

  // Optionally save the string representation of the marketplace
  transfer.marketplace = getMarketplaceName(marketplace); // Store the marketplace name as a string

  // Save the Transfer entity to the store
  transfer.save(); // Persist the updated transfer information
}**/
