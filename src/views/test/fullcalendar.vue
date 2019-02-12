<template>
  <div>
    <p>
      Here is the demo of vue-fullcalendar, no jquery fullcalendar.js required!
    </p>
    <full-calendar class="test-fc" :events="fcEvents"
                   first-day='1' lang="zh"
                   @changeMonth="changeMonth"
                   @eventClick="eventClick"
                   @dayClick="dayClick"
                   @moreClick="moreClick">
      <template slot="fc-event-card" slot-scope="p">
        <p><i class="fa">sadfsd</i> {{ p.event.title }} test</p>
      </template>
    </full-calendar>
  </div>
</template>

<script>
  let demoEvents = [
    {
      title    : '34',
      start    : '2018-02-25'
    },
    {
      title : '45',
      start : '2018-02-26'
    },
    {
      title : '20',
      start : '2018-02-27',
      end : '2018-02-27'
    },
    {
      title : '4',
      start : '2018-02-28',
      end : '2018-02-28'
    }
  ];
  export default {
    data () {
      return {
        name:'Sunny!',
        fcEvents : demoEvents
      }
    },
    methods : {
      'changeMonth' (start, end, current) {
        alert('月改变事件')
        console.log('changeMonth', start.format(), end.format(), current.format())
      },
      'eventClick' (event, jsEvent, pos) {
        alert('数据点击事件')
        console.log('eventClick', event, jsEvent, pos)
      },
      'dayClick' (day, jsEvent) {
        alert('日点击事件')
        console.log('dayClick', day, jsEvent)
      },
      'moreClick' (day, events, jsEvent) {
        alert('更多点击事件')
        console.log('moreCLick', day, events, jsEvent)
      }
    },
    components : {
      'full-calendar': require('vue-fullcalendar')
    }
  }

</script>

<style  rel="stylesheet/scss" lang="scss">

</style>
