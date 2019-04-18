<template>
  <div>
    <div v-if="isVisible" class="poperMenu" :style="'left:' + position.left + ';top:' + position.top" @mouseleave="close">
      <el-tree :data="data" @node-click="handleNodeClick"></el-tree>
    </div>
  </div>
</template>

<script>
  import channelOfNodeToMenu from './events';

  export default {
    name: 'PoperMenu',
    data() {
      return {
        data: [{
          label: '删除',
          type: 'delete',
        }],
        isVisible: false,
        position: {
          top: 0,
          left: 0,
        },
      };
    },
    props: ['selectedNode'],
    inject: ['deleteNode'],
    methods: {
      initData(node) {
      },
      receiveData() {
        channelOfNodeToMenu.$on('showMenu', (isShow, position) => {
          this.isVisible = isShow;
          position.top = `${parseInt(position.top, 0) + 25}px`;
          position.left = `${parseInt(position.left, 0) + 25}px`;
          this.position = position;
          // 先写死
          // this.position.top += 50;
          // this.position.left += 50;
        });
      },
      handleNodeClick(data) {
        if (data.type === 'delete') {
          this.deleteNode();
        }
      },
      close() {
        this.isVisible = false;
      },
    },
    mounted() {
      this.receiveData();
    },
  };
</script>

<style scoped>
  .poperMenu{
    position: relative;
    width: 100px;
    height: 200px;
    z-index: 10000;
  }

</style>
