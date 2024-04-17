import {Address, TonClient} from "@ton/ton";
import {buildCollectionContentCell, NftCollectionContent} from "@/wrappers/contentUtils/offChain.ts";
import {NFT_ITEM_CONTRACT_CODE_CELL} from "@/wrappers/NftItem.ts";
import {
  NFT_COLLECTION_CONTRACT_CODE_CELL,
  NftCollection,
  NftConfig,
  NftInfoForDeploy,
  RoyaltyParams
} from "@/wrappers/NftCollection.ts";

export async function deployNftCollection(
  ton: TonClient,
  sender: any,
  amount: bigint,
  params: {
    ownerAddress: Address;
    nextItemIndex: number;
    collectionContent: NftCollectionContent;
    royaltyParams: RoyaltyParams;
  }
) {
  const config: NftConfig = {
    ownerAddress: params.ownerAddress,
    nextItemIndex: params.nextItemIndex,
    collectionContent: buildCollectionContentCell(params.collectionContent),
    nftItemCode: NFT_ITEM_CONTRACT_CODE_CELL,
    royaltyParams: params.royaltyParams
  };
  let collection = ton.open(NftCollection.createFromConfig(config, NFT_COLLECTION_CONTRACT_CODE_CELL));
  await collection.sendDeploy(sender, amount);
}

export async function mintNftItem(
  ton: TonClient,
  sender: any,
  amount: bigint,
  collectionAddress: Address,
  nftInfo: NftInfoForDeploy
) {
  let collection = ton.open(NftCollection.createFromAddress(collectionAddress));
  await collection.sendMintNft(sender, {value: amount, queryId: Math.floor(Math.random() * 1000), nftInfo: nftInfo});
}

export async function mintBatchNftItems(
  ton: TonClient,
  sender: any,
  amount: bigint,
  collectionAddress: Address,
  nftsInfo: NftInfoForDeploy[]
) {
  let collection = ton.open(NftCollection.createFromAddress(collectionAddress));
  await collection.sendMintBatchNft(sender, {
    value: amount,
    queryId: Math.floor(Math.random() * 1000),
    nftsInfo: nftsInfo
  });
}

export async function changeOwnerNftCollection(
  ton: TonClient,
  sender: any,
  amount: bigint,
  collectionAddress: Address,
  newOwner: Address
) {
  let collection = ton.open(NftCollection.createFromAddress(collectionAddress));
  await collection.sendChangeOwner(sender, {
    value: amount,
    queryId: Math.floor(Math.random() * 1000),
    newOwnerAddress: newOwner
  });
}

export async function changeContentNftCollection(
  ton: TonClient,
  sender: any,
  amount: bigint,
  collectionAddress: Address,
  content: NftCollectionContent,
  royaltyParams: RoyaltyParams
) {
  const contentCell = buildCollectionContentCell(content);
  let collection = ton.open(NftCollection.createFromAddress(collectionAddress));
  await collection.sendChangeContent(sender, {
    value: amount,
    queryId: Math.floor(Math.random() * 1000),
    content: contentCell,
    royaltyParams: royaltyParams
  });
}

export async function getRoyaltyParamsNftCollectionTransaction(
  ton: TonClient,
  sender: any,
  amount: bigint,
  collectionAddress: Address,
) {
  let collection = ton.open(NftCollection.createFromAddress(collectionAddress));
  await collection.sendGetRoyaltyParams(sender, {value: amount, queryId: Math.floor(Math.random() * 1000)});
}

export async function getNftCollectionData(
  ton: TonClient,
  collectionAddress: Address
) {
  let collection = ton.open(NftCollection.createFromAddress(collectionAddress));
  await collection.getCollectionData();
}

export async function getNftItemAddressByIndex(
  ton: TonClient,
  collectionAddress: Address,
  index: bigint
) {
  let collection = ton.open(NftCollection.createFromAddress(collectionAddress));
  await collection.getNftAddressByIndex(index);
}

export async function getRoyaltyParamsNftCollection(
  ton: TonClient,
  collectionAddress: Address
) {
  let collection = ton.open(NftCollection.createFromAddress(collectionAddress));
  await collection.getRoyaltyParams();
}