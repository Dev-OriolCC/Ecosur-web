<template>
    <Doughnut
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
    />
</template>

<script>
import { Doughnut } from 'vue-chartjs'
// import { defineComponent, h, PropType } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'
import axios from 'axios';
const REST_ENDPOINT = 'https://ecosur-apirest.herokuapp.com/'; 

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)


export default ({
    name: 'DoughnutChart',
    components: {
        Doughnut
    },
    props: {
        chartId: {
            type: String,
            default: 'doughnut-chart'
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 400
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => {}
        },
        plugins: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            chartData: {
                labels: [],
                datasets: [{ 
                    data: [],
                    backgroundColor: [],
                }], //[ { data: [10, 20, 12] } ]
            },
            chartOptions: {
                responsive: true
            },
            dataTotal: [],
            backgroundColors: [],
            loaded: false
        }
    },
    // var randomColor = Math.floor(Math.random()*16777215).toString(16);
    async mounted() {
        // this.chartData.labels = ['Java', 'C#', 'Python', 'GO'],
        // this.chartData.datasets = [{data: [4, 2, 8, 1]}]
        try {
            let species = await axios.get(`${REST_ENDPOINT}api/specie/getSpecies`);
            let response = species.data
            response.forEach(element => {
                var randomColor = Math.floor(Math.random()*16777215).toString(16);
                this.chartData.labels.push(element.name);
                this.dataTotal.push(element.total);
                this.backgroundColors.push("#"+randomColor)
            });
            this.chartData.datasets = [{ data: this.dataTotal, backgroundColor: this.backgroundColors }];
            this.loaded = true
        } catch (e) {
            console.error(e)
        }
    }
})
</script>