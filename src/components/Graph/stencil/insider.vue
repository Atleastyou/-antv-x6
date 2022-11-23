// 知会节点
<template>
  <div class="insider">
    <img src="../../../static/images/insider_add.png" @mousedown="props.startDragToGraph('insiderNode', $event)" title="拖动该图标增加知会人" />
  </div>
</template>

<script setup>
  const props = defineProps({
    startDragToGraph: Function
  })
</script>

<style lang="scss" scoped>
.insider {
  margin-bottom: 20px;
}
</style>