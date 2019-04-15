<template>
  <div class="home">
    <h1> Example VueJS Component </h1>
    <div class="mytable"> 
      <table>
        <thead>
          <tr>
            <td> Id </td>
            <td> Name </td>
            <td> Score </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in scores">
            <td> {{row.id}}</td>
            <td> {{row.name}} </td>
            <td> {{row.score}} </td>
          </tr>
        </tbody>
      </table>
    </div>
    <HelloWorld msg="Welcome"> </HelloWorld>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data: function () {
    // Fetch the data from the endpoint and store it in our component's data
    fetch('/scores').then((scoress) => {
      return scoress.json()
    }).then((sc) => {
      this.scores = sc
    }).catch((err) => {
    })
    return {
      scores: [{id: 0, name: 'test', score: 5}]
    }
  },
  name: 'Example',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
.mytable {
  display: inline-block
}
td {
  border: 1px solid #090909;
}
</style>
