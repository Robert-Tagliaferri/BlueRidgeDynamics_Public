<template>
  <div class="home">
    <h1> Histogram </h1>
  		<HistForm v-on:submit-hist-form ="updateBins"></HistForm>
		<HistogramChart v-if="loaded" :chartData="chartData" :options="options"></HistogramChart>
  </div>
</template>
<script>
	import HistogramChart from '../components/HistogramChart';
	import HistForm from '../components/HistForm';

    export default{
        name: 'AgeHistogramChartContainer',
        components:{
        	HistogramChart,
        	HistForm
        },
        data(){
        	return{
        		loaded: false,
        		chartData: null,
        		options:{
        			scales:{
        				yAxes:[{
        					ticks:{
        					beginAtZero:true
        					},
        					gridlines:{desplay:true}
        				}],
        				xAxes:[{
        					gridLines:{
        						display:false
        					}
        				}]
        			},
        			legend:{
        				display:true
        			},
        			responsive:true,
        			maintainAspectRatio: false
        		}

        	}

        },
        mounted(){
        	let scope = this;
        	this.loaded = false;
        	fetch('http://localhost:3000/countAge').then(res =>{
        		return res.json()
        	}).then(data => {
        		scope.loaded = true;
        		scope.chartData = data;
        	}).catch(err =>{
        		console.log(err);
        	});
        },
        methods: {
        	updateBins: function(histF){
        		let scope= this;
        		scope.loaded=false;
        		//validate that form is filled
        		if(histF.bucketNumber >0){
        			fetch('http://localhost:3000/countAge/'+histF.bucketNumber).then(res =>{
        				return res.json()
        			}).then(data=> {
        				scope.chartData = data;
        				scope.loaded=true;
        			}).catch(err =>{
        				console.log(err);
        			})
        		}
        	}
        }

    }
</script>