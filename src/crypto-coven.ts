import { Transfer as TransferEvent } from "../generated/CryptoCoven/CryptoCoven"; // Import the Transfer event from the Uniswap contract ABI
import { Transfer } from "../generated/schema"; // Import the Transfer entity from the generated schema
import { getOrCreateAccount } from "./helper";

export function handleTransfer(event: TransferEvent): void {
  // Get or create accounts for the sender and receiver
  let fromAccount = getOrCreateAccount(event.params.from);
  let toAccount = getOrCreateAccount(event.params.to);

  // Update the sender's sent count and the receiver's received count
  fromAccount.sentCount += 1;
  toAccount.receivedCount += 1;

  // Update the receiver's received count and total received amount
  toAccount.totalSpent = toAccount.totalSpent.plus(event.transaction.value);

  // Check if the transfer indicates a minting event
  const mint = "0x0000000000000000000000000000000000000000";

  if (event.params.from.toHex() == mint) {
    // This indicates a minting event
    toAccount.mintCount += 1; // Increment the mintCount for the receiving account
  }

  // Save the updated accounts to the store
  fromAccount.save();
  toAccount.save();

  // Create a new Transfer entity with a unique ID for each event
  let transfer = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  // Set the properties of the Transfer entity
  transfer.from = fromAccount.id;
  transfer.to = toAccount.id;
  transfer.tokenId = event.params.tokenId; // Ensure this is a single BigInt, not an array
  transfer.value = event.transaction.value;
  transfer.marketPlace = event.transaction.from;
  transfer.txHash = event.transaction.hash;

  transfer.save(); // Save the Transfer entity to the store
}
