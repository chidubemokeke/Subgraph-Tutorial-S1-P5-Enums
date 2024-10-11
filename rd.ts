/* Import the Transfer event from the CryptoCoven contract ABI
import { Transfer as CovenTransferEvent } from "../../generated/CryptoCoven/CryptoCoven";
import { Address, log } from "@graphprotocol/graph-ts";

// Import the Transfer entity from the generated schema, allowing us to create and update Transfer records in the store
import { CovenTransfer } from "../../generated/schema";
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
} from "./coven-consts";

// Import helper functions that ensures accounts are created or retrieved
import {
  getOrCreateAccount,
  getMarketplaceName,
  Marketplace,
} from "./coven-helper";

export function handleTransfer(event: CovenTransferEvent): void {
  // Get or create account entities for 'from' and 'to' addresses
  let fromAccount = getOrCreateAccount(event.params.from);
  let toAccount = getOrCreateAccount(event.params.to);

  // Record the transaction hash for both sender and receiver accounts
  toAccount.txHash = event.transaction.hash;
  fromAccount.txHash = event.transaction.hash;

  // **Update covenSendCount for the sender (fromAccount)**
  if (fromAccount.covenSendCount === null) {
    fromAccount.covenSendCount = BIGINT_ONE; // Initialize if null
  } else {
    fromAccount.covenSendCount = fromAccount.covenSendCount.plus(BIGINT_ONE); // Increment if not null
  }

  // **Update covenReceiveCount for the receiver (toAccount)**
  if (toAccount.covenReceiveCount === null) {
    toAccount.covenReceiveCount = BIGINT_ONE; // Initialize if null
  } else {
    toAccount.covenReceiveCount = toAccount.covenReceiveCount.plus(BIGINT_ONE); // Increment if not null
  }

  // **Update totalSpent for the receiver (toAccount)**
  if (toAccount.totalSpentCc === null) {
    toAccount.totalSpentCc = event.transaction.value; // Initialize if null
  } else {
    toAccount.totalSpentCc = toAccount.totalSpentCc.plus(
      event.transaction.value
    ); // Add value if not null
  }

  // **Handling minting events** (when 'from' is the zero address)
  if (event.params.from.equals(ZERO_ADDRESS)) {
    if (toAccount.covenMintCount === null) {
      toAccount.covenMintCount = BIGINT_ONE; // Initialize if null
    } else {
      toAccount.covenMintCount = toAccount.covenMintCount.plus(BIGINT_ONE); // Increment if not null
    }
  }

  // **Handling burning events** (when 'to' is the zero address)
  if (event.params.to.equals(ZERO_ADDRESS)) {
    if (fromAccount.covenBurnCount === null) {
      fromAccount.covenBurnCount = BIGINT_ONE; // Initialize if null
    } else {
      fromAccount.covenBurnCount = fromAccount.covenBurnCount.plus(BIGINT_ONE); // Increment if not null
    }
  }

  // **Create Transfer entity**
  let transfer = new CovenTransfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toHex() // Unique ID for the transfer event
  );

  // Added these commented out fields to directly query all mints and burns from the NFT contract.
  // Set the burn count in the transfer entity based on the sender's burn count
  // transfer.burnCount = fromAccount.covenBurnCount;

  // Set the mint count in the transfer entity based on the receiver's mint count
  // transfer.mintCount = toAccount.covenMintCount;

  // Set 'from' and 'to' accounts in the Transfer entity
  transfer.fromCc = fromAccount.id;
  transfer.toCc = toAccount.id;
  transfer.tokenId = event.params.tokenId;
  transfer.logIndex = event.logIndex;
  transfer.txHash = event.transaction.hash;

  // **Determine the Marketplace**
  let sender: Address | null = event.transaction.to; // Transaction 'to' address (potential marketplace contract address)
  let receiver: Address | null = event.transaction.from; // Transaction 'from' address (if the sender doesn't match)
  let marketplace: Marketplace = Marketplace.Unknown; // Default to unknown marketplace to log txHash for debugging.

  // Match sender or receiver with known marketplaces
  if (sender && receiver) {
    if (sender.equals(OPENSEAV1) || receiver.equals(OPENSEAV1)) {
      marketplace = Marketplace.OpenSeaV1;
    } else if (sender.equals(OPENSEAV2) || receiver.equals(OPENSEAV2)) {
      marketplace = Marketplace.OpenSeaV2;
    } else if (sender.equals(SEAPORT) || receiver.equals(SEAPORT)) {
      marketplace = Marketplace.SeaPort;
    } else if (sender.equals(LOOKS_RARE) || receiver.equals(LOOKS_RARE)) {
      marketplace = Marketplace.LooksRare;
    } else if (sender.equals(OXPROTOCOL) || receiver.equals(OXPROTOCOL)) {
      marketplace = Marketplace.OxProtocol;
    } else if (sender.equals(OXPROTOCOLV2) || receiver.equals(OXPROTOCOLV2)) {
      marketplace = Marketplace.OxProtocolV2;
    } else if (sender.equals(BLUR) || receiver.equals(BLUR)) {
      marketplace = Marketplace.Blur;
    } else if (sender.equals(RARIBLE) || receiver.equals(RARIBLE)) {
      marketplace = Marketplace.Rarible;
    } else if (sender.equals(X2Y2) || receiver.equals(X2Y2)) {
      marketplace = Marketplace.X2Y2;
    } else if (sender.equals(NFTX) || receiver.equals(NFTX)) {
      marketplace = Marketplace.NFTX;
    } else if (sender.equals(GENIE_SWAP) || receiver.equals(GENIE_SWAP)) {
      marketplace = Marketplace.GenieSwap;
    } else if (sender.equals(CRYPTO_COVEN) || receiver.equals(CRYPTO_COVEN)) {
      marketplace = Marketplace.CryptoCoven;
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

  // Save the value and marketplace name to the transfer entity if applicable.
  transfer.value = event.transaction.value;
  transfer.marketplace = getMarketplaceName(marketplace);
  transfer.save(); // Save the transfer entity to the store
}*/

