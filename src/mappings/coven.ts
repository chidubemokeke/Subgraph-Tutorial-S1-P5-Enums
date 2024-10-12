// Import the Transfer event from the CryptoCoven contract ABI
import { Transfer as CovenTransferEvent } from "../../generated/CryptoCoven/CryptoCoven";
import { Address, log } from "@graphprotocol/graph-ts";

// Import the Transfer entity from the generated schema, allowing us to create and update Transfer records in the store
import { CovenTransfer, MarketplaceInteraction } from "../../generated/schema";

// Import constants representing marketplace addresses and utility values
import {
  ZERO_ADDRESS,
  BIGINT_ONE,
  OPENSEAV1,
  OPENSEAV2,
  SEAPORT,
  LOOKS_RARE,
  OXPROTOCOL,
  OXPROTOCOLV2,
  BLUR,
  RARIBLE,
  X2Y2,
  NFTX,
  GENIE_SWAP,
  CRYPTO_COVEN,
} from "../utils/consts";

// Import helper functions that manage account creation and marketplace identification
import {
  getOrCreateAccount,
  getMarketplaceName,
  Marketplace,
} from "../utils/helper";

/**
 * Event handler for the Transfer event emitted by the CryptoCoven contract.
 * This function updates account information and creates a record of the transfer.
 *
 * @param event - The transfer event emitted by the smart contract
 */
