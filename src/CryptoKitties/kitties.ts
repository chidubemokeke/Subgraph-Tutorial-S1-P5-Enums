import { Transfer as KittyTransferEvent } from "../../generated/CryptoKitties/CryptoKitties";
import { Address, log } from "@graphprotocol/graph-ts";
import { KittyTransfer, Sale } from "../../generated/schema";
import { getOrCreateAccount } from "../CryptoCoven/coven-helper";
import { getNFTName, NFT } from "./kitty-helper";
import {
  ZERO_ADDRESS,
  OPENSEAV1,
  OPENSEAV2,
  BIGINT_ONE,
  CRYPTO_KITTIES,
} from "../CryptoKitties/kitties-consts";
