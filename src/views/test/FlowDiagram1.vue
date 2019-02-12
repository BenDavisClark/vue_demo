<template >
  <div id="DagreGraph">
    <dagre-graph :nodes="nodes" :edges="edges"></dagre-graph>
  </div>
</template>
<script>
  /**
   * 流程图
   */

  import DagreGraph from '@/components/d3/DagreGraph'
  export default {
    name: 'FlowDiagram',
    components: {
      DagreGraph
    },
    data() {
      return {
        nodes: [],
        edges: []
      }
    },
    created() {
      this.init()
    },
    methods: {
      init () {
        this.nodes = [
          {
            id: 'e1',
            state: '',
            value: {
              label: '分支',
              operator: 'BashOperator'
            }
          },
          {
            id: 'e2',
            state: 'failed',
            value: {
              label: '分支一',
              operator: 'BashOperator'
            }
          },
          {
            id: 'e3',
            state: 'failed',
            value: {
              label: '分支二',
              operator: 'BashOperator'
            }
          },
          {
            id: 'e4',
            state: '',
            value: {
              label: '分支三',
              operator: 'BashOperator'
            }
          }
        ]
        this.edges = [
          {
            from: 'e1',
            to: 'e2',
            label:'映射'
          },
          {
            from: 'e1',
            to: 'e3',
            label:'拷贝'
          },
          {
            from: 'e4',
            to: 'e1',
            label:'调度'
          }
        ]
      }
    },

  }
</script>

<style lang='scss' scoped>
  .dagre-graph-container {
    width: 100%;
    height: 600px;
  }
</style>
