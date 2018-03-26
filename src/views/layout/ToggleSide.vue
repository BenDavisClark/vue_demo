<template>
  <div class="toggleSide" @click="toggleSide">
    <icon-svg iconClass="HAMBURGERMENU"></icon-svg>
  </div>
</template>
<script>
import IconSvg from '@/components/Icon/index'
export default {
  components: { IconSvg },
  methods: {
    toggleSide: function () {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>

<style>
  .toggleSide{
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      background: #455467;
      text-align: center;
      color:#818e9e
  }
  .thiner{
      width: 46px;
  }
</style>
