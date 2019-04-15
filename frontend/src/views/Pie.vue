<template>
  <div class="home">
    <h1> Pie Chart </h1>
    <div class="pie">
        <GenderPieChartContainer></GenderPieChartContainer>
    </div>
  </div>
</template>

<script>
  import GenderPieChartContainer from '../containers/GenderPieChartContainer';
export default {

  data: function () {
    return {}
  },
  components: {
    GenderPieChartContainer
  },
  name: 'Pie',
}
</script>

<style scoped>
.pie {
  display: inline-block
}
</style>
