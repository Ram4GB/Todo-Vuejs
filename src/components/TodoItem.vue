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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueLoadImage from "vue-load-image";
export default {
  name: "todo-item",
  props: ["todo"],
  methods: {},
  mounted: function() {},
  components: {
    "vue-load-image": VueLoadImage
  }
};
</script>

<style>
</style>
