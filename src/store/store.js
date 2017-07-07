import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    consumeData: [],
    earningsDate: [],
    settlementDate: []
}

const mutations = {
    consumeData_evaluation(state, { newArr }) {
        console.log('[[ consumeData_evaluation is commited ]]')
        state.consumeData = newArr.newArr
        console.log(state.consumeData)
    },
    earningDate_detail(state, { arr }) {
        console.log('[[ earningDate_detail is commited ]]')
        state.earningsDate = arr
    },
    settlementDate_detail(state, { arr }) {
        console.log('[[ settlementDate_detail is commited ]]')
        state.settlementDate = arr
    }
}

const actions = {
    //  报表管理 消费数据模块 start ====>
    consumeData_action: ({ commit }, newArr) => commit('consumeData_evaluation', { newArr }),
    //  <=====  end
    // 营收记录 收益明细 结算记录模块 start ====>
    earningsDate_action: ({ commit }, arr) => commit('earningDate_detail', { arr }),
    settlementDate_action: ({ commit }, arr) => commit('settlementDate_detail', { arr })
    //  <====== end 
}

const getters = {

}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})