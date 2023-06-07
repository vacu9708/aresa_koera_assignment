<template v-if="loaded">
    <div style="width: 1000px;"><canvas  id="prices"></canvas></div>
  </template>
  
  <script>
  import axios from 'axios';
  import Chart from 'chart.js/auto'
  
  export default {
    name: 'BarChart',
    components: {},
    data: () => ({
      loaded: false,
    }),
    async mounted () {
        this.loaded = false
        let historical_monthStart = 1
        const historical_prices = (await axios.get(`http://localhost:3001/aresa-api/historical_price?aptId=1&year=2023&monthStart=${historical_monthStart}&monthEnd=5`)).data
        let future_monthStart = 6
        const future_prices = (await axios.get(`http://localhost:3001/aresa-api/future_price?aptId=1&year=2023&monthStart=${future_monthStart}&monthEnd=12`)).data
        new Chart(
            document.getElementById('prices'),
            {
                type: 'line',
                data: {
                    labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
                    datasets: [
                        {
                            label: ['Historical price'],
                            data: [...new Array(historical_monthStart - 1), ...historical_prices, ...[(future_prices[0])]],
                            borderColor: 'blue'
                        },
                        {
                            label: 'Future price',
                            data: [...new Array(future_monthStart - 1), ...future_prices],
                            borderColor: 'green'
                        }
                    ],
                    
                }
            }
        );

        this.loaded = true
    }
  }
  </script>