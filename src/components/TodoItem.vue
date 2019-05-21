<template>
  <div class="project">
    <div class="row bg-white has-shadow">
      <div class="col-lg-6 col-sm-12">
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
      <div class="col-lg-6 col-sm-12">
        <div class="time col-sm-12" style="margin:10px 0px">
          <span style="margin:10px 0px;color:#111" class="hidden-sm-down">{{todo.time}}</span>
        </div>
        <div>
          <div class="col-sm-12">
            <button
              @click="deleteTodoItem(todo.id)"
              class="btn btn-success col-sm-12"
            >{{isDeleting?"Wait for processing...":"Delete"}}</button>
          </div>
          <div class="col-sm-12">
            <router-link :to="{name:'edit',params:{id:todo.id}}">
              <button class="btn btn-danger col-sm-12">Edit</button>
            </router-link>
          </div>
          <div class="col-sm-12">
            <button
              @click="updateStatus(todo)"
              v-if="todo.status"
              class="btn btn-primary col-sm-12"
            >Done</button>
            <button @click="updateStatus(todo)" v-else class="btn btn-warning col-sm-12">Not yet</button>
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
  data: function() {
    return {
      isDeleting: false
    };
  },
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
      this.isDeleting = true;
      await this.delete(id);
      this.isDeleting = false;
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
