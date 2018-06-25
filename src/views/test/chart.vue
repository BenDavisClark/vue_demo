<template>
  <div>
    <line-chart :x-data="xData" :sData="sData"></line-chart>
    <scatter-chart></scatter-chart>
  </div>
</template>
<script>
import lineChart from '@/components/Chart/lineChart'
import barChart from '@/components/Chart/barChart'
import scatterChart from '@/components/Chart/scatterChart'
export default {
  components: { lineChart, barChart,scatterChart },
  data () {
    return {
      xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      sData: [820, 932, 901, 934, 1290, 1330, 1320],
      sData2: [1320,820, 932, 901, 934, 1290, 1330]
    }
  }
}
</script>
