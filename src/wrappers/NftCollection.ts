import {
  Address,
  beginCell,
  Builder,
  Cell,
  Contract,
  contractAddress,
  ContractProvider,
  Dictionary,
  Sender,
  SendMode,
  Slice
} from '@ton/core';
import {decodeOffChainContent, encodeOffChainContent} from './contentUtils/offChain';

export const NFT_COLLECTION_CONTRACT_CODE = "b5ee9c72010214010001fc000114ff00f4a413f4bcf2c80b0102016202030202cd04050201200e0f04e7d10638048adf000e8698180b8d848adf07d201800e98fe99ff6a2687d20699fea6a6a184108349e9ca829405d47141baf8280e8410854658056b84008646582a802e78b127d010a65b509e58fe59f80e78b64c0207d80701b28b9e382f970c892e000f18112e001718112e001f181181981e0024060708090201200a0b004c3502d33f5113bbf2e192fa00d43023544730f00701a44343c85005cf1613cb3fccccccc9ed5400a6357003d4308e378040f4966fa5208e2906a4208100fabe93f2c18fde81019321a05325bbf2f402fa00d43022544b30f00723ba9302a402de04926c21e2b3e6303250444313c85005cf1613cb3fccccccc9ed54002c323401fa40304144c85005cf1613cb3fccccccc9ed54003c8e15d4d43010344130c85005cf1613cb3fccccccc9ed54e05f04840ff2f0002d501c8cb3ff828cf16c97020c8cb0113f400f400cb00c980201200c0d001b3e401d3232c084b281f2fff27420003d16bc015c087c019de0063232c15633c594013e8084f2dac4b333325c7ec02002012010110025bc82df6a2687d20699fea6a6a182de86a182c40011b8b5dc832d0cf16c980201201213002fb5dafda89a1f481a67fa9a9a860d883a1a61fa61ff480610002db4f47da89a1f481a67fa9a9a86028be09e00ae003e00d0";

export const NFT_COLLECTION_CONTRACT_CODE_CELL = Cell.fromBoc(Buffer.from(NFT_COLLECTION_CONTRACT_CODE, 'hex'))[0];

export type NftConfig = {
  ownerAddress: Address;
  nextItemIndex: number;
  collectionContent: Cell;
  nftItemCode: Cell;
  royaltyParams: RoyaltyParams;
};

export type RoyaltyParams = {
  royaltyFactor: number;
  royaltyBase: number;
  royaltyAddress: Address;
};

export type NftInfoForDeploy = {
  itemIndex: number;
  itemOwnerAddress: Address;
  itemContent: string;
  amount: bigint;
  editor: Address;
};

export type ValueForDict = {
  amount: bigint;
  ref: Cell;
};

export function NftConfigToCell(config: NftConfig): Cell {
  return beginCell()
    .storeAddress(config.ownerAddress)
    .storeUint(config.nextItemIndex, 64)
    .storeRef(config.collectionContent)
    .storeRef(config.nftItemCode)
    .storeRef(
      beginCell()
        .storeUint(config.royaltyParams.royaltyFactor, 16)
        .storeUint(config.royaltyParams.royaltyBase, 16)
        .storeAddress(config.royaltyParams.royaltyAddress)
    )
    .endCell();
}

export function BuildValueForDict(nftInfo: NftInfoForDeploy) {
  const nftContent = encodeOffChainContent(nftInfo.itemContent);
  const nftMessage = beginCell();
  nftMessage.storeAddress(nftInfo.itemOwnerAddress);
  nftMessage.storeRef(nftContent);
  nftMessage.storeAddress(nftInfo.editor);

  let value: ValueForDict = {amount: nftInfo.amount, ref: nftMessage.endCell()};

  return value;
}

export const Utils = {

  serialize: (value: ValueForDict, builder: Builder) => {
    builder.storeCoins(value.amount).storeRef(value.ref);
  },

  parse: (src: Slice) => {
    let parsed: ValueForDict = {amount: src.loadCoins(), ref: src.loadRef()};
    return parsed
  },
};

export function buildNftDeployCellForBatchMessage(nftsInfo: NftInfoForDeploy[]) {
  let dict = Dictionary.empty<number, ValueForDict>(Dictionary.Keys.Uint(64), Utils);

  for (var nft of nftsInfo) {
    dict = dict.set(nft.itemIndex, BuildValueForDict(nft));
  }

  return beginCell().storeDictDirect<number, ValueForDict>(dict).endCell();
}