export function handleTransfer(event: CovenTransferEvent): void {
  // Get or create account entities for 'from' and 'to' addresses
  let fromAccount = getOrCreateAccount(event.params.from);
  let toAccount = getOrCreateAccount(event.params.to);

  // Record the transaction hash for both sender and receiver accounts
  toAccount.txHash = event.transaction.hash;
  fromAccount.txHash = event.transaction.hash;

  /**
   * Update the covenSendCount for the 'from' account.
   * If this is the first transfer, initialize the count to 1.
   * Otherwise, increment the existing count.
   */
  fromAccount.sendCount = fromAccount.sendCount
    ? fromAccount.sendCount.plus(BIGINT_ONE)
    : BIGINT_ONE;

  /**
   * Update the covenReceiveCount for the 'to' account.
   * Similar to the send count, it initializes to 1 if this is the first receive action.
   */
  toAccount.sendCount = toAccount.sendCount
    ? toAccount.sendCount.plus(BIGINT_ONE)
    : BIGINT_ONE;

  /**
   * Update totalSpent for the receiver (toAccount).
   * totalSpent refers to the value sent in the transaction.
   * If totalSpent is null (first interaction), initialize it.
   * Otherwise, add the current transaction's value.
   */
  toAccount.totalSpent = toAccount.totalSpent
    ? toAccount.totalSpent.plus(event.transaction.value)
    : event.transaction.value;

  /**
   * Handle minting events, where the 'from' address is the zero address.
   * When an NFT is minted, increment the covenMintCount for the 'to' account.
   */
  if (event.params.from.equals(ZERO_ADDRESS)) {
    toAccount.mintCount = toAccount.mintCount
      ? toAccount.mintCount.plus(BIGINT_ONE)
      : BIGINT_ONE;
  }

  /**
   * Handle burning events, where the 'to' address is the zero address.
   * When an NFT is burned, increment the covenBurnCount for the 'from' account.
   */
  if (event.params.to.equals(ZERO_ADDRESS)) {
    fromAccount.mintCount = fromAccount.mintCount
      ? fromAccount.mintCount.plus(BIGINT_ONE)
      : BIGINT_ONE;
  }

  /**
   * Create a new Transfer entity to log the details of this specific transfer.
   * The ID is created by combining the transaction hash and the log index to ensure uniqueness.
   */
  let transfer = new CovenTransfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toHex()
  );

  // Set the 'from' and 'to' accounts in the Transfer entity
  transfer.from = fromAccount.id;
  transfer.to = toAccount.id;
  transfer.tokenId = event.params.tokenId;
  transfer.logIndex = event.logIndex;
  transfer.txHash = event.transaction.hash; // Transaction hash for reference

  // **Determine the Marketplace**
  let sender: Address | null = event.transaction.to; // Transaction 'to' address (potential marketplace contract address)
  let receiver: Address | null = event.transaction.from; // Transaction 'from' address (if the sender doesn't match)
  let marketplace: Marketplace = Marketplace.Unknown; // Default to unknown marketplace to log txHash for debugging.

  if (sender && receiver) {
    // Compare addresses with known marketplaces
    if (sender.equals(OPENSEAV1) || receiver.equals(OPENSEAV1)) {
      marketplace = Marketplace.OpenSeaV1; // Set marketplace to OpenSeaV1 if matched
    } else if (sender.equals(OPENSEAV2) || receiver.equals(OPENSEAV2)) {
      marketplace = Marketplace.OpenSeaV2; // Set marketplace to OpenSeaV2 if matched
    } else if (sender.equals(SEAPORT) || receiver.equals(SEAPORT)) {
      marketplace = Marketplace.SeaPort; // Set marketplace to SeaPort if matched
    } else if (sender.equals(LOOKS_RARE) || receiver.equals(LOOKS_RARE)) {
      marketplace = Marketplace.LooksRare; // Set marketplace to LooksRare if matched
    } else if (sender.equals(OXPROTOCOL) || receiver.equals(OXPROTOCOL)) {
      marketplace = Marketplace.OxProtocol; // Set marketplace to OxProtocol if matched
    } else if (sender.equals(OXPROTOCOLV2) || receiver.equals(OXPROTOCOLV2)) {
      marketplace = Marketplace.OxProtocolV2; // Set marketplace to OxProtocolV2 if matched
    } else if (sender.equals(BLUR) || receiver.equals(BLUR)) {
      marketplace = Marketplace.Blur; // Set marketplace to Blur if matched
    } else if (sender.equals(RARIBLE) || receiver.equals(RARIBLE)) {
      marketplace = Marketplace.Rarible; // Set marketplace to Rarible if matched
    } else if (sender.equals(X2Y2) || receiver.equals(X2Y2)) {
      marketplace = Marketplace.X2Y2; // Set marketplace to X2Y2 if matched
    } else if (sender.equals(NFTX) || receiver.equals(NFTX)) {
      marketplace = Marketplace.NFTX; // Set marketplace to NFTX if matched
    } else if (sender.equals(GENIE_SWAP) || receiver.equals(GENIE_SWAP)) {
      marketplace = Marketplace.GenieSwap; // Set marketplace to GenieSwap if matched
    } else if (sender.equals(CRYPTO_COVEN) || receiver.equals(CRYPTO_COVEN)) {
      marketplace = Marketplace.CryptoCoven; // Set marketplace to CryptoCoven if matched
    }
  }

  // Handle marketplace cases
  if (marketplace === Marketplace.Unknown) {
    log.info("Unknown MarketPlace: {}", [event.transaction.hash.toHexString()]);
  } else if (sender === ZERO_ADDRESS) {
    log.info("NFT Burn detected: {}", [event.transaction.hash.toHexString()]);
  } else if (!sender || !receiver) {
    log.info("Unusual Activity: {}", [event.transaction.hash.toHexString()]);
  }

  // Store the transaction value and marketplace name in the Transfer entity for future reference
  transfer.value = event.transaction.value; // Record the value of the transaction
  transfer.marketplace = getMarketplaceName(marketplace); // Retrieve the marketplace name as a string

  // Save the Transfer entity to the store for tracking transfers
  transfer.save();

  // **Track unique marketplace interactions for 'from' and 'to' accounts**

  let fromMarketplaceInteractionId =
    fromAccount.id + "-" + marketplace.toString(); // Unique ID for the marketplace interaction

  // Load the interaction if it exists for the 'from' account
  let fromInteraction = MarketplaceInteraction.load(
    fromMarketplaceInteractionId
  );

  if (fromInteraction == null) {
    // If this is the first time interacting with this marketplace
    fromInteraction = new MarketplaceInteraction(fromMarketplaceInteractionId); // Create new interaction entity
    fromInteraction.account = fromAccount.id; // Set the associated account
    fromInteraction.marketplace = getMarketplaceName(marketplace); // Set the marketplace name
    fromInteraction.save(); // Save the new interaction entity

    // Update the unique marketplace count for the 'from' account
    fromAccount.uniqueMarketplacesCount =
      fromAccount.uniqueMarketplacesCount.plus(BIGINT_ONE); // Increment the count
  }

  // Handle unique marketplace interaction for the 'to' account
  let toMarketplaceInteractionId = toAccount.id + "-" + marketplace.toString(); // Unique ID for the marketplace interaction

  // Load the interaction if it exists for the 'to' account
  let toInteraction = MarketplaceInteraction.load(toMarketplaceInteractionId);

  if (toInteraction == null) {
    // If this is the first time interacting with this marketplace
    toInteraction = new MarketplaceInteraction(toMarketplaceInteractionId); // Create new interaction entity
    toInteraction.account = toAccount.id; // Set the associated account
    toInteraction.marketplace = getMarketplaceName(marketplace); // Set the marketplace name
    toInteraction.save(); // Save the new interaction entity

    // Update the unique marketplace count for the 'to' account
    toAccount.uniqueMarketplacesCount =
      toAccount.uniqueMarketplacesCount.plus(BIGINT_ONE); // Increment the count
  }

  // Save the updated accounts with the unique marketplace count
  fromAccount.save(); // Save the updated 'from' account
  toAccount.save(); // Save the updated 'to' account
}
