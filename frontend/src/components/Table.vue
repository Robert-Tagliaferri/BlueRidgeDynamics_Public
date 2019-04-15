<template>
    <div>
        <span>Table</span>
        <button v-on:click="clickedRefresh">refresh</button>
        <table align= "center">
            <thead>
              <tr>
               <td> First Name </td>
               <td> Last Name </td>
               <td> Gender </td>
               <td> Age </td>
                </tr>
            </thead>
            <tbody>
             <tr v-for="row in rows">
                <td> {{row.first_name}}</td>
                <td> {{row.last_name}} </td>
                <td> {{row.gender}} </td>
                <td> {{row.age}} </td>
            </tr>
            </tbody>
      </table>
    </div>
</template>
<script>
    export default {
      props: {
        rows:{
          type:Array,
          default: null
        },
      },
      data: function(){
        return{}
      },
      methods: {
        clickedRefresh() {
          this.$emit('refresh-table');
       }
      },
      name: 'Table',
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
