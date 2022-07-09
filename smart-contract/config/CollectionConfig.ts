import CollectionConfigInterface from '../lib/CollectionConfigInterface';
import { ethereumTestnet, ethereumMainnet } from '../lib/Networks';
import { openSea } from '../lib/Marketplaces';
import whitelistAddresses from './whitelist.json';

const CollectionConfig: CollectionConfigInterface = {
  testnet: ethereumTestnet,
  mainnet: ethereumMainnet,
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  contractName: 'Teiko',
  tokenName: 'Teiko NFT',
  tokenSymbol: 'Teiko',
  hiddenMetadataUri: 'ipfs://__CID__/hidden.json',
  maxSupply: 2600,
  whitelistSale: {
    price: 0.0,
    maxMintAmountPerTx: 5,
  },
  preSale: {
    price: 0.07,
    maxMintAmountPerTx: 2,
  },
  publicSale: {
    price: 0.004,
    maxMintAmountPerTx: 6,
  },
  contractAddress: '0x309A87034A81E555585Fa0a3F541205992Ad7ec2',
  marketplaceIdentifier: 'TeikoNFT',
  marketplaceConfig: openSea,
  whitelistAddresses: whitelistAddresses,
};

export default CollectionConfig;
