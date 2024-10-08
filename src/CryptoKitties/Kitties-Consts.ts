import { BigInt, Address } from "@graphprotocol/graph-ts";

// Define a constant representing the value zero as a BigInt object.
export const BIGINT_ZERO = BigInt.fromI32(0);

// Define a constant representing the value one as a BigInt object.
export const BIGINT_ONE = BigInt.fromI32(1);

// Define a constant representing the zero address (all zeros).
export const ZERO_ADDRESS: Address = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

// Constant representing the address of the CryptoKitties NFT contract.
export const CRYPTOKITTIES_ADDRESS =
  "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";

export const CRYPTO_KITTIES: Address = Address.fromString(
  CRYPTOKITTIES_ADDRESS
);
