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
  BIGINT_ZERO,
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
  // Get or create account entities for 'from' and 'to' addresses
  let fromAccount = getOrCreateAccount(event.params.from); // Sender's account
  let toAccount = getOrCreateAccount(event.params.to); // Receiver's account

  // Record the transaction hash/logIndex for both sender and receiver accounts
  toAccount.logIndex = event.logIndex;
  fromAccount.logIndex = event.logIndex;
  toAccount.txHash = event.transaction.hash;
  fromAccount.txHash = event.transaction.hash;

  // **Track sender activity**
  // Increment the number of NFTs the sender has sent (covenSendCount).
  // If the sender has sent NFTs before, increment by 1; otherwise, initialize to 1.
  fromAccount.covenSendCount = (fromAccount.covenSendCount || BIGINT_ZERO).plus(
    BIGINT_ONE
  );

  // **Track receiver activity**
  // Increment the number of NFTs the receiver has received (covenReceiveCount).
  // If the receiver has received NFTs before, increment by 1; otherwise, initialize to 1.
  toAccount.covenReceiveCount = (
    toAccount.covenReceiveCount || BIGINT_ZERO
  ).plus(BIGINT_ONE);

  // **Track total spending**
  // Add the current transaction value to the receiver's total spending (totalSpent).
  // If no prior spending exists, initialize the totalSpent with the current value.
  toAccount.totalSpent = (toAccount.totalSpent || BIGINT_ZERO).plus(
    event.transaction.value
  );

  // **Mint event detection**
  // Check if this is a minting event (i.e., if the 'from' address is the zero address).
  // If so, increment the mintCount for the receiver, or initialize it if this is their first minted NFT.
  // **Mint event detection**
  // Check if this is a minting event by examining if the 'from' address is the zero address.
  if (event.params.from.equals(ZERO_ADDRESS)) {
    toAccount.covenMintCount = (toAccount.covenMintCount || BIGINT_ZERO).plus(
      BIGINT_ONE
    );
  }

  // Save updated account entities to the store
  fromAccount.save(); // Save changes to the sender's account
  toAccount.save(); // Save changes to the receiver's account

  // **Create Transfer entity**
  // Generate a unique identifier for the transfer event using the transaction hash and log index
  let transfer = new CovenTransfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toHex() // Unique ID for the transfer event
  );

  // Set 'from' and 'to' accounts in the Transfer entity
  transfer.fromC = fromAccount.id;
  transfer.toC = toAccount.id;
  transfer.tokenId = event.params.tokenId;
  transfer.logIndex = event.logIndex;
  transfer.txHash = event.transaction.hash;

  // **Determine NFT Type**
  let nft: NFT = NFT.Unknown; // Initialize the NFT type as Unknown

  // Check the transaction details to identify the NFT type based on the contract address
  // First, check if the 'to' address of the transaction matches known NFT contract addresses
  if (event.transaction.to) {
    if (event.transaction.to.equals(CRYPTO_COVEN)) {
      nft = NFT.CRYPTO_COVEN; // Set NFT type to Crypto Coven if matched
    } else if (event.transaction.to.equals(CRYPTO_KITTIES)) {
      nft = NFT.CRYPTO_KITTIES; // Set NFT type to Crypto Kitties if matched
    }
  }

  // Next, check the 'from' address of the transaction for the same known NFT contract addresses
  if (event.transaction.from) {
    if (event.transaction.from.equals(CRYPTO_COVEN)) {
      nft = NFT.CRYPTO_COVEN; // Set NFT type to Crypto Coven if matched
    } else if (event.transaction.from.equals(CRYPTO_KITTIES)) {
      nft = NFT.CRYPTO_KITTIES; // Set NFT type to Crypto Kitties if matched
    }
  }

  // Log a message if the NFT type is still unknown after checking both 'from' and 'to' addresses
  if (nft === NFT.Unknown) {
    log.info("NFT type could not be determined for transaction: {}", [
      event.transaction.hash.toHexString(), // Log the transaction hash for reference
    ]);
  }

  // **Determine Marketplace**
  let marketplace: Marketplace = Marketplace.Unknown; // Initialize marketplace as Unknown

  // Get the sender and receiver addresses from the transaction event
  let sender: Address | null = event.transaction.from; // Get the address of the sender
  let receiver: Address | null = event.transaction.to; // Get the address of the receiver

  // Check both the sender and receiver's addresses for known marketplace contracts
  if (sender && receiver) {
    // Evaluate known marketplace contracts against both sender and receiver
    if (sender.equals(CRYPTO_COVEN) || receiver.equals(CRYPTO_COVEN)) {
      marketplace = Marketplace.CRYPTO_COVEN; // Set marketplace as Crypto Coven if either sender or receiver matches
    } else if (sender.equals(OPENSEAV1) || receiver.equals(OPENSEAV1)) {
      marketplace = Marketplace.OPENSEAV1; // Set marketplace as OpenSea V1
    } else if (sender.equals(OPENSEAV2) || receiver.equals(OPENSEAV2)) {
      marketplace = Marketplace.OPENSEAV2; // Set marketplace as OpenSea V2
    } else if (sender.equals(RARIBLE) || receiver.equals(RARIBLE)) {
      marketplace = Marketplace.RARIBLE; // Set marketplace as Rarible
    } else if (sender.equals(SEAPORT) || receiver.equals(SEAPORT)) {
      marketplace = Marketplace.SEAPORT; // Set marketplace as Seaport
    } else if (sender.equals(LOOKS_RARE) || receiver.equals(LOOKS_RARE)) {
      marketplace = Marketplace.LOOKS_RARE; // Set marketplace as LooksRare
    } else if (sender.equals(OXProtocol) || receiver.equals(OXProtocol)) {
      marketplace = Marketplace.OxProtocol; // Set marketplace as OxProtocol
    } else if (sender.equals(BLUR) || receiver.equals(BLUR)) {
      marketplace = Marketplace.BLUR; // Set marketplace as Blur
    } else if (sender.equals(X2Y2) || receiver.equals(X2Y2)) {
      marketplace = Marketplace.X2Y2; // Set marketplace as X2Y2
    }
  }

  // Check if the marketplace is still unknown after checking both sender and receiver
  if (marketplace === Marketplace.Unknown) {
    // Log information for troubleshooting if neither sender nor receiver is recognized
    log.info("Transfer from unknown marketplace: {}", [
      event.transaction.hash.toHexString(), // Log the transaction hash for reference
    ]);
  }

  // Save the determined marketplace to the transfer entity
  transfer.marketplace = getMarketplaceName(marketplace); // Get the marketplace name
  transfer.save(); // Save transfer entity
}
