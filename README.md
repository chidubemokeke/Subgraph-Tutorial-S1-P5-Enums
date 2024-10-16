# Using Enums for Your Subgraphs

This repository demonstrates the effectiveness of enums by exploring the CryptoCoven NFT smart contract. It showcases how you can extract detailed information from transactions and marketplace interactions, helping to manage data more effectively within your subgraph.

## Objectives

- Understand the role of enums in categorizing NFT marketplaces.
- Learn how to implement enums in your subgraph schema.
- Explore examples of querying data using enums for enhanced clarity and maintainability.

## Why Use Enums?

Enums play a critical role in categorizing and managing data in your subgraphs. They define a set of named values that represent specific states or categories, enhancing the structure and clarity of your subgraph.

## Benefits of Enums

- Clarity: Enums provide meaningful names for values, making the data easier to understand.
- Validation: Enums enforce strict value definitions, preventing invalid data entries.
- Maintainability: When you need to change or add new categories, enums allow you to do this in a centralized manner.

## Defining Enums

In this repository, we define enums for the various marketplaces where NFTs are traded. Here’s how you can define enums in your subgraph schema:

```gql
# Enum for Marketplaces that the CryptoCoven contract interacted with(likely a Trade/Mint)
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

## Example Function

Here's how you can implement a function to retrieve the marketplace name from the enum as a string:

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

## Best Practices for Using Enums

- Consistent Naming: Use clear and descriptive names for enum values to enhance readability.
- Centralized Management: Maintain enums in a single file for easier updates and management.
- Documentation: Comment on enum definitions to provide context.

## Testing & Sample Queries

## Query 1: Account With The Highest NFT Marketplace Interactions

This query is designed to find the account that has interacted with the most unique marketplaces and get detailed information about their marketplace interactions, total spent amount, and NFT transactions. It can be useful for analyzing an account's activity and involvement in the NFT marketplace ecosystem.

```gql
{
  accounts(first: 1, orderBy: uniqueMarketplacesCount, orderDirection: desc) {
    id
    sendCount
    receiveCount
    totalSpent
    uniqueMarketplacesCount
    marketplaces {
      marketplace
    }
    sent {
      id
      tokenId
      value
      txHash
    }
    received {
      id
      tokenId
      value
      txHash
    }
  }
}
```

## Returns

```gql
{
  "data": {
    "accounts": [
      {
        "id": "0xb3abc96cb9a61576c03c955d75b703a890a14aa0",
        "sendCount": "44",
        "receiveCount": "42",
        "totalSpent": "917500000000000000",
        "uniqueMarketplacesCount": "7",
        "marketplaces": [
          {
            "marketplace": "OpenSeaV1"
          },
          {
            "marketplace": "OpenSeaV2"
          },
          {
            "marketplace": "GenieSwap"
          },
          {
            "marketplace": "CryptoCoven"
          },
          {
            "marketplace": "Unknown"
          },
          {
            "marketplace": "LooksRare"
          },
          {
            "marketplace": "NFTX"
          }
        ],
        "sent": [
          {
            "id": "0x0008e69a698db8da6c4118ab44c140f0e19d553359a3ee2e5c294f55d94fc235-0xc4",
            "tokenId": "7702",
            "value": "1800000000000000000",
            "txHash": "0x0008e69a698db8da6c4118ab44c140f0e19d553359a3ee2e5c294f55d94fc235"
          },
          {
            "id": "0x09538fabac9e78530f30e8edd151b15acb1da53abdd63555e13813831cd431c5-0xdb",
            "tokenId": "5073",
            "value": "8950000000000000000",
            "txHash": "0x09538fabac9e78530f30e8edd151b15acb1da53abdd63555e13813831cd431c5"
          },
          {
            "id": "0x16b9f7234e254ce19804fb0bc3c8a66a0531a9c4a2655db808eec9960c057e81-0x207",
            "tokenId": "9670",
            "value": "1500000000000000000",
            "txHash": "0x16b9f7234e254ce19804fb0bc3c8a66a0531a9c4a2655db808eec9960c057e81"
          },
          {
            "id": "0x1a091ab78f78c96513f53d2fab670da37f9d8815f9a5807a2117ac1221210a6b-0x142",
            "tokenId": "8935",
            "value": "3273900000000000000",
            "txHash": "0x1a091ab78f78c96513f53d2fab670da37f9d8815f9a5807a2117ac1221210a6b"
          },
          {
            "id": "0x22e5331383c441c6083230f22795ae467024bff001055ede835d11ebbb8a0d30-0x134",
            "tokenId": "8555",
            "value": "2000000000000000000",
            "txHash": "0x22e5331383c441c6083230f22795ae467024bff001055ede835d11ebbb8a0d30"
          },
          {
            "id": "0x2d0bcb70a84672c6ae96940721e8b421c223d5e48999d1d5ae2e2dbb9e24f812-0xab",
            "tokenId": "3848",
            "value": "550000000000000000",
            "txHash": "0x2d0bcb70a84672c6ae96940721e8b421c223d5e48999d1d5ae2e2dbb9e24f812"
          },
          {
            "id": "0x2e54204a1487772e61b035b7d6d941bda512c22d845572202b6e7d7ccb9fab33-0xe3",
            "tokenId": "8936",
            "value": "600000000000000000",
            "txHash": "0x2e54204a1487772e61b035b7d6d941bda512c22d845572202b6e7d7ccb9fab33"
          },
          {
            "id": "0x2ecb81a2a8d7bea5f5ccf8832bf9ed05ebe96e5c195cc4fe445003072548b08a-0x9c",
            "tokenId": "3847",
            "value": "1700000000000000000",
            "txHash": "0x2ecb81a2a8d7bea5f5ccf8832bf9ed05ebe96e5c195cc4fe445003072548b08a"
          },
          {
            "id": "0x305d7bad4bf01f5a3f1ad4a0adbc4354bdd35fffdb8ae22a036b69cd39f4828e-0x1d2",
            "tokenId": "320",
            "value": "1190000000000000000",
            "txHash": "0x305d7bad4bf01f5a3f1ad4a0adbc4354bdd35fffdb8ae22a036b69cd39f4828e"
          },
          {
            "id": "0x36c4e4d14fdba9f50d76423c1ce2abff9a38789c3de358e6923339e96a9d3f9c-0x190",
            "tokenId": "5071",
            "value": "1080000000000000000",
            "txHash": "0x36c4e4d14fdba9f50d76423c1ce2abff9a38789c3de358e6923339e96a9d3f9c"
          },
          {
            "id": "0x4504e845e0d1fc56fee26069a475b9fbeadeb05b0cbbc8553d00c3a7e87a6b96-0x171",
            "tokenId": "3913",
            "value": "1150000000000000000",
            "txHash": "0x4504e845e0d1fc56fee26069a475b9fbeadeb05b0cbbc8553d00c3a7e87a6b96"
          },
          {
            "id": "0x4ee202af446e3f71e655951166a6ef2df683292d3f8d926dcf2da11167ca3b85-0x174",
            "tokenId": "3846",
            "value": "300000000000000000",
            "txHash": "0x4ee202af446e3f71e655951166a6ef2df683292d3f8d926dcf2da11167ca3b85"
          },
          {
            "id": "0x538834a3684264f6634962ce8a7cf2b83d884e765ea351ab5202f5ad2360d711-0xe5",
            "tokenId": "9601",
            "value": "11930000000000000000",
            "txHash": "0x538834a3684264f6634962ce8a7cf2b83d884e765ea351ab5202f5ad2360d711"
          },
          {
            "id": "0x5707d7b81ad795968b2a0c25f780effb0deea9b37a5566c8264fdb1c23881fc0-0x102",
            "tokenId": "3845",
            "value": "1700000000000000000",
            "txHash": "0x5707d7b81ad795968b2a0c25f780effb0deea9b37a5566c8264fdb1c23881fc0"
          },
          {
            "id": "0x5d47a976f7f8966027a85630b58fb2c55a5c635e7b43320fc15ebcee91c90e6f-0xb6",
            "tokenId": "3861",
            "value": "500000000000000000",
            "txHash": "0x5d47a976f7f8966027a85630b58fb2c55a5c635e7b43320fc15ebcee91c90e6f"
          },
          {
            "id": "0x619c0d013a2b06b596ff8faaed85a9a572cafe91ff56c2c9e2c2bbbafe8ef94f-0x32",
            "tokenId": "4996",
            "value": "0",
            "txHash": "0x619c0d013a2b06b596ff8faaed85a9a572cafe91ff56c2c9e2c2bbbafe8ef94f"
          },
          {
            "id": "0x61b2aaedf8c9079b70f74ed52121f182774502b2b52df8b8ac724a5389169067-0x25",
            "tokenId": "3857",
            "value": "0",
            "txHash": "0x61b2aaedf8c9079b70f74ed52121f182774502b2b52df8b8ac724a5389169067"
          },
          {
            "id": "0x696a6c27f2794c2f9c4c8a14bfb49a34b72ae63a51ae475108e729111bc783b8-0xe",
            "tokenId": "3923",
            "value": "1700000000000000000",
            "txHash": "0x696a6c27f2794c2f9c4c8a14bfb49a34b72ae63a51ae475108e729111bc783b8"
          },
          {
            "id": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d-0xc3",
            "tokenId": "8556",
            "value": "0",
            "txHash": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d"
          },
          {
            "id": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d-0xc5",
            "tokenId": "3855",
            "value": "0",
            "txHash": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d"
          },
          {
            "id": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d-0xc7",
            "tokenId": "3862",
            "value": "0",
            "txHash": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d"
          },
          {
            "id": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d-0xc9",
            "tokenId": "5518",
            "value": "0",
            "txHash": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d"
          },
          {
            "id": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d-0xcb",
            "tokenId": "5519",
            "value": "0",
            "txHash": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d"
          },
          {
            "id": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d-0xcd",
            "tokenId": "3935",
            "value": "0",
            "txHash": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d"
          },
          {
            "id": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d-0xcf",
            "tokenId": "3946",
            "value": "0",
            "txHash": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d"
          },
          {
            "id": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d-0xd1",
            "tokenId": "4997",
            "value": "0",
            "txHash": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d"
          },
          {
            "id": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d-0xd3",
            "tokenId": "1384",
            "value": "0",
            "txHash": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d"
          },
          {
            "id": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d-0xd5",
            "tokenId": "1293",
            "value": "0",
            "txHash": "0x6b47f91b3d63b1a2b199fe7e65421d476425588468846458f2bc9c0d0028f78d"
          },
          {
            "id": "0x815efe41b86009f4240ecdee6ad9b33002059cd4cad740324de3e14afaafe4e9-0x271",
            "tokenId": "192",
            "value": "1150000000000000000",
            "txHash": "0x815efe41b86009f4240ecdee6ad9b33002059cd4cad740324de3e14afaafe4e9"
          },
          {
            "id": "0x83ebe1bf205f0d5c99d73614a1e0d7610575aac929cbf976d97f8533f559f639-0x14a",
            "tokenId": "5072",
            "value": "1080000000000000000",
            "txHash": "0x83ebe1bf205f0d5c99d73614a1e0d7610575aac929cbf976d97f8533f559f639"
          },
          {
            "id": "0x86ff133d7dbf836f6609d3a7eedc92d74142c46df434a0b3bf6f6ce5877bb461-0x2d",
            "tokenId": "20",
            "value": "0",
            "txHash": "0x86ff133d7dbf836f6609d3a7eedc92d74142c46df434a0b3bf6f6ce5877bb461"
          },
          {
            "id": "0x9007e919ac5c1ddf61a448678447eaee32297dc15d6ed21cd8fe2edc1abe4452-0x284",
            "tokenId": "3862",
            "value": "0",
            "txHash": "0x9007e919ac5c1ddf61a448678447eaee32297dc15d6ed21cd8fe2edc1abe4452"
          },
          {
            "id": "0x964202462e07794d8a330a4137e619540fb36d636d8251cd903ee1ac228e9738-0xa0",
            "tokenId": "3863",
            "value": "1150000000000000000",
            "txHash": "0x964202462e07794d8a330a4137e619540fb36d636d8251cd903ee1ac228e9738"
          },
          {
            "id": "0x9e974b8f535b7e59ffc8678f012f9435d1236415336cc3da110fe3bb29eea5fb-0x42",
            "tokenId": "3856",
            "value": "0",
            "txHash": "0x9e974b8f535b7e59ffc8678f012f9435d1236415336cc3da110fe3bb29eea5fb"
          },
          {
            "id": "0xa1f10a350ed776bd3be70c370b59ca5ce57100279f785b57cdba1043a3d6572c-0x23",
            "tokenId": "9448",
            "value": "1200000000000000000",
            "txHash": "0xa1f10a350ed776bd3be70c370b59ca5ce57100279f785b57cdba1043a3d6572c"
          },
          {
            "id": "0xa8bf56ac586249445aca098281144732073d3a6b3c5dbd96890e29ff8ea3cabd-0x68",
            "tokenId": "4994",
            "value": "0",
            "txHash": "0xa8bf56ac586249445aca098281144732073d3a6b3c5dbd96890e29ff8ea3cabd"
          },
          {
            "id": "0xa8bf56ac586249445aca098281144732073d3a6b3c5dbd96890e29ff8ea3cabd-0x6a",
            "tokenId": "4995",
            "value": "0",
            "txHash": "0xa8bf56ac586249445aca098281144732073d3a6b3c5dbd96890e29ff8ea3cabd"
          },
          {
            "id": "0xaec55233431cdc62fa849c6e4702ab8d78883863867db54509199273ed4cb891-0x1d3",
            "tokenId": "3849",
            "value": "500000000000000000",
            "txHash": "0xaec55233431cdc62fa849c6e4702ab8d78883863867db54509199273ed4cb891"
          },
          {
            "id": "0xc44d052b1e97128bbf7a61270fbe2e46a6432554e947313b7bdffe7b98b7262a-0x1f3",
            "tokenId": "3945",
            "value": "1850000000000000000",
            "txHash": "0xc44d052b1e97128bbf7a61270fbe2e46a6432554e947313b7bdffe7b98b7262a"
          },
          {
            "id": "0xca179526011014fa1447bdc00be68113f3723f1cfe7e6455c85efbc24a53ea01-0x19d",
            "tokenId": "3921",
            "value": "1700000000000000000",
            "txHash": "0xca179526011014fa1447bdc00be68113f3723f1cfe7e6455c85efbc24a53ea01"
          },
          {
            "id": "0xdd98bae5e07f2e0125b678739031f30bbbce2d7eab6c5f0429586280e29fb84a-0x4c",
            "tokenId": "3922",
            "value": "1850000000000000000",
            "txHash": "0xdd98bae5e07f2e0125b678739031f30bbbce2d7eab6c5f0429586280e29fb84a"
          },
          {
            "id": "0xe0f300367ed3f5b0e792f76959480e10556ac5be61b679d4260c314061c8304f-0x21a",
            "tokenId": "3914",
            "value": "1550000000000000000",
            "txHash": "0xe0f300367ed3f5b0e792f76959480e10556ac5be61b679d4260c314061c8304f"
          },
          {
            "id": "0xe67678bb4ab279bbc08e39ab4e5464b04a9ac9419dd60dbbc679d74d673cb7cb-0x92",
            "tokenId": "4993",
            "value": "1700000000000000000",
            "txHash": "0xe67678bb4ab279bbc08e39ab4e5464b04a9ac9419dd60dbbc679d74d673cb7cb"
          },
          {
            "id": "0xed69740063f4efd4a7070c96ab642dfd561c599283f5b22f24d6a31097083198-0x66",
            "tokenId": "5520",
            "value": "1080000000000000000",
            "txHash": "0xed69740063f4efd4a7070c96ab642dfd561c599283f5b22f24d6a31097083198"
          }
        ],
        "received": [
          {
            "id": "0x018613dc9de37f2af7c7be354aa05820c841ce043d50631f716729d4dc4525bc-0x3e",
            "tokenId": "8555",
            "value": "98000000000000000",
            "txHash": "0x018613dc9de37f2af7c7be354aa05820c841ce043d50631f716729d4dc4525bc"
          },
          {
            "id": "0x0503f3e383e5c3ead45219d21248d8c2e8591f6ef15ca585453a91c62c9e3671-0x19f",
            "tokenId": "5519",
            "value": "0",
            "txHash": "0x0503f3e383e5c3ead45219d21248d8c2e8591f6ef15ca585453a91c62c9e3671"
          },
          {
            "id": "0x05fe8dfca538cb89c5b43ebde6d6b8a0ac9716e44f089f76e4956758280f77a2-0x28f",
            "tokenId": "320",
            "value": "0",
            "txHash": "0x05fe8dfca538cb89c5b43ebde6d6b8a0ac9716e44f089f76e4956758280f77a2"
          },
          {
            "id": "0x05fe8dfca538cb89c5b43ebde6d6b8a0ac9716e44f089f76e4956758280f77a2-0x291",
            "tokenId": "3862",
            "value": "0",
            "txHash": "0x05fe8dfca538cb89c5b43ebde6d6b8a0ac9716e44f089f76e4956758280f77a2"
          },
          {
            "id": "0x05fe8dfca538cb89c5b43ebde6d6b8a0ac9716e44f089f76e4956758280f77a2-0x293",
            "tokenId": "1293",
            "value": "0",
            "txHash": "0x05fe8dfca538cb89c5b43ebde6d6b8a0ac9716e44f089f76e4956758280f77a2"
          },
          {
            "id": "0x0fb56295c4f491762ab29d8d72c7130db4b8da8f956ee1aaedbac58b3ea744e1-0x113",
            "tokenId": "3847",
            "value": "0",
            "txHash": "0x0fb56295c4f491762ab29d8d72c7130db4b8da8f956ee1aaedbac58b3ea744e1"
          },
          {
            "id": "0x133ccfc6092a00537ec058b4933e606be84cb988924128cc95ca6f019c07483d-0x233",
            "tokenId": "3857",
            "value": "0",
            "txHash": "0x133ccfc6092a00537ec058b4933e606be84cb988924128cc95ca6f019c07483d"
          },
          {
            "id": "0x1423811f6b9c1f9a3d7ad5b347785806871c13b93d8ebe96a7858de1a7d6f47e-0x16d",
            "tokenId": "3862",
            "value": "0",
            "txHash": "0x1423811f6b9c1f9a3d7ad5b347785806871c13b93d8ebe96a7858de1a7d6f47e"
          },
          {
            "id": "0x143b02afb521bddab2842ecf500a2e018d34f1c73e1cff83d4b2a91474a8b754-0x91",
            "tokenId": "4997",
            "value": "0",
            "txHash": "0x143b02afb521bddab2842ecf500a2e018d34f1c73e1cff83d4b2a91474a8b754"
          },
          {
            "id": "0x175eeb22a6cf3df31b8168e5adf54f18a0486819f3e695f2f6a4b627c26d8999-0x231",
            "tokenId": "3856",
            "value": "0",
            "txHash": "0x175eeb22a6cf3df31b8168e5adf54f18a0486819f3e695f2f6a4b627c26d8999"
          },
          {
            "id": "0x1a3b06bfd3a8a4f6974d4a9b297f86d15b3fadae83cfc6b7ab24af37825ce095-0x1c5",
            "tokenId": "5071",
            "value": "0",
            "txHash": "0x1a3b06bfd3a8a4f6974d4a9b297f86d15b3fadae83cfc6b7ab24af37825ce095"
          },
          {
            "id": "0x1d41672bfb9626dfc0f4e52b3007704db6dbbfae2a11ea37d51b41374c5942eb-0x1c9",
            "tokenId": "5073",
            "value": "0",
            "txHash": "0x1d41672bfb9626dfc0f4e52b3007704db6dbbfae2a11ea37d51b41374c5942eb"
          },
          {
            "id": "0x2086fd868cb06e9c4aa11767fe2f2db6f40e1d0d7e0d90fd08ee47d1de948c3b-0xeb",
            "tokenId": "3845",
            "value": "140000000000000000",
            "txHash": "0x2086fd868cb06e9c4aa11767fe2f2db6f40e1d0d7e0d90fd08ee47d1de948c3b"
          },
          {
            "id": "0x2086fd868cb06e9c4aa11767fe2f2db6f40e1d0d7e0d90fd08ee47d1de948c3b-0xec",
            "tokenId": "3846",
            "value": "140000000000000000",
            "txHash": "0x2086fd868cb06e9c4aa11767fe2f2db6f40e1d0d7e0d90fd08ee47d1de948c3b"
          },
          {
            "id": "0x270997e16d724900f2155b593229fa9bd950b233fd288ca30152fccf2fc0c214-0x16b",
            "tokenId": "3861",
            "value": "0",
            "txHash": "0x270997e16d724900f2155b593229fa9bd950b233fd288ca30152fccf2fc0c214"
          },
          {
            "id": "0x31b88d831d562bef508a2845fe1242c0eb69cdf782c02335fa83248a7d12f360-0x211",
            "tokenId": "9601",
            "value": "98000000000000000",
            "txHash": "0x31b88d831d562bef508a2845fe1242c0eb69cdf782c02335fa83248a7d12f360"
          },
          {
            "id": "0x3274e9ad6b28c581b721e117eea93a3d8b53af76aa64eea5bfde555e4c00cc39-0x1a1",
            "tokenId": "5520",
            "value": "0",
            "txHash": "0x3274e9ad6b28c581b721e117eea93a3d8b53af76aa64eea5bfde555e4c00cc39"
          },
          {
            "id": "0x44403d5a59985959917b1746ca47f1af3c365939cdef6fe8ee12cbb4a1dd9528-0xfb",
            "tokenId": "1384",
            "value": "0",
            "txHash": "0x44403d5a59985959917b1746ca47f1af3c365939cdef6fe8ee12cbb4a1dd9528"
          },
          {
            "id": "0x481731d6a7bfe68ea7081de33a41dfd7552e92be64f61433c2bc85eaf7e4a651-0x95",
            "tokenId": "4995",
            "value": "0",
            "txHash": "0x481731d6a7bfe68ea7081de33a41dfd7552e92be64f61433c2bc85eaf7e4a651"
          },
          {
            "id": "0x4d23c18bc1dff4883ccc99756cad01ec7badf9a1356fd13e3d06bff44de2a4e5-0xf9",
            "tokenId": "20",
            "value": "0",
            "txHash": "0x4d23c18bc1dff4883ccc99756cad01ec7badf9a1356fd13e3d06bff44de2a4e5"
          },
          {
            "id": "0x501fd118c1add72aa8a77d3d8837fa9d8c55c310164a0899348095cd65bd5e92-0x97",
            "tokenId": "4993",
            "value": "0",
            "txHash": "0x501fd118c1add72aa8a77d3d8837fa9d8c55c310164a0899348095cd65bd5e92"
          },
          {
            "id": "0x54792a582044cd645351f6e8d1d01bd1600e0fab15d1c8e29358a9fd7e0736f2-0x8f",
            "tokenId": "3923",
            "value": "0",
            "txHash": "0x54792a582044cd645351f6e8d1d01bd1600e0fab15d1c8e29358a9fd7e0736f2"
          },
          {
            "id": "0x5b6838565677b27e57e0a140c089de16aa7b5f144fe4677ebe1ca39b4aaf43a7-0x117",
            "tokenId": "3849",
            "value": "0",
            "txHash": "0x5b6838565677b27e57e0a140c089de16aa7b5f144fe4677ebe1ca39b4aaf43a7"
          },
          {
            "id": "0x6404355c5fd3514dac25cb72e8f041eb39bf325f8c895369b0c8b6f1e42d00cb-0x7",
            "tokenId": "9670",
            "value": "95000000000000000",
            "txHash": "0x6404355c5fd3514dac25cb72e8f041eb39bf325f8c895369b0c8b6f1e42d00cb"
          },
          {
            "id": "0x649b0048dd14dbd1f640ec72a218ad3ef83b33fe171ef8493c1a4a26137bdffc-0x180",
            "tokenId": "3913",
            "value": "0",
            "txHash": "0x649b0048dd14dbd1f640ec72a218ad3ef83b33fe171ef8493c1a4a26137bdffc"
          },
          {
            "id": "0x7050baba2de434a83993444826424b7b420678d27d145f8c8492a4388160313d-0x105",
            "tokenId": "3921",
            "value": "0",
            "txHash": "0x7050baba2de434a83993444826424b7b420678d27d145f8c8492a4388160313d"
          },
          {
            "id": "0x787fa58c36e234ab78aa551faedb61d0e9f8433d068a1d6575ff45bbd97af74e-0x3c",
            "tokenId": "8935",
            "value": "90000000000000000",
            "txHash": "0x787fa58c36e234ab78aa551faedb61d0e9f8433d068a1d6575ff45bbd97af74e"
          },
          {
            "id": "0x79fbe03d745f1cdd790d3eb77e0289e592a98b040a5a52eceec6ab1395085792-0x107",
            "tokenId": "3945",
            "value": "0",
            "txHash": "0x79fbe03d745f1cdd790d3eb77e0289e592a98b040a5a52eceec6ab1395085792"
          },
          {
            "id": "0x7a4af42010256f5c4cbf367aa14a3a0593ff7bdb019b92e3b5886f4af8c85470-0xf6",
            "tokenId": "4996",
            "value": "0",
            "txHash": "0x7a4af42010256f5c4cbf367aa14a3a0593ff7bdb019b92e3b5886f4af8c85470"
          },
          {
            "id": "0x8861af90fb6f0cb33271f129859743633cd4a2fa6677c29115a01d30cf347319-0x101",
            "tokenId": "3935",
            "value": "0",
            "txHash": "0x8861af90fb6f0cb33271f129859743633cd4a2fa6677c29115a01d30cf347319"
          },
          {
            "id": "0x894a79fb5919a91eeb8c5a200b92adbd253d24533907b723d6861c5554328b3e-0x93",
            "tokenId": "4994",
            "value": "0",
            "txHash": "0x894a79fb5919a91eeb8c5a200b92adbd253d24533907b723d6861c5554328b3e"
          },
          {
            "id": "0x960a3c67a631df8ec7a1b874066ad82c9a9d5f0bdb744814a47b1d0fb92e7220-0x16",
            "tokenId": "3914",
            "value": "0",
            "txHash": "0x960a3c67a631df8ec7a1b874066ad82c9a9d5f0bdb744814a47b1d0fb92e7220"
          },
          {
            "id": "0xa6b77e5197ebd131019a135042a969b7a7c3f0e5ca51bd9ba7f2dc9d8f2e6186-0x103",
            "tokenId": "3946",
            "value": "0",
            "txHash": "0xa6b77e5197ebd131019a135042a969b7a7c3f0e5ca51bd9ba7f2dc9d8f2e6186"
          },
          {
            "id": "0xba6fdb403d0595873f79afd9907dd4f0b5f6cd604a233b92ebdff557e0373ff2-0x1a9",
            "tokenId": "8936",
            "value": "90000000000000000",
            "txHash": "0xba6fdb403d0595873f79afd9907dd4f0b5f6cd604a233b92ebdff557e0373ff2"
          },
          {
            "id": "0xc4beb6ff6b226a92c15e3c7fc2d6cbd34077f60b9b87e9dea392ed157489c54d-0x6f",
            "tokenId": "9448",
            "value": "93500000000000000",
            "txHash": "0xc4beb6ff6b226a92c15e3c7fc2d6cbd34077f60b9b87e9dea392ed157489c54d"
          },
          {
            "id": "0xd618817c15aa703a97b98eabea17e4b37a4d7e509665eafd18814bc3d5675c1b-0x1c4",
            "tokenId": "7702",
            "value": "95000000000000000",
            "txHash": "0xd618817c15aa703a97b98eabea17e4b37a4d7e509665eafd18814bc3d5675c1b"
          },
          {
            "id": "0xd6ec89be4517182b6b361faacd27c3fb90342133031a11f8aa37bcc01d7395f5-0x119",
            "tokenId": "3855",
            "value": "0",
            "txHash": "0xd6ec89be4517182b6b361faacd27c3fb90342133031a11f8aa37bcc01d7395f5"
          },
          {
            "id": "0xdc93e0d1ecd27d053b62de3b258d844770bad2704c89d08ad1bc4d2579fa360d-0x109",
            "tokenId": "3922",
            "value": "0",
            "txHash": "0xdc93e0d1ecd27d053b62de3b258d844770bad2704c89d08ad1bc4d2579fa360d"
          },
          {
            "id": "0xe35ef442630113161bf8586739e7d3bf14ad2d46a1fc292aacefca73413b9af4-0x19d",
            "tokenId": "5518",
            "value": "0",
            "txHash": "0xe35ef442630113161bf8586739e7d3bf14ad2d46a1fc292aacefca73413b9af4"
          },
          {
            "id": "0xe9519611c3b6c1ee336fe9eb9ca91c3ddd2ed0c61aefbbd5e01d069cd13e4add-0x1c7",
            "tokenId": "5072",
            "value": "0",
            "txHash": "0xe9519611c3b6c1ee336fe9eb9ca91c3ddd2ed0c61aefbbd5e01d069cd13e4add"
          },
          {
            "id": "0xe9eb6fe0935185153dcc3c2e120df9bac6702325767fa5f73846c4d2e985b6fb-0x16f",
            "tokenId": "3863",
            "value": "0",
            "txHash": "0xe9eb6fe0935185153dcc3c2e120df9bac6702325767fa5f73846c4d2e985b6fb"
          },
          {
            "id": "0xfeea905defe1a84ed36b952dd1062e4fe99afbc11ff68f77e804d14a3b0287ff-0x63",
            "tokenId": "8556",
            "value": "98000000000000000",
            "txHash": "0xfeea905defe1a84ed36b952dd1062e4fe99afbc11ff68f77e804d14a3b0287ff"
          },
          {
            "id": "0xffe41bb24b8882a9883f5d5aae710f606f854772af1dd2171b7729d8c953c358-0x115",
            "tokenId": "3848",
            "value": "0",
            "txHash": "0xffe41bb24b8882a9883f5d5aae710f606f854772af1dd2171b7729d8c953c358"
          },
          {
            "id": "0xfffc9739d94bea2d58702d2e3e99149d9447f2d0ed9c8312f0c767c101419c71-0x5c",
            "tokenId": "192",
            "value": "160000000000000000",
            "txHash": "0xfffc9739d94bea2d58702d2e3e99149d9447f2d0ed9c8312f0c767c101419c71"
          }
        ]
      }
    ]
  }
}
```

## Query 2: Accounts With The Most Unique Marketplaces Interacted With

This query fetches the top 5 accounts with the most unique marketplaces interacted with. The marketplaces field retrieves a list of marketplace interactions for each account.

```gql
{
  accounts(first: 5, orderBy: uniqueMarketplacesCount, orderDirection: desc) {
    id
    uniqueMarketplacesCount
    marketplaces {
      marketplace
    }
  }
}
```

## Result 2

```gql
{
  "data": {
    "accounts": [
      {
        "id": "0xb3abc96cb9a61576c03c955d75b703a890a14aa0",
        "uniqueMarketplacesCount": "7",
        "marketplaces": [
          {
            "marketplace": "OpenSeaV1"
          },
          {
            "marketplace": "OpenSeaV2"
          },
          {
            "marketplace": "GenieSwap"
          },
          {
            "marketplace": "CryptoCoven"
          },
          {
            "marketplace": "Unknown"
          },
          {
            "marketplace": "LooksRare"
          },
          {
            "marketplace": "NFTX"
          }
        ]
      },
      {
        "id": "0x77bb41b3a80982e19daae2cfe94403afcc613489",
        "uniqueMarketplacesCount": "7",
        "marketplaces": [
          {
            "marketplace": "OpenSeaV1"
          },
          {
            "marketplace": "OpenSeaV2"
          },
          {
            "marketplace": "GenieSwap"
          },
          {
            "marketplace": "CryptoCoven"
          },
          {
            "marketplace": "Unknown"
          },
          {
            "marketplace": "LooksRare"
          },
          {
            "marketplace": "OxProtocolV2"
          }
        ]
      },
      {
        "id": "0x66349e79e99ae4d661a5ebb5474759508d392da4",
        "uniqueMarketplacesCount": "7",
        "marketplaces": [
          {
            "marketplace": "OpenSeaV1"
          },
          {
            "marketplace": "OpenSeaV2"
          },
          {
            "marketplace": "GenieSwap"
          },
          {
            "marketplace": "CryptoCoven"
          },
          {
            "marketplace": "Unknown"
          },
          {
            "marketplace": "SeaPort"
          },
          {
            "marketplace": "LooksRare"
          }
        ]
      },
      {
        "id": "0x2d0a51e142bf3f156a978175c05ec74a25bb4e4f",
        "uniqueMarketplacesCount": "7",
        "marketplaces": [
          {
            "marketplace": "OpenSeaV1"
          },
          {
            "marketplace": "OpenSeaV2"
          },
          {
            "marketplace": "GenieSwap"
          },
          {
            "marketplace": "CryptoCoven"
          },
          {
            "marketplace": "Unknown"
          },
          {
            "marketplace": "SeaPort"
          },
          {
            "marketplace": "LooksRare"
          }
        ]
      },
      {
        "id": "0xfb29cc23d5d7b705a0ab93d7a7cad6a01e52be94",
        "uniqueMarketplacesCount": "6",
        "marketplaces": [
          {
            "marketplace": "OpenSeaV1"
          },
          {
            "marketplace": "OpenSeaV2"
          },
          {
            "marketplace": "CryptoCoven"
          },
          {
            "marketplace": "Unknown"
          },
          {
            "marketplace": "LooksRare"
          },
          {
            "marketplace": "NFTX"
          }
        ]
      }
    ]
  }
}
```

To analyze which marketplaces are the most active, you can aggregate the data for each marketplace by iterating through the accounts' marketplace interactions on the client-side (React and Apollo Client)

## GraphQL Query

First, write a query to get the marketplaces each account has interacted with:

```gql
{
  accounts(first: 1000) {
    id
    marketplaces {
      marketplace
    }
  }
}
```

This will return all accounts with their respective marketplace interactions. Depending on the data volume, you may want to paginate or adjust the number of accounts.

## Step 2: Apollo Client Setup in React

Next, you’ll fetch the data in your React component using Apollo Client.

```js
import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

