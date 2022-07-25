<template>
    <Bar
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
        v-if="loaded"
    />
    <div v-else>
        Loading.........
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios';

const REST_ENDPOINT = 'https://ecosur-apirest.herokuapp.com/'; 
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        chartId: {
            type: String,
            default: 'bar-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
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
        },
        // Testing
        
    },
    data() {
        return {
            chartData: {
                labels: [ ],
                datasets: [{ data: [] }], //[ { data: [10, 20, 12] } ]
            },
            chartOptions: {
                responsive: true
            },
            dataTotal: [],
            loaded: false
        }
    },

    async mounted() {
        //this.chartData.labels = [ 'January', 'February', 'March', 'April', 'May' ];
        //this.chartData.datasets = [{data: [10, 20, 30, 20, 1]} ]

        try {
            let species = await axios.get(`${REST_ENDPOINT}api/specie/getSpecies`);
            let response = species.data
            response.forEach(element => {
                this.chartData.labels.push(element.name);
                this.dataTotal.push(element.total);
            });
            this.chartData.datasets = [{ data: this.dataTotal }];
            this.loaded = true
        } catch (e) {
            console.error(e)
        }
    }

}
</script>