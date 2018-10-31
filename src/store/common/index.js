const state =  {
  userInfo: {}
}

// getters
const getters = {
  userInfo: state => state.userInfo
}

// actions
const actions = {
  
};

// mutations
const mutations = {

  // 缓存登录信息
  setUserInfo(state, data) {
    state.userInfo = Object.assign({}, data)
  }
};

// 可以在这里配置命名空间
export default {
  state,
  getters,
  actions,
  mutations,
};
