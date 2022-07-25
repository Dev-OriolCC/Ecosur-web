<script setup>
import NavigationBar from '@/components/NavigationBar.vue' // Barra de navegacio'n
</script>

<template>
    <div class="d-flex" style="height: 100vh;">
        <NavigationBar />
        <!-- Page content wrapper-->
        <div id="page-content-wrapper" class="container mx-auto">
            <h3 class="mt-4 text-center">Especies de árboles en todas las parcelas</h3>
            <div class="mx-auto" style="height: 100px; width: 400px;">
                <!-- <BarChart /> -->
                <DoughnutChart />
            </div>
        </div>
    </div>
</template>

<script>
import BarChart from '../components/BarChart.vue';
import DoughnutChart from '../components/doughnutChart.vue';

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios';
const REST_ENDPOINT = 'https://ecosur-apirest.herokuapp.com/'; 

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    components: { 
        BarChart 
    },
    // Test
    data: () => ({
        
    }),

    mounted () {
        //this.loaded = false
    }
}
</script>