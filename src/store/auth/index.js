import localStorage from '../../lib/local-storage';
import { getLocation } from "@/lib/api";

const defaultState = {
  role: null,
  configApp: null,
  countryData: [],
  loadingData: null,
}

export default {
  namespaced: true,
  state: {
    ...defaultState
  },
  mutations: {
    SET_ROLE(state, role) {
      state.role = role
    },
    SET_CONFIG(state, data) {
      state.configApp = data
    },
    SET_COUNTRY(state, data) {
      state.countryData = data
    },
    SET_LOADING(state, data) {
      state.loadingData = data
    },
    CLEAR(state) {
      state.role = defaultState.role
    }
  },
  actions: {
    async initApp({ commit }) {
      const roleApp = process.env.VUE_APP_ROLE;

      let configApp;
      if (roleApp == "development") {
        const tokenName = process.env.VUE_APP_DEV_DEGENICS_USE_TOKEN_NAME;
        const escrowETHAddress = process.env.VUE_APP_DEV_DEGENICS_ESCROW_ETH_ADDRESS;
        const substrateWs = process.env.VUE_APP_DEV_DEGENICS_SUBSTRATE_WS;
        const urlFaucet = process.env.VUE_APP_DEV_URL_FAUCET;
        const web3Rpc = process.env.VUE_APP_WEB3_RPC;
        const apiUrl = process.env.VUE_APP_BACKEND_API;
        configApp = {
          tokenName,
          escrowETHAddress,
          substrateWs,
          urlFaucet,
          web3Rpc,
          apiUrl
        };
      } else {
        const tokenName = process.env.VUE_APP_DEGENICS_USE_TOKEN_NAME;
        const escrowETHAddress = process.env.VUE_APP_DEGENICS_ESCROW_ETH_ADDRESS;
        const substrateWs = process.env.VUE_APP_DEGENICS_SUBSTRATE_WS;
        const urlFaucet = process.env.VUE_APP_URL_FAUCET;
        const web3Rpc = process.env.VUE_APP_DEV_WEB3_RPC;
        const apiUrl = process.env.VUE_APP_BACKEND_API;
        configApp = {
          tokenName,
          escrowETHAddress,
          substrateWs,
          urlFaucet,
          web3Rpc,
          apiUrl
        };
      }
      commit('SET_CONFIG', configApp);
      const countries = await getLocation(null, null);
      commit('SET_COUNTRY', countries);
    },
    async getRole({ commit, rootGetters }) {
      try {
        let keystore = localStorage.getKeystore()
        keystore = JSON.parse(keystore)
        const accountContract = rootGetters['ethereum/contracts/getAccountContract']
        let role = await accountContract.methods.myRole().call({ from: keystore.address })
        console.log('In Get Role: ', role)
        if (role == '') {
          role = 'customer'
        }
        commit('SET_ROLE', role)

      } catch (err) {
        commit('SET_ROLE', null)
        throw new Error('Error on getting role from account Contract ', err.message)
      }
    },
    clearAuth({ commit }) {
      localStorage.removeAddress()
      commit('CLEAR')
    }
  },
  getters: {
    getRole(state) {
      return state.role
    },
    getConfig(state) {
      return state.configApp
    },
    getLoading(state) {
      return state.loadingData
    }
  }
}
