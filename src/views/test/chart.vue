<template>
  <div>
    <line-chart :x-data="xData" :sData="sData"></line-chart>
    <bar-chart :x-data="xData" :sData="sData" id="barchart1"></bar-chart>
    <bar-chart :x-data="xData" :sData="sData2" id="barchart2"></bar-chart>
  </div>
</template>
<script>
import lineChart from '@/components/Chart/lineChart'
import barChart from '@/components/Chart/barChart'
export default {
  components: { lineChart, barChart },
  data () {
    return {
      xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      sData: [820, 932, 901, 934, 1290, 1330, 1320],
      sData2: [1320,820, 932, 901, 934, 1290, 1330]
    }
  }
}
</script>
