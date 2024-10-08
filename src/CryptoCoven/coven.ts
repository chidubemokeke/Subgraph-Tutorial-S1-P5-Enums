// Import the Transfer event from the CryptoCoven contract ABI
import { Transfer as CovenTransferEvent } from "../../generated/CryptoCoven/CryptoCoven";
import { Address, log } from "@graphprotocol/graph-ts";

// Import the Transfer entity from the generated schema, allowing us to create and update Transfer records in the store
import { CovenTransfer } from "../../generated/schema";
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
} from "./coven-consts";

// Import helper functions that ensures accounts are created or retrieved
import {
  getOrCreateAccount,
  getMarketplaceName,
  Marketplace,
  NFT,
} from "./coven-helper";
import { CRYPTO_KITTIES } from "../CryptoKitties/kitties-consts";

export function handleTransfer(event: CovenTransferEvent): void {
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
  let transfer = new CovenTransfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString() // Unique ID format: transaction hash + log index
  );

  // Set the properties of the Transfer entity with relevant data from the transfer event
  transfer.fromC = fromAccount.id; // Store the ID of the sender account
  transfer.toC = toAccount.id; // Store the ID of the receiver account
  transfer.tokenId = event.params.tokenId; // Set the unique token ID for the NFT being transferred
  transfer.logIndex = event.logIndex; // Store the value associated with the transaction
  transfer.txHash = event.transaction.hash; // Save the transaction hash for referencing this transfer

  // Initialize the nftType by checking the 'to' address of the transaction
  let transactionTo: Address | null = event.transaction.to;

  let nft: NFT = NFT.Unknown; // Default to Unknown in case no match is found

  // Check if the 'to' address matches any known NFT contract addresses
  if (transactionTo) {
    if (transactionTo.equals(CRYPTO_COVEN)) {
      nft = NFT.CRYPTO_COVEN;
    } else if (transactionTo.equals(CRYPTO_KITTIES)) {
      nft = NFT.CRYPTO_KITTIES;
    }
  }

  // If the 'to' address didn't match, check the 'from' address of the transaction
  let transactionFrom: Address | null = event.transaction.from;
  if (transactionFrom) {
    if (transactionFrom.equals(CRYPTO_COVEN)) {
      nft = NFT.CRYPTO_COVEN;
    } else if (transactionFrom.equals(CRYPTO_KITTIES)) {
      nft = NFT.CRYPTO_KITTIES;
    }
  }

  // Log information if no matching NFT contract was found
  if (nft == NFT.Unknown) {
    log.info("NFT type could not be determined for transaction: {}", [
      event.transaction.hash.toHexString(),
    ]);
  }

  // Check for the Marketplace + // Accessing the event.transaction parameters to compare contracts to determine marketPlace
  let sender: Address | null = event.transaction.to;
  let marketplace: Marketplace = Marketplace.Unknown; // Default value

  if (sender) {
    if (sender.equals(CRYPTO_COVEN)) marketplace = Marketplace.CRYPTO_COVEN;
    else if (sender.equals(OPENSEAV1)) marketplace = Marketplace.OPENSEAV1;
    else if (sender.equals(OPENSEAV2)) marketplace = Marketplace.OPENSEAV2;
    else if (sender.equals(RARIBLE)) marketplace = Marketplace.RARIBLE;
    else if (sender.equals(SEAPORT)) marketplace = Marketplace.SEAPORT;
    else if (sender.equals(LOOKS_RARE)) marketplace = Marketplace.LOOKS_RARE;
    else if (sender.equals(OXProtocol)) marketplace = Marketplace.OxProtocol;
    else if (sender.equals(BLUR)) marketplace = Marketplace.BLUR;
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
