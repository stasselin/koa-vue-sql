<template>
  <section class="container">
    <div>
      <books-table/>
    </div>
  </section>
</template>

<script>
import BooksTable from '~/components/BooksTable.vue'

export default {
  components: {
    BooksTable,
  }
}
</script>

<style>

</style>
