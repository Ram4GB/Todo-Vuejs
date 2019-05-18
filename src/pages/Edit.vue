<template>
  <form class="container">
    <div class="form-group">
      <label for="Title" style="text-align:center">Edit Your Todo {{$route.params.id}}</label>
      <span></span>
      <input
        name="title"
        type="text"
        class="form-control"
        placeholder="Enter title"
        v-model="user.title"
        id="title"
      >
      <input
        type="text"
        class="form-control"
        placeholder="Enter author"
        v-model="user.author"
        id="author"
      >
      <button
        @click.prevent="changeStatus()"
        v-if="user.status"
        style="margin:3px auto;width:50%;display:block"
        class="btn btn-success"
      >Done</button>
      <button
        @click.prevent="changeStatus()"
        v-else
        style="margin:3px auto;width:50%;display:block"
        class="btn btn-warning"
      >Not yet</button>
      <button
        @click.prevent="handleSubmit()"
        style="margin:3px auto;width:50%;display:block"
        class="btn btn-primary"
      >{{show}}</button>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Edit",
  data: function() {
    return {
      user: {
        title: "",
        author: "",
        time: "",
        id: "",
        status: ""
      },
      isLoading: false
    };
  },
  methods: {
    ...mapActions(["update", "getTodoItem"]),
    handleSubmit: async function() {
      this.isLoading = true;
      await this.update(this.user);
      this.isLoading = false;
      history.go(-1);
    },
    changeStatus: function() {
      this.user.status = !this.user.status;
    }
  },
  mounted: async function() {
    let temp = await this.getTodoItem(this.$route.params.id);
    this.user.title = temp.title;
    this.user.author = temp.author;
    this.user.time = temp.time;
    this.user.id = temp.id;
    this.user.status = temp.status;
  },
  computed: {
    show: function() {
      if (this.isLoading) return "Loading...";
      else return "Submit";
    }
  }
};
</script>

<style>
</style>
