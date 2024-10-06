import { BigInt, Bytes } from "@graphprotocol/graph-ts";

// Define a constant representing the value zero as a BigInt object.
export const BIGINT_ZERO = BigInt.fromI32(0);

// Define a constant representing the value one as a BigInt object.
export const BIGINT_ONE = BigInt.fromI32(1);

const seaDrop = "0x00005EA00Ac477B1030CE78506496e8C2dE24bf5";

// Define a constant representing the zero address (all zeros).
export const ZERO_ADDRESS = Bytes.fromHexString(
  "0x0000000000000000000000000000000000000000"
);

// Define a constant representing the address of the CryptoCoven contract.
export const CRYPTOCOVEN_ADDRESS = "0x5180db8F5c931aaE63c74266b211F580155ecac8";
