<template>
  <div class="project">
    <div class="row bg-white has-shadow">
      <div class="left-col col-lg-6 d-flex align-items-center justify-content-between">
        <div class="project-title d-flex align-items-center">
          <div class="image has-shadow">
            <vue-load-image>
              <img slot="preloader" src="gifs/Wedges-3s-200px.gif" class="img-fluid">
              <div slot="error">error message</div>
              <img slot="image" src="https://picsum.photos/200" alt="..." class="img-fluid">
            </vue-load-image>
          </div>
          <div class="text">
            <h3 class="h4">{{todo.title}}</h3>
            <small>{{todo.author}}</small>
          </div>
        </div>
        <div class="project-date"></div>
      </div>
      <div class="right-col col-lg-6 d-flex align-items-center">
        <div class="time">
          <span class="hidden-sm-down">{{todo.time}}</span>
          <div class="row">
            <div class="col-4">
              <button @click="deleteTodoItem(todo.id)" class="btn btn-success">Delete</button>
            </div>
            <div class="col-4">
              <router-link :to="{name:'edit',params:{id:todo.id}}">
                <button class="btn btn-danger">Edit</button>
              </router-link>
            </div>
            <div class="col-4">
              <button @click="updateStatus(todo)" v-if="todo.status" class="btn btn-primary">Done</button>
              <button @click="updateStatus(todo)" v-else class="btn btn-warning">Not</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueLoadImage from "vue-load-image";
import { mapActions } from "vuex";
export default {
  name: "todo-item",
  props: ["todo"],
  methods: {},
  mounted: function() {},
  components: {
    "vue-load-image": VueLoadImage
  },
  methods: {
    ...mapActions(["delete", "getAllProductFromServer", "updateStatusStore"]),
    deleteTodoItem: async function(id) {
      await this.delete(id);
    },
    updateStatus: async function(data) {
      console.log(data);
      await this.updateStatusStore(data);
    }
  }
};
</script>

<style>
</style>
