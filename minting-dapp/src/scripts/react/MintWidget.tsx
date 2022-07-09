import { Contract, providers, utils, BigNumber, ethers } from 'ethers';
import React from 'react';

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/ethereum-provider";

import Header from './Header';

interface Props {
  maxSupply: number,
  totalSupply: number,
  tokenPrice: BigNumber,
  maxMintAmountPerTx: number,
  isPaused: boolean,
  isWhitelistMintEnabled: boolean,
  isUserInWhitelist: boolean,
  mintTokens(mintAmount: number): Promise<void>,
  whitelistMintTokens(mintAmount: number): Promise<void>
  connectWallet: Function
  connecting: Boolean,
  userAddress: string|null;
}

interface State {
  mintAmount: number;
  currentSlide: number,
  web3Modal: Web3Modal | null
}

const defaultState: State = {
  mintAmount: 1,
  currentSlide: 1,
  web3Modal: null
};

export default class MintWidget extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;
  }

  private canMint(): boolean {
    return !this.props.isPaused || true;
  }

  private canWhitelistMint(): boolean {
    return this.props.isWhitelistMintEnabled && this.props.isUserInWhitelist;
  }

  private incrementMintAmount(): void {
    this.setState({
      mintAmount: Math.min(this.props.maxMintAmountPerTx, this.state.mintAmount + 1),
    });
  }

  private decrementMintAmount(): void {
    this.setState({
      mintAmount: Math.max(1, this.state.mintAmount - 1),
    });
  }

  private async mint(): Promise<void> {
    if (!this.props.isPaused) {
      await this.props.mintTokens(this.state.mintAmount);

      return;
    }

      
    await this.props.whitelistMintTokens(this.state.mintAmount);
  }

  private async mintMobild(): Promise<void> {
    if (this.state.web3Modal !== null) {
      const web3Provider = await this.state.web3Modal.connect();
      const accounts = (await web3Provider.enable()) as string[];
      
      console.log(accounts)
    }
    console.log('mint mobile');
    /*const providerOptions = {
      walletconnect: {
        package: WalletConnect, // required
        options: {
          infuraId: "b84b6a3a88fc4655902dba0c9cb32b7a" // required
        }
      }
    };

    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions // required
    });

    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    console.log(signer)*/
  }

  private connect(): void {

  }

  private toggleslide(): void {
    let currentSlide = this.state.currentSlide;
    currentSlide === 1 ? currentSlide = 2 : currentSlide = 1;
    this.setState({
      currentSlide
    })
  }

  componentDidMount() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: 'b84b6a3a88fc4655902dba0c9cb32b7a',
          },
        },
      },
    });

    this.setState({
      web3Modal
    });
  }

  render() {
    return (
      <>
        <Header />
        <div className="main__top">
          <div className="main__top--photos">
            <figure>
              <img src="/build/images/37.png"/>
            </figure>
            <figure>
              <img src="/build/images/54.png"/>
            </figure>
          </div>

          <div className="main__para">
            <p>A community driven brand that exists on the metaverse. 2600 Teiko warriors ready to Teiko web3.
              One of a kind art with a team ready to build....</p>
          </div>

          {this.canMint() ?
          <div className="main">
            {/*<div className="main__price">
              <strong></strong> {utils.formatEther(this.props.tokenPrice.mul(this.state.mintAmount))} ETH 
          </div>*/}
          {this.props.totalSupply}/{this.props.maxSupply}
          <a className="ethlink" href="https://etherscan.io/address/0xa35346ef08F731AF6E7D3d1F5B948c1De0AEcc8C#code" target="_blank">0xa35346ef08F731AF6E7D3d1F5B948c1De0AEcc8C</a>
          <div className="maxmint">6 Max</div>

            <div className="main__controls">
              <div className="main__controls--toggle">
                <button className="main__controls--decrease toggle" onClick={() => this.decrementMintAmount()}>-</button>
                <span className="main__controls--amount toggle">{this.state.mintAmount}</span>
                <button className="main__controls--increase toggle" onClick={() => this.incrementMintAmount()}>+</button>
              </div>
              <button className="main__controls--primary main__controls--primary-mobile" onClick={() => this.mintMobild()}>Mint</button>
              {
                this.props.userAddress ? <button className="main__controls--primary" onClick={() => this.mint()}>Mint</button> : 
                <button className="main__controls--primary">{this.props.connecting ? 'Connecting' : 'Connect'}</button>
                }
            </div>
          </div>
          :
          <div className="cannot-mint">
            <span className="emoji">⏳</span>
            
            {this.props.isWhitelistMintEnabled ? <>You are not included in the <strong>whitelist</strong>.</> : <>The contract is <strong>paused</strong>.</>}<br />
            Please come back during the next sale!
          </div>
        }
        <div className="main__bottomarea">
          <h2 className="main__bottom--h2">Meet the Team</h2>
          <div className="main__team">
          <div className="main__team--box">
            <div className="main__team--name">
              <p>Brian</p>
            </div>
            <figure>
              <img src="/build/images/18.png"/>
            </figure>
          </div>
          <div className="main__team--box">
            <div className="main__team--name">
              <p>Joon</p>
            </div>
            <figure>
              <img src="/build/images/177.png"/>
            </figure>
          </div>
          <div className="main__team--box">
            <div className="main__team--name">
              <p>Ryung</p>
            </div>
            <figure>
              <img src="/build/images/94.png"/>
            </figure>
          </div>
          </div>
        </div>
        </div>
      </>
    );
  }
}
