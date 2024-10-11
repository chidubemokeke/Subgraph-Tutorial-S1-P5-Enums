import { BigInt, Address } from "@graphprotocol/graph-ts";

// Define a constant representing the value zero as a BigInt object.
export const BIGINT_ZERO = BigInt.fromI32(0);

// Define a constant representing the value one as a BigInt object.
export const BIGINT_ONE = BigInt.fromI32(1);

// Define a constant representing the zero address (all zeros).
export const ZERO_ADDRESS: Address = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

// Constant representing the address of the CryptoCoven NFT contract.
export const CRYPTOCOVEN_ADDRESS = "0x5180db8F5c931aaE63c74266b211F580155ecac8";
// Convert the string address to the Address type.
export const CRYPTO_COVEN: Address = Address.fromString(CRYPTOCOVEN_ADDRESS);

// List of some Marketplaces the CrypToCoven NFT is listed/Traded

// Constant representing the address of the OpenSeaV1 contract.
export const OPENSEAV1_ADDRESS = "0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b";
// Convert the string address to the Address type.
export const OPENSEAV1: Address = Address.fromString(OPENSEAV1_ADDRESS);

// Constant representing the address of the OpenSeaV2 contract.
export const OPENSEAV2_ADDRESS = "0x7f268357A8c2552623316e2562D90e642bB538E5";
// Convert the string address to the Address type.
export const OPENSEAV2: Address = Address.fromString(OPENSEAV2_ADDRESS);

// Constant representing the address of the Seaport contract.
export const SEAPORT_ADDRESS = "0x0000000000000068F116a894984e2DB1123eB395";
// Convert the string address to the Address type.
export const SEAPORT: Address = Address.fromString(SEAPORT_ADDRESS);

// Constant representing the address of the LooksRare contract.
export const LOOKS_RARE_ADDRESS = "0x59728544B08AB483533076417FbBB2fD0B17CE3a";
// Convert the string address to the Address type.
export const LOOKS_RARE: Address = Address.fromString(LOOKS_RARE_ADDRESS);

// Constant representing the address of the OXProtocol contract.
export const OXPROTOCOL_ADDRESS = "0x44A6999Ec971cfCA458AFf25A808F272f6d492A2";
// Convert the string address to the Address type.
export const OXPROTOCOL: Address = Address.fromString(OXPROTOCOL_ADDRESS);

// Constant representing the address of the OXProtocolV2 contract.
export const OXPROTOCOLV2_ADDRESS =
  "0x080bf510FCbF18b91105470639e9561022937712";
// Convert the string address to the Address type.
export const OXPROTOCOLV2: Address = Address.fromString(OXPROTOCOLV2_ADDRESS);

// Constant representing the address of the Blur contract.
export const BLUR_ADDRESS = "0x0bC2f8668E86187Bd9e8fe832f72683871Cb5f21";
// Convert the string address to the Address type.
export const BLUR: Address = Address.fromString(BLUR_ADDRESS);

// Constant representing the address of the Rarible contract.
export const RARIBLE_ADDRESS = "0x9757F2d2b135150BBeb65308D4a91804107cd8D6";
// Convert the string address to the Address type.
export const RARIBLE: Address = Address.fromString(RARIBLE_ADDRESS);

// Constant representing the address of the X2Y2 contract.
export const X2Y2_ADDRESS = "0x6D7812d41A08BC2a910B562d8B56411964A4eD88";
// Convert the string address to the Address type.
export const X2Y2: Address = Address.fromString(X2Y2_ADDRESS);

// Constant representing the address of the NFTX contract.
export const NFTX_ADDRESS = "0x0fc584529a2AEfA997697FAfAcbA5831faC0c22d";
// Convert the string address to the Address type.
export const NFTX: Address = Address.fromString(NFTX_ADDRESS);

// Constant representing the address of the GenieSwap contract.
export const GENIE_SWAP_ADDRESS = "0x0a267cF51EF038fC00E71801F5a524aec06e4f07";
// Convert the string address to the Address type.
export const GENIE_SWAP: Address = Address.fromString(GENIE_SWAP_ADDRESS);
