import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import Metadata from '../../contracts/address-name-service'
import ContractAPI from '../../components/ContractAPI'
import Constants from '../../constants'
import ContractInfo from '../../components/ContractInfo'
import NotDeployedView from '../../components/NotDeployedView';

const { NETWORK } = Constants

@inject('store')
@observer
class AddressNameService extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contract: undefined,
      owner: undefined,
    }
  }

  componentDidMount() {
    const { store: { walletStore: { network } } } = this.props
    if (network) {
      let contract = window.naka.eth.contract(Metadata.abi)

      let addr
      if (network === NETWORK.MAINNET) {
        addr = Metadata.mainnet
      } else if (network === NETWORK.TESTNET) {
        addr = Metadata.testnet
      }

      if (addr) {
        contract = contract.at(addr)
        this.setState({ contract })

        if (contract.owner) {
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
  }

  render() {
    const { store: { walletStore: { account } } } = this.props
    const { contract, owner } = this.state

    // Show not deployed view
    if (!contract) {
      return <NotDeployedView name="Address Name Service" />
    }

    return (
      <div>
        <ContractInfo
          name="Address Name Service"
          owner={owner} />
        <ContractAPI
          title="Resolve Name"
          description="Resolves a name to an address."
          fields={[
            { label: 'name' },
          ]}
          buttonText="Resolve"
          contractMethod={contract && contract.resolveName} />
        <ContractAPI
          title="Resolve Address"
          description="Resolves an address to a name."
          buttonText="Resolve"
          fields={[
            { label: 'address' },
          ]}
          contractMethod={contract && contract.resolveAddress} />
        <ContractAPI
          title="Assign Name"
          description="Assigns a name to your current address."
          buttonText="Assign"
          fields={[
            { label: 'name' },
          ]}
          contractMethod={contract && contract.assignName} />
        {account === owner && (
          <ContractAPI
            title="Transfer Storage Ownership"
            description="Transfers the ownership of the storage contract. Meant for upgrading the ANS contract."
            buttonText="Transfer"
            fields={[
              { label: 'address' },
            ]}
            contractMethod={contract && contract.transferStorageOwnership}
            onlyOwner />
        )}
      </div>
    )
  }
}

AddressNameService.propTypes = {
  store: PropTypes.object,
}

export default AddressNameService
