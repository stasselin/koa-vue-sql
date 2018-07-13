<template>
  <div class="VueToNuxtLogo">
    <div>
      <input type="text" v-model="searchField" id="search" name="search" placeholder="Search" required>
      <button @click="search">Search</button>
    </div>
    <table>
      <thead>
      <tr>
        <th>Title</th>
        <th>Date</th>
        <th>Author</th>
        <th>Description</th>
        <th>Image</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in table" :key="row.id">
        <td>{{row.title}}</td>
        <td>{{row.date}}</td>
        <td>{{row.author}}</td>
        <td>{{row.description}}</td>
        <td>{{row.image}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        table: [],
        page: 0,
        bottom: false,
        searchField: ''
      }
    },
    watch: {
      bottom(bottom) {
        if (bottom) {
          this.addItems()
        }
      }
    },
    methods: {
      bottomVisible() {
        const scrollY = window.scrollY;
        const visible = document.documentElement.clientHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const bottomOfPage = visible + scrollY >= pageHeight;
        return bottomOfPage || pageHeight < visible
      },
      async addItems() {
        this.page++;
        console.log('Getting data');
        let data = await axios(`http://localhost:3001/api/books/all?page=${this.page}`);
        this.table.push(...data.data);
    },
      async search() {
        console.log('Getting data');
        let data = await axios(`http://localhost:3001/api/books/search?title=${this.searchField}`);
        this.table = [];
        this.table.push(...data.data);
      }
    },
    mounted: async function f() {
      window.addEventListener('scroll', () => {
        this.bottom = this.bottomVisible()
      });
      console.log('Getting data');
      let data = await axios(`http://localhost:3001/api/books/all?page=${this.page}`);
      this.table.push(...data.data);
    }

  }
</script>

<style>
  table {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  table td, table th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  table tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  table tr:hover {
    background-color: #ddd;
  }

  table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
  }

</style>