export const Queries = {
  mintNftMessage: (queryId: number, nftInfo: NftInfoForDeploy) => {
    const nftContent = encodeOffChainContent(nftInfo.itemContent);

    const nftMessage = beginCell();
    nftMessage.storeAddress(nftInfo.itemOwnerAddress)
    nftMessage.storeRef(nftContent)
    nftMessage.storeAddress(nftInfo.editor)
    return beginCell()
      .storeUint(1, 32)  // operation
      .storeUint(queryId, 64)
      .storeUint(nftInfo.itemIndex, 64)
      .storeCoins(nftInfo.amount)
      .storeRef(nftMessage)
  },

  deployMessage: () => {
    return beginCell();
  },

  mintBatchNftMessage: (queryId: number, nftsInfo: NftInfoForDeploy[]) => {
    return beginCell()
      .storeUint(2, 32) //operation
      .storeUint(queryId, 64)
      .storeRef(buildNftDeployCellForBatchMessage(nftsInfo));
  },

  changeOwnerMessage: (queryId: number, newOwnerAddress: Address) => {
    return beginCell()
      .storeUint(3, 32) //operation
      .storeUint(queryId, 64)
      .storeAddress(newOwnerAddress);
  },

  changeContentMessage: (queryId: number, content: Cell, royaltyParams: RoyaltyParams) => {
    return beginCell()
      .storeUint(4, 32) //operation
      .storeUint(queryId, 64)
      .storeRef(content)
      .storeRef(beginCell()
        .storeUint(royaltyParams.royaltyFactor, 16)
        .storeUint(royaltyParams.royaltyBase, 16)
        .storeAddress(royaltyParams.royaltyAddress));
  },

  getRoyaltyParamsMessage: (queryId: number) => {
    return beginCell()
      .storeUint(0x693d3950, 32) //operation
      .storeUint(queryId, 64);
  },
}

export class NftCollection implements Contract {
  constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {
  }

  static queries = Queries

  static createFromAddress(address: Address) {
    return new NftCollection(address);
  }

  static createFromConfig(config: NftConfig, code: Cell, workchain = 0) {
    const data = NftConfigToCell(config);
    const init = {code, data};
    return new NftCollection(contractAddress(workchain, init), init);
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().storeBuilder(Queries.deployMessage()).endCell(),
    });
  }

  async sendMintNft(provider: ContractProvider, via: Sender,
                    opts: {
                      value: bigint;
                      queryId: number;
                      nftInfo: NftInfoForDeploy;
                    }
  ) {
    await provider.internal(via, {
      value: opts.value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().storeBuilder(Queries.mintNftMessage(opts.queryId, opts.nftInfo)).endCell()
    })
  }

  async sendMintBatchNft(provider: ContractProvider, via: Sender,
                         opts: {
                           value: bigint;
                           queryId: number;
                           nftsInfo: NftInfoForDeploy[];
                         }
  ) {
    await provider.internal(via, {
      value: opts.value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().storeBuilder(Queries.mintBatchNftMessage(opts.queryId, opts.nftsInfo)).endCell()
    })
  }

  async sendChangeContent(provider: ContractProvider, via: Sender,
                          opts: {
                            value: bigint;
                            queryId: number;
                            content: Cell;
                            royaltyParams: RoyaltyParams;
                          }
  ) {
    await provider.internal(via, {
      value: opts.value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().storeBuilder(Queries.changeContentMessage(opts.queryId, opts.content, opts.royaltyParams)).endCell()
    })
  }

  async sendChangeOwner(provider: ContractProvider, via: Sender,
                        opts: {
                          value: bigint;
                          queryId: number;
                          newOwnerAddress: Address;
                        }
  ) {
    await provider.internal(via, {
      value: opts.value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().storeBuilder(Queries.changeOwnerMessage(opts.queryId, opts.newOwnerAddress)).endCell()
    })
  }

  async sendGetRoyaltyParams(provider: ContractProvider, via: Sender,
                             opts: {
                               value: bigint;
                               queryId: number;
                             }
  ) {
    await provider.internal(via, {
      value: opts.value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().storeBuilder(Queries.getRoyaltyParamsMessage(opts.queryId)).endCell()
    })
  }

  // for offcahin content!
  async getCollectionData(provider: ContractProvider): Promise<{
    nextItemId: number,
    ownerAddress: Address,
    collectionContent: string
  }> {
    const collection_data = await provider.get("get_collection_data", []);
    const stack = await collection_data.stack;
    let nextItem: bigint = stack.readBigNumber();
    let collectionContent = await stack.readCell();
    let ownerAddress = await stack.readAddress();
    return {
      nextItemId: Number(nextItem),
      collectionContent: decodeOffChainContent(collectionContent),
      ownerAddress: ownerAddress
    };
  }

  async getRoyaltyParams(provider: ContractProvider) {
    const royalty_params = (await provider.get("royalty_params", [])).stack;
    return {
      royaltyFactor: royalty_params.readNumber(),
      royaltyBase: royalty_params.readNumber(),
      royaltyAddress: royalty_params.readAddress()
    };
  }

  async getNftAddressByIndex(provider: ContractProvider, index: bigint) {
    const nft_address = (await provider.get("get_nft_address_by_index", [{type: 'int', value: index}])).stack;
    return {
      address: nft_address.readAddress()
    };
  }

}
