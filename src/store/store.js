import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    consumeData: [],
    earningsDate: [],
    settlementDate: [],
    accountMangerData: [],
    timeline: []
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
    },
    addAcount(state, {obj}) {
        state.accountMangerData.push(obj)
    },
    setTimeLine(state, { obj }) {
        console.log('[[ timeline is setted ]]')
        state.timeline = obj
    }
}

const actions = {
    //  报表管理 消费数据模块 start ====>
    consumeData_action: ({ commit }, newArr) => commit('consumeData_evaluation', { newArr }),
    //  <=====  end
    // 营收记录 收益明细 结算记录模块 start ====>
    earningsDate_action: ({ commit }, arr) => commit('earningDate_detail', { arr }),
    settlementDate_action: ({ commit }, arr) => commit('settlementDate_detail', { arr }),
    //  <====== end
    // 报表管理时间段传递  start  ====>
    timeline_action: ({ commit }, obj) => commit('setTimeLine', { obj })
    // <===== end 

}

const getters = {

}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})