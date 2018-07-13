<template>
  <div>
    <ul class="nav-ul">
      <li v-bind:key="elem.index" v-for="elem in navElements">
        <a :href="'' + elem.url">{{elem.title}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        navElements: [{
          title: "Список книг",
          url: "/"
        },
          {
            title: "Добавить книгу",
            url: "/addBook"
          }]
      }
    }
  }
</script>


<style>
  .nav-ul {
    display: flex;
    list-style: none;
    box-sizing: border-box;

  }

  .nav-ul li {
    margin: 1em 5em;
    font-size: 1em;
  }


</style>
