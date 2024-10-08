# Using Transaction Receipts for your subgraphs

This repository demonstrates the effectiveness of Transaction Receipts by exploring two different NFT smart contracts, namely CryptoCoven and CryptoKitties, to showcase how you can extract detailed information from transactions and marketplace interactions.

## Understanding event.transaction and Transaction Receipts

- event.transaction: Refers to the details of the transaction that triggered an event. This includes key metadata such as the sender, receiver, gas price, and value. It is useful for analyzing who initiated a transaction and the associated ETH amount.

- Transaction Receipt: Created after a transaction has been mined, a receipt provides the outcome of the transaction (whether it succeeded or failed) and logs all events triggered during its execution. Transaction receipts are essential for gathering additional data, such as logs from related events, and determining transaction success or failure.

## Learning Objectives

- First Data Source: CryptoCoven
  In the CryptoCoven subgraph, we leveraged event.transaction and enums to categorize the different marketplaces (e.g., OpenSea, Rarible) where the NFTs were traded. The transaction metadata allowed us to analyze which marketplace was involved in each trade.

- Second Data Source: CryptoKitties
  In the CryptoKitties subgraph, we used Transaction Receipts to fetch additional log data from the marketplace contracts (e.g., OpenSea). This allowed us to pull data from another event emitted during the trade, providing deeper insights into the sale details.
