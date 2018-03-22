<template>
  <div>
    <line-chart :x-data="xData" :sData="sData"></line-chart>
    <bar-chart :x-data="xData" :sData="sData" id="barchart"></bar-chart>
  </div>
</template>
<script>
import lineChart from '@/components/Chart/lineChart'
import barChart from '@/components/Chart/barChart'
export default {
  components : { lineChart, barChart },
  data () {
    return {
      xData:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      sData: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  }
}
</script>

