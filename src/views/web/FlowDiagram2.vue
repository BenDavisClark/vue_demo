<template >
  <div id="DagreGraph">
    <dagre-graph :nodes="nodes" :edges="edges"></dagre-graph>
  </div>
</template>
<script>
  /**
   * 流程图
   */

  import DagreGraph from '@/components/d3/DagreGraph2'
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
            type:'db',
            dbName:'测试数据库',
            tableName:'测试表',
            value: {
              label: '测试数据库',
              operator: 'BashOperator'
            }
          },
          {
            id: 'e2',
            state: 'failed',
            type:'db',
            dbName:'测试数据库',
            tableName:'测试表',
            value: {
              label: '测试数据库1',
              operator: 'BashOperator'
            }
          },
          {
            id: 'e3',
            type:'db',
            dbName:'测试数据库',
            tableName:'测试表',
            state: 'failed',
            value: {
              label: '测试数据库2',
              operator: 'BashOperator'
            }
          },
          {
            id: 'e7',
            state: 'failed',
            type:'db',
            dbName:'测试数据库',
            tableName:'测试表',
            value: {
              label: '测试数据库7',
              operator: 'BashOperator'
            }
          },
          {
            id: 'e4',
            state: 'failed',
            type:'db',
            dbName:'测试数据库',
            tableName:'测试表',
            value: {
              label: '测试数据库3',
              operator: 'BashOperator'
            }
          },
          {
            id: 'e5',
            state: 'failed',
            type:'db',
            dbName:'测试数据库',
            tableName:'测试表',
            value: {
              label: '测试数据库4',
              operator: 'BashOperator'
            }
          },
          {
            id: 'e6',
            state: 'failed',
            type:'db',
            dbName:'测试数据库',
            tableName:'测试表',
            value: {
              label: '测试数据库5',
              operator: 'BashOperator'
            }
          },
          {
            id: 'e9',
            state: 'failed',
            type:'db',
            dbName:'测试数据库',
            tableName:'测试表',
            value: {
              label: '测试数据库6',
              operator: 'BashOperator'
            }
          }
        ]
        this.edges = [
          {
            from: 'e5',
            to: 'e6'
          },
          {
            from: 'e5',
            to: 'e9'
          },
          {
            from: 'e1',
            to: 'e2'
          },
          {
            from: 'e1',
            to: 'e7'
          },
          {
            from: 'e1',
            to: 'e3'
          },
          {
            from: 'e2',
            to: 'e4'
          },
          {
            from: 'e3',
            to: 'e5'
          },
          {
            from: 'e5',
            to: 'e6'
          }
        ]
      }
    },

  }
</script>
<style lang="scss">
  #DagreGraph{
    .no-status{
      background-color:#36c6d3;
    }
  }

</style>

<style lang='scss' scoped>
  .dagre-graph-container {
    width: 100%;
    height: 600px;
  }
</style>
