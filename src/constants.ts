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

// Constant representing the address of the Seaport contract.
export const SEAPORT_ADDRESS = "0x0000000000000068F116a894984e2DB1123eB395";

// Constant representing the address of the LooksRare contract.
export const LOOKS_RARE_ADDRESS = "0x59728544B08AB483533076417FbBB2fD0B17CE3a";

// Constant representing the address of the OXProtocol contract.
export const OXPROTOCOL_ADDRESS = "0xDef1C0ded9bec7F1a1670819833240f027b25EfF";

// Constant representing the address of the Blur contract.
export const BLUR_ADDRESS = "0x39da41747a83aeE658334415666f3EF92DD0D541";

// Constant representing the address of the Rarible contract.
export const RARIBLE_ADDRESS = "0x9757F2d2b135150BBeb65308D4a91804107cd8D6";

// Constant representing the address of the X2Y2 contract.
export const X2Y2_ADDRESS = "0x74312363e45dcaba76c59ec49a7aa8a65a67eed3";

// SeaDrop is a contract for conducting primary NFT drops on EVM-compatible blockchains. (Factor logic for airdrops)
//export const SEADROP_ADDRESS = "0x00005EA00Ac477B1030CE78506496e8C2dE24bf5";