/**
 * Optimized function to determine the marketplace based on the transaction's 'to' and 'from' addresses.
 * It uses a mapping of known marketplace addresses to the appropriate marketplace enum values.
 *
 * A `Map` is a data structure that stores key-value pairs, allowing you to quickly retrieve a value (in this case,
 * a marketplace) based on a key (an address).
 *
 * @param sender - The 'to' address in the transaction (possible marketplace)
 * @param receiver - The 'from' address in the transaction
 * @returns - A Marketplace enum value representing the detected marketplace
 
export function mapMarketplace(
  sender: Address | null,
  receiver: Address | null
): Marketplace {
  // Create a `Map` object to store known marketplace addresses as keys and their corresponding marketplace enum as values.
  // The `Map` allows us to efficiently check if an address belongs to a known marketplace and get the corresponding marketplace.
  let marketplaceMapping = new Map<Address, Marketplace>();

  // Populate the map with key-value pairs. The key is the marketplace's contract address (of type Address),
  // and the value is the enum representing the marketplace.
  marketplaceMapping.set(OPENSEAV1, Marketplace.OpenSeaV1); // OpenSea V1 marketplace
  marketplaceMapping.set(OPENSEAV2, Marketplace.OpenSeaV2); // OpenSea V2 marketplace
  marketplaceMapping.set(SEAPORT, Marketplace.SeaPort); // Seaport marketplace (a newer version of OpenSea)
  marketplaceMapping.set(LOOKS_RARE, Marketplace.LooksRare); // LooksRare marketplace
  marketplaceMapping.set(OXPROTOCOL, Marketplace.OxProtocol); // 0xProtocol marketplace
  marketplaceMapping.set(OXPROTOCOLV2, Marketplace.OxProtocolV2); // 0xProtocol V2
  marketplaceMapping.set(BLUR, Marketplace.Blur); // Blur marketplace
  marketplaceMapping.set(RARIBLE, Marketplace.Rarible); // Rarible marketplace
  marketplaceMapping.set(X2Y2, Marketplace.X2Y2); // X2Y2 marketplace
  marketplaceMapping.set(NFTX, Marketplace.NFTX); // NFTX marketplace
  marketplaceMapping.set(GENIE_SWAP, Marketplace.GenieSwap); // GenieSwap marketplace
  marketplaceMapping.set(CRYPTO_COVEN, Marketplace.CryptoCoven); // CryptoCoven marketplace

  // The `Map`'s `has()` method checks if a specific address exists in the map as a key.
  // If the `sender` address is a known marketplace, return the corresponding enum value (the marketplace).
  if (sender && marketplaceMapping.has(sender)) {
    return marketplaceMapping.get(sender); // The '!' ensures that we assert that the result will not be null
  }

  // If the `sender` is not a known marketplace, we check the `receiver` address.
  if (receiver && marketplaceMapping.has(receiver)) {
    return marketplaceMapping.get(receiver); // Similar logic applies here for the receiver
  }

  // If neither the sender nor receiver matches a known marketplace, we return `Marketplace.Unknown`.
  // This is the default case for transactions that occur outside of known marketplaces.
  return Marketplace.Unknown;
}**/
