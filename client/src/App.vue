<template>
  <div id="browser">
    <div>
      <h1>2023년 아리사 아파트 101동 202호 과거 시세 및 전망</h1>
    </div>
    <BarChart />
  </div>
</template>

<script>
import BarChart from './components/BarChart'

export default {
  name: 'App',
  components: { BarChart }
}
</script>

<style>
  #browser {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>