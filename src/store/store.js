import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    consumeData: []
}

const mutations = {
    consumeData_evaluation(state, { newArr }) {
        console.log('[[ consumeData_evaluation is commited ]]')
        state.consumeData = newArr.newArr
        console.log(state.consumeData)
    }
}

const actions = {
    //  报表管理 消费数据模块 start ====>
    consumeData_action: ({ commit }, newArr) => commit('consumeData_evaluation', { newArr })
        //  <=====  end
}

const getters = {

}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})