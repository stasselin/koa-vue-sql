<template>
  <div>
    <form action="http://localhost:3001/api/books/add">
      <label for="title">Title</label>
      <input type="text" id="title" name="title" placeholder="Title" required>

      <label for="date">Date</label>
      <input type="date" id="date" name="date" placeholder="" required>

      <label for="author">Author</label>
      <input type="text" id="Author" name="author" placeholder="Author" required>

      <label for="description">Description</label>
      <input type="text" id="description" name="description" placeholder="Description">

      <label for="image">Image URL</label>
      <input type="text" id="image" name="image" placeholder="Image URL">



      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>

</script>

<style>
  input, select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  input[type=submit] {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  input[type=submit]:hover {
    background-color: #45a049;
  }

  div {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
  }
</style>
