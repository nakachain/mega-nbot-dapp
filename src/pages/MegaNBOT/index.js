import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import MegaNBOTMeta from '../../contracts/mega-nbot'
import NBOTMeta from '../../contracts/nbot'
import Constants from '../../constants'
import Config from '../../config'
import ContractInfo from '../../components/ContractInfo'
import ContractAPI from '../../components/ContractAPI'
import NotDeployedView from '../../components/NotDeployedView';

const { NETWORK } = Constants
const { TOKEN: { NBOT } } = Config

@inject('store')
@observer
class MegaNBOT extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contract: undefined,
      nbotContract: undefined,
      owner: undefined,
    }
  }

  componentDidMount() {
    const { store: { walletStore: { network } } } = this.props
    if (network) {
      let contract = window.naka.eth.contract(MegaNBOTMeta.abi)
      let nbotContract = window.naka.eth.contract(NBOTMeta.abi)

      let addr
      let nbotAddr
      if (network === NETWORK.MAINNET) {
        addr = MegaNBOTMeta.mainnet
        nbotAddr = NBOTMeta.mainnet
      } else if (network === NETWORK.TESTNET) {
        addr = MegaNBOTMeta.testnet
        nbotAddr = NBOTMeta.testnet
      }

      if (addr && nbotAddr) {
        contract = contract.at(addr)
        nbotContract = nbotContract.at(nbotAddr)
        this.setState({ contract, nbotContract })

        contract.owner((err, res) => {
          if (err) {
            console.error('Error fetching owner.', err)
            return
          }
          this.setState({ owner: res })
        })
      }
    }
  }

  render() {
    const { store: { walletStore: { account } } } = this.props
    const { contract, nbotContract, owner } = this.state

    // Show not deployed view
    if (!contract && !nbotContract) {
      return <NotDeployedView name="MegaNBOT" />
    }

    return (
      <div>
        <ContractInfo
          name="MegaNBOT"
          owner={owner} />
        <ContractAPI
          title="Last Drawing Block Number"
          description="Returns the last drawing block number."
          buttonText="Get"
          fields={[]}
          contractMethod={contract && contract.lastDrawingBlockNum} />
        <ContractAPI
          title="Winning Amount"
          description="Returns the winning amount for the drawing."
          buttonText="Get"
          fields={[]}
          contractMethod={contract && contract.winningAmount}
          responseFormat={{ symbol: NBOT.symbol, decimals: NBOT.decimals }} />
        <ContractAPI
          title="Drawing Interval"
          description="Returns the minimum number of blocks to pass for each drawing."
          buttonText="Get"
          fields={[]}
          contractMethod={contract && contract.withdrawInterval} />
        <ContractAPI
          title="Enter Drawing"
          description="Enters the current drawing with the current address."
          buttonText="Enter"
          fields={[]}
          contractMethod={contract && contract.enterDrawingFromSender} />
        <ContractAPI
          title="Enter Drawing & Deposit NBOT"
          description="Enters the current drawing with the current address and deposits NBOT to the MegaNBOT contract."
          buttonText="Enter"
          fields={[
            { label: 'to', value: (contract && contract.address) || '' },
            { label: 'amount (NBOT)', decimals: NBOT.decimals },
            { label: 'data', value: '0xeecb215f' },
          ]}
          contractMethod={nbotContract && nbotContract.transfer['address,uint256,bytes']} />
        <ContractAPI
          title="Deposit NBOT"
          description="Deposits NBOT to the MegaNBOT contract."
          buttonText="Deposit"
          fields={[
            { label: 'to', value: (contract && contract.address) || '' },
            { label: 'amount (NBOT)', decimals: NBOT.decimals },
            { label: 'data', value: '0xeecb215f' },
          ]}
          contractMethod={nbotContract && nbotContract.transfer['address,uint256,bytes']} />
        <ContractAPI
          title="Is In Current Drawing?"
          description="Checks if the address is in the current drawing."
          buttonText="Check"
          fields={[
            { label: 'address' },
          ]}
          contractMethod={contract && contract.isInCurrentDrawing} />
        <ContractAPI
          title="NBOT Address"
          description="Returns the address of the NBOT contract."
          buttonText="Get"
          fields={[]}
          contractMethod={contract && contract.nbotAddress} />
        <ContractAPI
          title="Locked?"
          description="Returns if the contract is locked."
          buttonText="Check"
          fields={[]}
          contractMethod={contract && contract.locked} />
        <ContractAPI
          title="Will Lock After Drawing?"
          description="Returns if the contract will be locked after the current drawing."
          buttonText="Check"
          fields={[]}
          contractMethod={contract && contract.lockAfterDrawing} />
        {account === owner && (
          <div>
             <ContractAPI
              title="Set Winning Amount"
              description="Sets the winning amount."
              buttonText="Set"
              fields={[
                { label: 'amount (NBOT)', decimals: NBOT.decimals },
              ]}
              contractMethod={contract && contract.setWinningAmount}
              onlyOwner />
            <ContractAPI
              title="Set Drawing Interval"
              description="Sets the minimum number of blocks for each drawing."
              buttonText="Set"
              fields={[
                { label: 'interval (blocks)' },
              ]}
              contractMethod={contract && contract.setWithdrawInterval}
              onlyOwner />
            <ContractAPI
              title="Lock Contract"
              description="Locks the contract after the current drawing."
              buttonText="Lock"
              fields={[]}
              contractMethod={contract && contract.lock}
              onlyOwner />
            <ContractAPI
              title="Unlock Contract"
              description="Unlocks the contract and starts a new drawing round. Contract must be locked."
              buttonText="Unlock"
              fields={[]}
              contractMethod={contract && contract.unlock}
              onlyOwner />
            <ContractAPI
              title="Withdraw Remaining NBOT"
              description="Withdraws the remaining NBOT to the owner. Contract must be locked."
              buttonText="Withdraw"
              fields={[]}
              contractMethod={contract && contract.withdraw}
              onlyOwner />
            <ContractAPI
              title="Set NBOT Address"
              description="Sets the NBOT contract address."
              buttonText="Set"
              fields={[
                { label: 'address' },
              ]}
              contractMethod={contract && contract.setNBOTAddress}
              onlyOwner />
          </div>
        )}
      </div>
    )
  }
}

MegaNBOT.propTypes = {
  store: PropTypes.object,
}

export default MegaNBOT
