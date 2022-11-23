<template>
  <div class="dropdown" v-click-outside="onClickOutside">dropdown</div>
</template>

<script setup>
  import { inject } from 'vue'
  import { ClickOutside as vClickOutside } from 'element-plus'
  const getNode = inject('getNode')
  const getGraph = inject('getGraph')
  const node = getNode()
  const graph = getGraph()
  const onClickOutside = () => {
    graph.removeNode(node)
  }
</script>

<style lang="scss" scoped>
.dropdown {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 12px 0;
  background: #fff;
}
</style>