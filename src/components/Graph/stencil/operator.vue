// 知会节点
<template>
  <div class="insider">
    <img src="../../../static/images/operator_add.png" @mousedown="props.startDragToGraph('operatorNode', $event)" alt="拖动该图标增加处理人" />
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