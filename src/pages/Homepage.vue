<template>
  <div class="container">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Todo App</h1>
        <p class="lead">Hi there! This's the app to write your work that you need to do</p>
        <p class="lead">1. You can't write down anything if you want</p>
        <p class="lead">2. Please don't delete the another user'post</p>
        <p class="lead">3. You can edit,delete and done your work</p>
      </div>
    </div>
    <section class="projects no-padding-top">
      <form>
        <div class="form-group">
          <label for="Title" style="text-align:center">Hi User!!</label>
          <span>{{errors.first('title')}}</span>
          <input
            name="title"
            type="text"
            class="form-control"
            placeholder="Enter title. Example: Today I have to go to school"
            v-model="user.title"
            id="title"
          >
          <input
            type="text"
            class="form-control"
            placeholder="Enter author. Example: Your name or Your nick name"
            v-model="user.author"
            id="author"
          >
          <button
            @click.prevent="handleSubmit()"
            style="margin:3px auto;width:50%;display:block"
            class="btn btn-primary"
          >Submit</button>
        </div>
      </form>
      <input
        placeholder="Search post or author...."
        class="form-control"
        type="text"
        v-model="search"
      >
      <div class="container" style="height:500px;overflow:scroll">
        <template v-if="isLoading">
          <div v-if="true">
            <img style="display:block;margin:auto" src="gifs/Ripple-1.2s-200px.gif">
          </div>
        </template>
        <template v-else>
          <div class="row">
            <div
              @click="sortTitle=!sortTitle"
              class="col-6"
              style="text-align:center;font-size:1.2em;cursor:pointer;"
            >Title</div>
            <div
              @click="sortTime=!sortTime"
              class="col-6"
              style="text-align:center;font-size:1.2em;cursor:pointer"
            >Time</div>
          </div>
          <transition-group
            enter-active-class="animated bounceInLeft"
            leave-active-class="animated bounceOutRight"
          >
            <TodoItem :key="todo.id" v-for="todo in todoFilter" :todo="todo"/>
          </transition-group>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import TodoItem from "../components/TodoItem";
import fastsort from "fast-sort";
import { mapGetters, mapActions } from "vuex";
import url from "../constants/Configs.js";
export default {
  name: "Homepage",
  components: {
    TodoItem
  },
  data: function() {
    return {
      user: {
        title: "",
        author: "",
        time: null
      },
      isLoading: true,
      search: "",
      todos: [],
      sortTitle: true,
      sortTime: false
    };
  },
  computed: {
    todoFilter: function() {
      if (this.search !== "")
        this.todos = this.$store.state.todos.filter(todo => {
          let search = this.change_alias(this.search);
          let title = this.change_alias(todo.title);
          let author = this.change_alias(todo.author);
          return (
            title.toLowerCase().match(search.toLowerCase()) ||
            author.toLowerCase().match(search.toLowerCase())
          );
        });
      else {
        this.todos = this.$store.state.todos;
      }
      // console.log(this.sortTitle);
      if (this.sortTitle === true) {
        fastsort(this.todos).asc(u => u.title);
      }
      if (this.sortTitle === false) {
        fastsort(this.todos).desc(u => u.title);
      }
      if (this.sortTime === true) {
        fastsort(this.todos).asc(u => u.time);
      }
      if (this.sortTime === false) {
        fastsort(this.todos).desc(u => u.time);
      }
      return this.todos;
    }
  },
  methods: {
    change_alias: function(alias) {
      var str = alias;
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        " "
      );
      str = str.replace(/ + /g, " ");
      str = str.trim();
      return str;
    },
    handleSubmit: function() {
      if (this.checkEmpty()) {
        let time = new Date();
        this.user.time = time;
        this.$http
          .post(`${url}/todos`, this.user)
          .then(async function(data) {
            // console.log(data);
            if (data.status === 201 && data.ok === true) {
              await this.getAllProductFromServer();
              this.empty();
            }
          })
          .catch(function(err) {
            alert(err);
          });
      }
    },
    ...mapActions(["getAllProductFromServer"]),
    empty: function() {
      this.user.title = "";
      this.user.author = "";
      this.user.time = null;
    },
    checkEmpty: function() {
      if (this.user.title === "") {
        alert("Mời nhập tựa đề");
        document.getElementById("title").focus();
        return false;
      } else if (this.user.author === "") {
        alert("Mời nhập tên của bạn");
        document.getElementById("author").focus();
        return false;
      }
      return true;
    }
  },
  mounted: async function() {
    this.isLoading = true;
    await this.getAllProductFromServer();
    this.isLoading = false;
  }
};
</script>

<style>
body {
  margin-top: 20px;
  background: #eee;
}

.project .row {
  margin: 0;
  padding: 15px 0;
  margin-bottom: 15px;
}

.project div[class*="col-"] {
  border-right: 1px solid #eee;
}

.project .text h3 {
  margin-bottom: 0;
  color: #555;
}

.project .text small {
  color: #aaa;
  font-size: 0.75em;
}

.project .project-date span {
  font-size: 0.9em;
  color: #999;
}

.project .image {
  max-width: 50px;
  min-width: 50px;
  height: 50px;
  margin-right: 15px;
}

.project .time,
.project .comments,
.project .project-progress {
  color: #999;
  font-size: 0.9em;
  margin-right: 20px;
}

.project .time i,
.project .comments i,
.project .project-progress i {
  margin-right: 5px;
}

.project .project-progress {
  width: 200px;
}

.project .project-progress .progress {
  height: 4px;
}

.project .card {
  margin-bottom: 0;
}

@media (max-width: 991px) {
  .project .right-col {
    margin-top: 20px;
    margin-left: 65px;
  }
  .project .project-progress {
    width: 150px;
  }
}

@media (max-width: 480px) {
  .project .project-progress {
    display: none;
  }
}
.has-shadow {
  -webkit-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1),
    -1px 0 2px rgba(0, 0, 0, 0.05);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1), -1px 0 2px rgba(0, 0, 0, 0.05);
}
.bg-white {
  background: #fff !important;
}

.bg-red {
  background: #ff7676 !important;
  color: #fff;
}

.bg-red:hover {
  color: #fff;
}

.bg-blue {
  background: #85b4f2 !important;
  color: #fff;
}

.bg-blue:hover {
  color: #fff;
}

.bg-yellow {
  background: #eef157 !important;
  color: #fff;
}

.bg-yellow:hover {
  color: #fff;
}

.bg-green {
  background: #54e69d !important;
  color: #fff;
}

.bg-green:hover {
  color: #fff;
}

.bg-orange {
  background: #ffc36d !important;
  color: #fff;
}

.bg-orange:hover {
  color: #fff;
}

.bg-violet {
  background: #796aee !important;
  color: #fff;
}

.bg-violet:hover {
  color: #fff;
}

.bg-gray {
  background: #ced4da !important;
}
</style>
