const contractInfo = require('./contract.json')
const Escrow20 = require('./abi/ERC20.json')
const Escrow20Basic = require('./abi/ERC20Basic.json')
const SingleEscrow = require('./abi/SingleEscrow.json')
const EscrowFactory = require('./abi/EscrowFactory.json')
const ERC20Interface = require('./abi/ERC20Interface.json')
const SimpleEscrow = require('./abi/SimpleEscrow.json')

const defaultState = {
  contractEscrow20: null,
  contractEscrow20Basic: null,
  contractSingleEscrow: null,
  abiSingleEscrow: null,
  contractEscrowFactory: null,
  contractERC20Interface: null,
  contractSimpleEscrow: null,
}

export default {
  namespaced: true,
  state: {
    ...defaultState,
  },
  mutations: {
    SET_CONTRACT_Escrow20(state, contractEscrow20) {
      state.contractEscrow20 = contractEscrow20
    },
    SET_CONTRACT_Escrow20Basic(state, contractEscrow20Basic) {
      state.contractEscrow20Basic = contractEscrow20Basic
    },
    SET_CONTRACT_SingleEscrow(state, contractSingleEscrow) {
      state.contractSingleEscrow = contractSingleEscrow
    },
    SET_ABI_SingleEscrow(state, abiSingleEscrow) {
      state.abiSingleEscrow = abiSingleEscrow
    },
    SET_CONTRACT_EscrowFactory(state, contractEscrowFactory) {
      state.contractEscrowFactory = contractEscrowFactory
    },
    SET_CONTRACT_ERC20Interface(state, contractERC20Interface) {
      state.contractERC20Interface = contractERC20Interface
    },
    SET_CONTRACT_SimpleEscrow(state, contractSimpleEscrow) {
      state.contractSimpleEscrow = contractSimpleEscrow
    },
  },
  actions: {
    initContracts({ commit, rootState }) {
      const { web3 } = rootState.metamask
      const Escrow20Contract = new web3.eth.Contract(Escrow20, contractInfo.Escrow20.address)
      const Escrow20BasicContract = new web3.eth.Contract(Escrow20Basic, contractInfo.Escrow20Basic.address)
      const SingleEscrowContract = new web3.eth.Contract(SingleEscrow, contractInfo.SingleEscrow.address)
      const EscrowFactoryContract = new web3.eth.Contract(EscrowFactory, contractInfo.EscrowFactory.address)

      const DAITokenAddress = "0xC3C94c56D887a62B2eef9d49945A8b4f9Cc20511"
      const ERC20InterfaceContract = new web3.eth.Contract(ERC20Interface, DAITokenAddress)
      //const ERC20InterfaceContract = new web3.eth.Contract(ERC20Interface, contractInfo.ERC20Interface.address)

      const SimpleEscrowContract = new web3.eth.Contract(SimpleEscrow, contractInfo.SimpleEscrow.address)

      commit('SET_CONTRACT_Escrow20', Escrow20Contract)
      commit('SET_CONTRACT_Escrow20Basic', Escrow20BasicContract)
      commit('SET_CONTRACT_SingleEscrow', SingleEscrowContract)
      commit('SET_ABI_SingleEscrow', SingleEscrow)
      commit('SET_CONTRACT_EscrowFactory', EscrowFactoryContract)
      commit('SET_CONTRACT_ERC20Interface', ERC20InterfaceContract)
      commit('SET_CONTRACT_SimpleEscrow', SimpleEscrowContract)
    }
  },
  getters: {
    getEscrow20Contract(state) {
      return state.contractEscrow20
    },
    getEscrow20BasicContract(state) {
      return state.contractEscrow20Basic
    },
    getSingleEscrowContract(state) {
      return state.contractSingleEscrow
    },
    getSingleEscrowAbi(state) {
      return state.abiSingleEscrow
    },
    getEscrowFactoryContract(state) {
      return state.contractEscrowFactory
    },
    getERC20InterfaceContract(state) {
      return state.contractERC20Interface
    },
    getSimpleEscrowContract(state) {
      return state.contractSimpleEscrow
    },
  }
}
