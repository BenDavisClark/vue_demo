<template>

  <div style="padding:20px;">
    <el-button type="primary" @click="toggleDemo(0)">demo</el-button>
    <el-button type="primary" @click="toggleDemo(1)">demo1</el-button>
    <el-button type="primary" @click="toggleDemo(2)">demo2</el-button>
    <el-button type="primary" @click="toggleDemo(3)">demo3</el-button>
    <el-button type="primary" @click="toggleDemo(4)">demo4</el-button>
    <el-button type="primary" @click="toggleDemo(5)">demo5</el-button>
    <el-button type="primary" @click="toggleDemo(6)">demo6</el-button>
    <el-button type="primary" @click="toggleDemo(7)">demo7</el-button>
    <el-button type="primary" @click="toggleDemo(8)">demo8</el-button>
    <el-button type="primary" @click="toggleDemo(9)">demo9</el-button>
    <el-button type="primary" @click="toggleDemo(10)">demo10</el-button>
    <div style="padding:10px;">
      <jsplumb-demo v-if="showCom === 0"></jsplumb-demo>
      <jsplumb-demo1 v-if="showCom === 1"></jsplumb-demo1>
      <jsplumb-demo2 v-if="showCom === 2"></jsplumb-demo2>
      <jsplumb-demo3 v-if="showCom === 3"></jsplumb-demo3>
      <jsplumb-demo4 v-if="showCom === 4"></jsplumb-demo4>
      <jsplumb-demo5 v-if="showCom === 5"></jsplumb-demo5>
      <jsplumb-demo6 v-if="showCom === 6"></jsplumb-demo6>
      <jsplumb-demo7 v-if="showCom === 7"></jsplumb-demo7>
      <jsplumb-demo8 v-if="showCom === 8"></jsplumb-demo8>
      <jsplumb-demo9 v-if="showCom === 9"></jsplumb-demo9>
      <jsplumb-demo10 v-if="showCom === 10"></jsplumb-demo10>
    </div>
  </div>
</template>
<script>
  import jsplumbDemo from './components/jsplumbDemo.vue'
  import jsplumbDemo1 from './components/jsplumbDemo1.vue'
  import jsplumbDemo2 from './components/jsplumbDemo2.vue'
  import jsplumbDemo3 from './components/jsplumbDemo3.vue'
  import jsplumbDemo4 from './components/jsplumbDemo4.vue'
  import jsplumbDemo5 from './components/jsplumbDemo5.vue'
  import jsplumbDemo6 from './components/jsplumbDemo6.vue'
  import jsplumbDemo7 from './components/jsplumbDemo7.vue'
  import jsplumbDemo8 from './components/jsplumbDemo8.vue'
  import jsplumbDemo9 from './components/jsplumbDemo9.vue'
  import jsplumbDemo10 from './components/jsplumbDemo10.vue'

  export default {
    components:{
      jsplumbDemo,
      jsplumbDemo1,
      jsplumbDemo2,
      jsplumbDemo3,
      jsplumbDemo4,
      jsplumbDemo5,
      jsplumbDemo6,
      jsplumbDemo7,
      jsplumbDemo8,
      jsplumbDemo9,
      jsplumbDemo10
    },
    data () {
      return {
        showCom:NaN
      }
    },
    methods: {
        toggleDemo(num){
          this.showCom = num
        }
    },
    created() {
    },
    mounted () {

    }
  }
</script>

<style scoped lang="scss">

</style>
