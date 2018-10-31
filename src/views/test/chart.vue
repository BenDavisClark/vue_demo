<template>
  <div style="padding: 20px;">
    <pie-chart></pie-chart>
    <line-chart :x-data="xData" :sData="sData"></line-chart>
    <bar-chart :x-data="xData" :sData="sData"></bar-chart>
    <scatter-chart></scatter-chart>
  </div>
</template>
<script>
import pieChart from '@/components/Chart/pieChart'
import lineChart from '@/components/Chart/lineChart'
import barChart from '@/components/Chart/barChart'
import scatterChart from '@/components/Chart/scatterChart'
export default {
  components: { lineChart, barChart,scatterChart,pieChart },
  data () {
    return {
      xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      sData: [820, 932, 901, 934, 1290, 1330, 1320],
      sData2: [1320,820, 932, 901, 934, 1290, 1330]
    }
  }
}
</script>
