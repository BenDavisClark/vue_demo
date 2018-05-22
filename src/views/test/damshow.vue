<template>
  <div class="dam-container">
    <div class="dam-left">
      <el-tree 
        :data="data" 
        :props="defaultProps"
        node-key="id" 
        @node-click="handleNodeClick">
      </el-tree>
    </div>
    <div class="dam-right">
      <pic-show :pointarr="points"></pic-show>
    </div>
  </div>
</template>
<script>
import PicShow from '@/components/PicShow'
export default {
  components: { PicShow },
  data () {
    return {
      data: [{
          id: '001',
          label: '坝基变形',
          children: [{
            id: '011',
            label: 'M5·15·Z1·C6',
          },{
            id: '012',
            label: 'M6·15·Z1·C1',
          },{
            id: '013',
            label: 'M7·15·Z1·C4',
          },{
            id: '014',
            label: 'M8·15·Z1·C9',
          }]
        }, {
          id: '002',
          label: '坝体坝基渗透压力',
          children: [{
            id: '021',
            label: 'J5·15·Z1·C1',
          },{
            id: '022',
            label: 'P5·15·Z9·C1',
          },{
            id: '023',
            label: 'L5·15·Z5·C1',
          },{
            id: '024',
            label: 'A5·15·Z7·C1',
          }]
        }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      points: [
        {
          id: '011',
          x: 400,
          y:450,
          display:'none'
        },
        {
          id: '012',
          x: 200,
          y:250,
          display:'none'
        },
        {
          id: '013',
          x: 350,
          y:150,
          display:'none'
        },
        {
          id: '014',
          x: 700,
          y: 200,
          display:'none'
        },
        {
          id: '021',
          x: 632,
          y:493,
          display:'none'
        },
        {
          id: '022',
          x: 333,
          y:430,
          display:'none'
        },
        {
          id: '023',
          x: 999,
          y:263,
          display:'none'
        },
        {
          id: '024',
          x: 589,
          y:367,
          display:'none'
        }
      ]
    }
  },
  methods: {
      handleNodeClick(data) {
        var id = data.id
        var index = _.findIndex(this.points,['id',id])
        if(index >=0) {
          this.points.forEach(val => {
            val.display = 'none'
          })
          this.points[index].display = 'block'
        }
      }
    }
    
}
</script>
<style lang="scss" scoped>
.dam-container{
  overflow: hidden;
}
.dam-left{
  float: left;
  width: 180px;
  border-right: 1px solid #e9e9e9;
}
.dam-right{
  margin-left: 181px;
}
</style>
