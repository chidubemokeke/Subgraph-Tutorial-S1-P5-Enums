// Import required types from the Graph Protocol library
import { Bytes } from "@graphprotocol/graph-ts";
import { BIGINT_ZERO, CRYPTO_COVEN } from "../CryptoKitties/kitties-consts";

export enum NFT {
  CRYPTO_COVEN,
  CRYPTO_KITTIES,
}

/**
 * Converts an NFT enum value to its corresponding string representation.
 *
 * @param NFT - The NFT enum value to convert.
 * @returns A string representing the name of the NFT.
 */
export function getNFTName(nft: NFT): string {
  // Using if-else statements to map the enum value to a string
  if (nft === NFT.CRYPTO_COVEN) {
    return "CryptoCoven"; // If the NFT is CryptoCoven, return its string representation
  } else if (nft === NFT.CRYPTO_KITTIES) {
    return "CryptoKitties"; // If the NFT is CryptoKitties, return its string representation
  } else {
    return "Unknown"; // If the NFT contract Address doesn't match any known values, return "Unknown"
  }
}

/**export function getOrCreateSale(id: string): Sale {
  let trade = Sale.load(id);

  if (!trade) {
    trade = new Sale(id);
    trade.referenceId = BIGINT_ZERO;
    trade.value = BIGINT_ZERO;
    trade.marketplace = "";
    trade.buyer = Bytes.empty();
    trade.seller = Bytes.empty();
    trade.totalSalesCount = BIGINT_ZERO;
    trade.totalSalesVolume = BIGINT_ZERO;
    trade.averageSalePrice = BigDecimal.zero();
    trade.highestSalePrice = BIGINT_ZERO;
    trade.lowestSalePrice = BIGINT_ZERO;

    trade.save();
  }
  return trade as Sale;
}**/
