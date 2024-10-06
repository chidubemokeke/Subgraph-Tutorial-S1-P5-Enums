import { BigInt, log } from "@graphprotocol/graph-ts";
import { Transfer as TransferEvent } from "../generated/CryptoCoven/CryptoCoven"; // Import the Transfer event from the Uniswap contract ABI
import { Transfer } from "../generated/schema"; // Import the Transfer entity from the generated schema

// Function to handle transfer events
export function handleTransfer(event: TransferEvent): void {
  // Create a new Transfer entity with the unique ID
  let transfer = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  // If the tokenId is a single value, wrap it in an array
  let tokenIds: BigInt[] = [event.params.tokenId];
  // Set the properties of the Transfer entity
  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.tokenId = tokenIds;
  transfer.value = event.transaction.value;
  transfer.marketplace = event.transaction.from;
  transfer.txHash = event.transaction.hash;
  transfer.save(); // Save the Transfer entity to the store
}
