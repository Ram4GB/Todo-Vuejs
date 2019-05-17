import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VeeValidate from "vee-validate";

Vue.use(Vuex);
Vue.use(VeeValidate);

export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    refeshDatabase: function(state, data) {
      state.todos = data;
    }
  },
  actions: {
    getAllProductFromServer: async function({ commit }) {
      await axios({
        method: "GET",
        url: "https://todo-e5614.firebaseio.com/data.json"
      }).then(function(data) {
        let arr = [];
        for (let i in data.data) {
          arr.push(data.data[i]);
        }
        commit("refeshDatabase", arr);
      });
    }
  },
  getters: {
    getTodo: function(state) {
      return state.todos;
    }
  }
});
