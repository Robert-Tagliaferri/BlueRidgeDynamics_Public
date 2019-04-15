<template>
    <PieChart v-if="loaded" :chartData="chartData" :options="options"></PieChart>
</template>
<script>
    import PieChart from '../components/PieChart';

    export default {
        name: 'GenderPieChartContainer',
        components: {
            PieChart
        },
        data() {
            return {
                loaded: false,
                chartData: null,
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        mounted() {
            let scope = this;
            this.loaded = false;
            fetch('http://localhost:3000/countGender').then(res => {
                return res.json()
            }).then(data => {
                scope.loaded = true;
                scope.chartData = data;
            }).catch(err => {
                console.log(err);
            });
        }
    }
</script>