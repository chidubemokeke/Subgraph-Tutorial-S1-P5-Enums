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
  BLUR,
  X2Y2,
  BIGINT_ONE,
  CRYPTO_COVEN,
  OXPROTOCOL,
} from "./coven-consts";

// Import helper functions that ensures accounts are created or retrieved
import {
  getOrCreateAccount,
  getMarketplaceName,
  Marketplace,
} from "./coven-helper";

export function handleTransfer(event: CovenTransferEvent): void {
  // Get or create account entities for 'from' and 'to' addresses
  let fromAccount = getOrCreateAccount(event.params.from); // Sender's account
  let toAccount = getOrCreateAccount(event.params.to); // Receiver's account

  // Record the transaction hash for both sender and receiver accounts
  toAccount.txHash = event.transaction.hash;
  fromAccount.txHash = event.transaction.hash;

  // If the sender has sent NFTs before (i.e., covenSendCount is not null), increment by 1; otherwise, initialize to 1.
  if (fromAccount.covenSendCount === null) {
    fromAccount.covenSendCount = BIGINT_ONE; // Initialize to 1 if first send
  } else {
    fromAccount.covenSendCount = fromAccount.covenSendCount.plus(BIGINT_ONE); // Increment by 1 if count exists
  }

  // If the receiver has received NFTs before (i.e., covenReceiveCount is not null), increment by 1; otherwise, initialize to 1.
  if (toAccount.covenReceiveCount === null) {
    toAccount.covenReceiveCount = BIGINT_ONE; // Initialize to 1 if first receive
  } else {
    toAccount.covenReceiveCount = toAccount.covenReceiveCount.plus(BIGINT_ONE); // Increment by 1 if count exists
  }

  // Add the current transaction value to the receiver's total spent. If it's the first time, initialize the totalSpent field.
  if (toAccount.totalSpent === null) {
    toAccount.totalSpent = event.transaction.value; // Initialize with current value
  } else {
    toAccount.totalSpent = toAccount.totalSpent.plus(event.transaction.value); // Add current value to total
  }

  // **Handling minting events**
  // Check if this is a minting event (i.e., if the 'from' address is the zero address). If so, increment the mintCount.
  if (
    event.params.from == ZERO_ADDRESS || // If the sender is the zero address
    event.transaction.from == ZERO_ADDRESS // If the transaction 'from' is the zero address
  ) {
    // Ensure that the receiver account exists
    if (toAccount) {
      if (toAccount.covenMintCount === null) {
        toAccount.covenMintCount = BIGINT_ONE; // Initialize mint count to 1
      } else {
        toAccount.covenMintCount = toAccount.covenMintCount.plus(BIGINT_ONE); // Increment mint count
      }
    }
  }

  // **Create Transfer entity**
  let transfer = new CovenTransfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toHex() // Unique ID for the transfer event
  );

  // Set 'from' and 'to' accounts in the Transfer entity
  transfer.fromC = fromAccount.id;
  transfer.toC = toAccount.id;
  transfer.tokenId = event.params.tokenId;
  transfer.logIndex = event.logIndex;
  transfer.txHash = event.transaction.hash;

  // **Determine the Marketplace**
  let sender: Address | null = event.transaction.to; // Transaction 'to' address (potential marketplace contract address)
  let receiver: Address | null = event.transaction.from; // Transaction 'from' address (potential marketplace contract address)
  let marketplace: Marketplace = Marketplace.Unknown; // Default to unknown marketplace

  // Match sender and receiver with known marketplaces
  if (sender && receiver) {
    if (sender.equals(CRYPTO_COVEN) || receiver.equals(CRYPTO_COVEN)) {
      marketplace = Marketplace.CryptoCoven;
    } else if (sender.equals(OPENSEAV1) || receiver.equals(OPENSEAV1)) {
      marketplace = Marketplace.OpenSeaV1;
    } else if (sender.equals(OPENSEAV2) || receiver.equals(OPENSEAV2)) {
      marketplace = Marketplace.OpenSeaV2;
    } else if (sender.equals(RARIBLE) || receiver.equals(RARIBLE)) {
      marketplace = Marketplace.Rarible;
    } else if (sender.equals(SEAPORT) || receiver.equals(SEAPORT)) {
      marketplace = Marketplace.SeaPort;
    } else if (sender.equals(LOOKS_RARE) || receiver.equals(LOOKS_RARE)) {
      marketplace = Marketplace.LooksRare;
    } else if (sender.equals(OXPROTOCOL) || receiver.equals(OXPROTOCOL)) {
      marketplace = Marketplace.OxProtocol;
    } else if (sender.equals(BLUR) || receiver.equals(BLUR)) {
      marketplace = Marketplace.Blur;
    } else if (sender.equals(X2Y2) || receiver.equals(X2Y2)) {
      marketplace = Marketplace.X2Y2;
    }
  }

  // Handle marketplace cases
  if (marketplace === Marketplace.Unknown) {
    log.info("Transfer from unknown sender: {} to unknown receiver: {}", [
      event.transaction.hash.toHexString(),
      "null",
    ]);
  } else if (sender && !receiver) {
    log.info("Transfer from known sender to unknown receiver: {}", [
      event.transaction.hash.toHexString(),
    ]);
  } else if (!sender && receiver) {
    log.info("Transfer from unknown sender to known receiver: {}", [
      event.transaction.hash.toHexString(),
    ]);
  }

  // Save the marketplace name to the transfer entity
  transfer.marketplace = getMarketplaceName(marketplace);
  transfer.save(); // Save the transfer entity to the store

  // Save updated account entities to the store
  fromAccount.save(); // Save sender's account
  toAccount.save(); // Save receiver's account
}
