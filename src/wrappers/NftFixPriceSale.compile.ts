import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'func',
    targets: ['contracts/nft-fixprice-sale/nft-fixprice-sale.fc'],
};
