import { BigInt, Bytes, ByteArray, crypto } from "@graphprotocol/graph-ts";

// Define a constant representing the value zero as a BigInt object.
export const BIGINT_ZERO = BigInt.fromI32(0);

// Define a constant representing the value one as a BigInt object.
export const BIGINT_ONE = BigInt.fromI32(1);

// Define a constant representing the zero address (all zeros).
export const ZERO_ADDRESS = Bytes.fromHexString(
  "0x0000000000000000000000000000000000000000"
);

// Constant representing the address of the CryptoCoven NFT contract.
export const CRYPTOCOVEN_ADDRESS = "0x5180db8F5c931aaE63c74266b211F580155ecac8";

// List of Marketplaces the CrypToCoven NFT is listed/Traded

// Constant representing the address of the OpenSea contract.
export const OPENSEA_ADDRESS = "0x7f268357A8c2552623316e2562D90e642bB538E5";

// SeaDrop is a contract for conducting primary NFT drops on EVM-compatible blockchains. (Factor logic for airdrops)
//export const SEADROP_ADDRESS = "0x00005EA00Ac477B1030CE78506496e8C2dE24bf5";
