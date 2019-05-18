import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VeeValidate from "vee-validate";
import url from "./constants/Configs.js";
Vue.use(Vuex);
Vue.use(VeeValidate);
const findIndex = function(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == id) return i;
  }
  return -1;
};

export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    refeshDatabase: function(state, data) {
      state.todos = data;
    },
    updateStatus: function(state, data) {
      let index = findIndex(state.todos, data.id);
      let arr = [
        ...state.todos.slice(0, index),
        data,
        ...state.todos.slice(index + 1)
      ];
      if (index != -1) {
        state.todos = arr;
      }
      console.log(index);
    },
    delete: function(state, id) {
      let index = findIndex(state.todos, id);
      if (index != -1) {
        let arr = [
          ...state.todos.slice(0, index),
          ...state.todos.slice(index + 1)
        ];
        state.todos = arr;
      }
    },
    update: function(state, data) {
      let index = findIndex(state.todos, data.id);
      let arr = [
        ...state.todos.slice(0, index),
        data,
        ...state.todos.slice(index + 1)
      ];
      state.todos = arr;
    }
  },
  actions: {
    getAllProductFromServer: async function({ commit }) {
      await axios({
        method: "GET",
        url: `${url}/todos`
      }).then(function(data) {
        let arr = [];
        arr = data.data;
        commit("refeshDatabase", arr);
      });
    },
    delete: async function({ commit }, id) {
      await axios({
        method: "DELETE",
        url: `${url}/todos/${id}`
      }).then(function(data) {
        if (data.status === 200) {
          commit("delete", id);
        }
      });
    },
    updateStatusStore: async function({ commit }, data) {
      let temp = {
        ...data,
        status: !data.status
      };
      await axios({
        method: "PUT",
        url: `${url}/todos/${data.id}`,
        data: temp
      }).then(function(res) {
        if (res.status === 200) commit("updateStatus", temp);
      });
    },
    update: async function({ commit }, data) {
      await axios({
        method: "PUT",
        url: `${url}/todos/${data.id}`,
        data
      }).then(function(res) {
        if (res.status === 200) {
          alert("Edit success");
          commit("update", data);
        }
      });
    },
    getTodoItem: async function({ commit }, id) {
      let result = [];
      await axios({
        method: "GET",
        url: `${url}/todos/${id}`
      }).then(function(res) {
        if (res.status === 200) result = res.data;
      });
      return result;
    }
  },
  getters: {
    getTodo: function(state) {
      return state.todos;
    }
  }
});
