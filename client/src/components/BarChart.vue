<template>
    <div class="container">
      <Bar v-if="loaded" :data="chartData" />
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import axios from 'axios'; 
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Bar },
    data: () => ({
      loaded: false,
      chartData: null
    }),
    async mounted () {
      this.loaded = false
  
      try {
        axios.get('http://localhost:3001/aresa-api/historical_price?aptId=1&year=2023&monthStart=1&monthEnd=3')
        .then(response => {
            const prices = response.data.data; // Parsed JSON data
            console.log(prices);
            this.chartData = {
                
                datasets: [ { data: prices } ]
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        this.loaded = true
      } catch (e) {
        console.error(e)
      }
    }
  }
  </script>