# Using Transaction Receipts and Enums for Your Subgraphs

This repository demonstrates the effectiveness of Transaction Receipts and enums by exploring two different NFT smart contracts, CryptoCoven and CryptoKitties. It will showcase how you can extract detailed information from transactions and marketplace interactions.

## Using Enums

Enums play a critical role in categorizing and managing data in your subgraphs. By using enums, you can define a set of named values that can represent specific states or categories in your data model, enhancing the structure and clarity of your subgraph.

## Why Use Enums?

- Clarity: Enums provide meaningful names for values, making the data easier to understand.
- Validation: Enums enforce strict value definitions, preventing invalid data entries.
- Maintainability: When you need to change or add new categories, enums allow you to do this in a centralized manner.

## Defining Enums

In this repository, we define enums for the various marketplaces where NFTs are traded, such as OpenSea and Rarible. Here’s how you can define enums in your subgraph schema:

```gql
# Enum for Marketplaces that the CryptoCoven contract interacted with(likely a Trade)
enum Marketplace {
  OpenSeaV1 # Represents when a CryptoCoven NFT is traded on the marketplace
  OpenSeaV2 # Represents when a CryptoCoven NFT is traded on the OpenSeaV2 marketplace
  SeaPort # Represents when a CryptoCoven NFT is traded on the SeaPort marketplace
  LooksRare # Represents when a CryptoCoven NFT is traded on the LookRare marketplace
  OxProtocol # Represents when a CryptoCoven NFT is traded on the OxProtocol marketplace
  OxProtocolV2 # Represents when a CryptoCoven NFT is traded on the OxProtocol marketplace
  Blur # Represents when a CryptoCoven NFT is traded on the Blur marketplace
  Rarible # Represents when a CryptoCoven NFT is traded on the Rarible marketplace
  X2Y2 # Represents when a CryptoCoven NFT is traded on the X2Y2 marketplace
  NFTX # Represents when a CryptoCoven NFT is traded on the NFTX marketplace
  GenieSwap # Represents when a CryptoCoven NFT is traded on the NFTX marketplace
  CryptoCoven # Represents when a CryptoCoven NFT is transferred from the crypto coven contract.
  Unknown # Represents when a CryptoCoven NFT is transferred from an unknown marketplace likely not a sale event
}
```

## Utilizing Enums

Once defined, enums can be used throughout your subgraph to categorize transactions or events. For example, when logging NFT sales, you can specify the marketplace involved in the trade using the enum.

```ts
export function getMarketplaceName(marketplace: Marketplace): string {
  // Using if-else statements to map the enum value to a string
  if (marketplace === Marketplace.OpenSeaV1) {
    return "OpenSeaV1"; // If the marketplace is OpenSea, return its string representation
  } else if (marketplace === Marketplace.OpenSeaV2) {
    return "OpenSeaV2";
  } else if (marketplace === Marketplace.SeaPort) {
    return "SeaPort"; // If the marketplace is SeaPort, return its string representation
  } else if (marketplace === Marketplace.LooksRare) {
    return "LooksRare"; // If the marketplace is LooksRare, return its string representation
  } else if (marketplace === Marketplace.OxProtocol) {
    return "OxProtocol"; // If the marketplace is OxProtocol, return its string representation
  } else if (marketplace === Marketplace.OxProtocolV2) {
    return "OxProtocolV2"; // If the marketplace is OxProtocolV2, return its string representation
  } else if (marketplace === Marketplace.Blur) {
    return "Blur"; // If the marketplace is Blur, return its string representation
  } else if (marketplace === Marketplace.Rarible) {
    return "Rarible"; // If the marketplace is Rarible, return its string representation
  } else if (marketplace === Marketplace.X2Y2) {
    return "X2Y2"; // If the marketplace is X2Y2, return its string representation
  } else if (marketplace === Marketplace.NFTX) {
    return "NFTX"; // If the marketplace is NFTX, return its string representation
  } else if (marketplace === Marketplace.GenieSwap) {
    return "GenieSwap"; // If the marketplace is GenieSwap, return its string representation
  } else if (marketplace === Marketplace.CryptoCoven) {
    return "CryptoCoven"; // If the marketplace is CryptoCoven, return its string representation
  } else {
    return "Unknown"; // If the marketplace doesn't match any known values, return "Unknown"
  }
}
```
