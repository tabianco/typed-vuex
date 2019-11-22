import { Plugin } from 'vuex'
import {
  getStoreType,
  getAccessorType,
  mutationTree,
  actionTree,
} from './../../../lib/utils'

import * as submodule from './submodule'

export const state = () => ({
  email: '',
})

type RootState = ReturnType<typeof state>

export const getters = {
  email: (state: RootState) => state.email,
  fullEmail: (state: RootState) => state.email,
}

export const mutations = mutationTree(state, {
  setEmail(state, newValue: string) {
    state.email = newValue
  },

  initialiseStore() {
    console.log('initialised')
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    async resetEmail({ commit }) {
      commit('setEmail', 'a@a.com')
    },
  }
)

export const plugins: Plugin<RootState>[] = []

export const storeType = getStoreType({
  actions,
  getters,
  mutations,
  state,
})

export const accessorType = getAccessorType({
  actions,
  getters,
  mutations,
  state,
  modules: {
    submodule,
  },
})
