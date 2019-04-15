<template>
    <div class="histogram">
        <AgeHistogramChartContainer></AgeHistogramChartContainer>
    </div>
</template>

<script>
  import AgeHistogramChartContainer from '../containers/AgeHistogramChartContainer';
export default {

  data: function () {
    return {}
  },
  components:{
    AgeHistogramChartContainer
  },
  name: 'Histogram',
}
</script>

<style scoped>
.histogram {
  display: inline-block
}
</style>
