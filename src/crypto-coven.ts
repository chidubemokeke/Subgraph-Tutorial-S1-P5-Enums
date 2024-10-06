// Import the Transfer event from the CryptoCoven contract ABI
import { Transfer as TransferEvent } from "../generated/CryptoCoven/CryptoCoven";

// Import the Transfer entity from the generated schema, allowing us to create and update Transfer records in the store
import { Transfer } from "../generated/schema";
import {
  OPENSEA_ADDRESS,
  RARIBLE_ADDRESS,
  ZERO_ADDRESS,
  SEAPORT_ADDRESS,
  LOOKS_RARE_ADDRESS,
  OXPROTOCOL_ADDRESS,
  BIGINT_ONE,
  BLUR_ADDRESS,
  X2Y2_ADDRESS,
} from "./constants";

// Import a helper function that ensures accounts are created or retrieved
import { getOrCreateAccount } from "./helper";

// The handleTransfer function is triggered whenever a Transfer event occurs on the blockchain
export function handleTransfer(event: TransferEvent): void {
  // Get or create accounts for the sender ('from') and receiver ('to') of the NFT transfer
  let fromAccount = getOrCreateAccount(event.params.from); // Retrieves or creates the sender's account
  let toAccount = getOrCreateAccount(event.params.to); // Retrieves or creates the receiver's account

  // Increment the sent count for the sender's account
  fromAccount.sentCount += 1; // Tracks how many NFTs the sender has sent

  // Increment the received count for the receiver's account
  toAccount.receivedCount += 1; // Tracks how many NFTs the receiver has received

  // Update the total amount spent by the receiver, adding the value of the transferred NFT
  toAccount.totalSpent = toAccount.totalSpent.plus(event.transaction.value); // Keeps track of total expenditure for the receiver

  // Check if the 'from' address of the transfer matches the zero address, indicating a minting event
  if (event.params.from == ZERO_ADDRESS) {
    // This indicates a minting event where the NFT is being created and sent directly to the receiver
    toAccount.mintCount += 1; // Increment the mintCount for the receiving account, tracking how many NFTs they have minted
  }

  // Save the updated sender and receiver accounts to the store to persist changes
  fromAccount.save(); // Save the updated state of the sender's account
  toAccount.save(); // Save the updated state of the receiver's account

  // Create a unique ID for the Transfer entity using the transaction hash and log index to avoid collisions
  let transfer = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString() // Unique ID format: transaction hash + log index
  );

  // Set the properties of the Transfer entity with relevant data from the transfer event
  transfer.from = fromAccount.id; // Store the ID of the sender account
  transfer.to = toAccount.id; // Store the ID of the receiver account
  transfer.tokenId = event.params.tokenId; // Set the unique token ID for the NFT being transferred
  transfer.value = event.transaction.value; // Store the value associated with the transaction
  // transfer.marketPlace = marketplace; // Record the marketplace contract (who initiated the transfer)
  transfer.txHash = event.transaction.hash; // Save the transaction hash for referencing this transfer

  // Check the transaction's sender address to determine the marketplace
  let marketplace = "";
  let sender = event.transaction.from; // Get the transaction sender

  if (sender == OPENSEA_ADDRESS) {
    marketplace = "OpenSea";
  } else if (sender == RARIBLE_ADDRESS) {
    marketplace = "Rarible";
  } else if (sender == SEAPORT_ADDRESS) {
    marketplace = "Seaport";
  }
  {
    // Save the Transfer entity to the store, persisting the transfer record
    transfer.save(); // The Transfer entity is now stored in the database for querying later
  }
}
