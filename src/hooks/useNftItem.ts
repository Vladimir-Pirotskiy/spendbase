import {Address, Builder, TonClient, beginCell} from "@ton/ton";
import {NftItem} from "@/wrappers/NftItem.ts";
import {encodeOffChainContent} from "@/wrappers/contentUtils/offChain.ts";

export async function transferOwnershipNftItem(
  ton: TonClient,
  sender: any,
  amount: bigint,
  nftAddress: Address,
  newOwner: Address,
  responseAddress: Address,
  forwardAmount: bigint,
  payload: Builder = beginCell()
) {
  let nft = ton.open(NftItem.createFromAddress(nftAddress));
  await nft.sendTransfer(sender, amount, {
    queryId: Math.floor(Math.random() * 1000),
    newOwner: newOwner,
    response: responseAddress,
    forwardAmount: forwardAmount,
    payload: payload
  });
}

export async function transferEditorshipNftItem(
  ton: TonClient,
  sender: any,
  amount: bigint,
  nftAddress: Address,
  newEditor: Address,
  responseAddress: Address,
  forwardAmount: bigint,
  payload: Builder = beginCell()
) {
  let nft = ton.open(NftItem.createFromAddress(nftAddress));
  await nft.sendTransferEditorship(sender, amount, {
    queryId: Math.floor(Math.random() * 1000),
    newEditor: newEditor,
    response: responseAddress,
    forwardAmount: forwardAmount,
    payload: payload
  });
}

export async function getStaticDataNftItemTransaction(
  ton: TonClient,
  sender: any,
  amount: bigint,
  nftAddress: Address
) {
  let nft = ton.open(NftItem.createFromAddress(nftAddress));
  await nft.sendGetStaticData(sender, amount, {queryId: Math.floor(Math.random() * 1000)});
}

export async function editContentNftItem(
  ton: TonClient,
  sender: any,
  amount: bigint,
  nftAddress: Address,
  itemContent: string
) {
  let nft = ton.open(NftItem.createFromAddress(nftAddress));
  await nft.sendEditContent(sender, amount, {
    queryId: Math.floor(Math.random() * 1000),
    content: encodeOffChainContent(itemContent)
  });
}

export async function getNftData(
  ton: TonClient,
  nftAddress: Address
) {
  let nft = ton.open(NftItem.createFromAddress(nftAddress));
  return await nft.getNftData();
}

export async function getEditorNftItem(
  ton: TonClient,
  nftAddress: Address
) {
  let nft = ton.open(NftItem.createFromAddress(nftAddress));
  return await nft.getEditor();
}