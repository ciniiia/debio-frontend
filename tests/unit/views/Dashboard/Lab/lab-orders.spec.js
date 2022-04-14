import { createLocalVue, shallowMount } from "@vue/test-utils"
import LabOrders from "@/views/Dashboard/Lab/LabOrders"
import Vuex from "vuex"
import Vuetify from "vuetify"
import _ from "lodash"

describe("Dashboard Lab Lab Orders View", () => {
  let container
  let localVue = null

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(Vuetify)
  })

  afterEach(() => {
    localVue = null
  })

  it("Should render", () => {
    // Arrange
    const labOrdersDashboard = _.cloneDeep(LabOrders)
    labOrdersDashboard.created = jest.fn()
    labOrdersDashboard.mounted = jest.fn()

    container = shallowMount(labOrdersDashboard, {
      localVue,
      vuetify: new Vuetify(),
      store: new Vuex.Store({
        state: {
          substrate: {
            api: "API",
            wallet: "WALLET",
            mnemonicData: "oil spend nation obey lecture behave lake diary reward forest gym apple"
          },
          auth: {
            loadingData: "LOADING"
          },
          metamask: {
            web3: "WEB3"
          }
        }
      })
    })

    // Assert
    expect(container.exists()).toBe(true)
  })
})