// Step 1: Define the GraphQL query.
// This query fetches the first 100 accounts, along with their marketplace interactions.
// We're getting the 'marketplace' field inside each account's 'marketplaces' array.
const GET_ACCOUNTS_WITH_MARKETPLACE_INTERACTIONS = gql`
  query GetAccountsWithMarketplaceInteractions {
    accounts(first: 100) {
      id
      marketplaces {
        marketplace
      }
    }
  }
`;

const MarketplaceAnalysis = () => {
  // Step 2: Execute the GraphQL query using Apollo's `useQuery` hook.
  // This hook sends the query to the GraphQL API and gives us `loading`, `error`, and `data` states.
  const { loading, error, data } = useQuery(
    GET_ACCOUNTS_WITH_MARKETPLACE_INTERACTIONS
  );

  // Step 3: Create state to store the aggregated marketplace counts.
  // We will update this state as we process the data we receive from the query.
  const [marketplaceCounts, setMarketplaceCounts] = useState({});

  // Step 4: Use the `useEffect` hook to process the query data when it's ready.
  // React's `useEffect` runs the code inside whenever `data` changes (in this case, when the query finishes).
  useEffect(() => {
    if (data && data.accounts) {
      // Create an object to store the interaction counts for each marketplace.
      const counts = {};

      // Step 5: Loop through each account that was returned from the query.
      // The `data.accounts` array contains all the accounts fetched from the GraphQL API.
      data.accounts.forEach((account) => {
        // Each account has an array of marketplaces they have interacted with.
        account.marketplaces.forEach((interaction) => {
          const marketplaceName = interaction.marketplace;

          // Step 6: If the marketplace isn't already in the `counts` object, initialize it to 0.
          if (!counts[marketplaceName]) {
            counts[marketplaceName] = 0;
          }

          // Step 7: Increment the count for this marketplace by 1.
          counts[marketplaceName]++;
        });
      });

      // Step 8: After processing all accounts, update the state with the marketplace interaction counts.
      setMarketplaceCounts(counts);
    }
  }, [data]); // The effect runs whenever `data` changes.

  // Step 9: Handle the loading state.
  // If the query is still running, show a loading message.
  if (loading) return <p>Loading...</p>;

  // Step 10: Handle any errors that occurred during the query.
  // If there's an error, show an error message.
  if (error) return <p>Error: {error.message}</p>;

  // Step 11: Once the query has finished, and the data has been processed, display the results.
  // We use `Object.entries` to loop through the `marketplaceCounts` object and render each marketplace and its count.
  return (
    <div>
      <h2>Marketplace Interactions Analysis</h2>
      <ul>
        {Object.entries(marketplaceCounts).map(([marketplace, count]) => (
          <li key={marketplace}>
            {marketplace}: {count} interactions
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketplaceAnalysis;
```

## Frequently Asked Questions

- What are enums? Enums are a special data type that allow you to define a set of named values. They are particularly useful for categorizing data.

- Why should I use enums in my subgraph? Enums enhance clarity, validation, and maintainability of your data, making it easier to manage transactions.

## Conclusion

By implementing enums in your subgraph, you can improve data organization, clarity, and maintainability. This repository provides a foundational understanding of how to effectively use enums with the CryptoCoven contract.

For further reading, check out [The Graph's official documentation.](https://thegraph.com/docs/en/developing/creating-a-subgraph/#enums)
