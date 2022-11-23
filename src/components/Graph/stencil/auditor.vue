// 审核节点
<template>
  <div class="auditor-stencil">
    <img src="../../../static/images/auditor_add.png" @mousedown="props.startDragToGraph('auditorNode', $event)" alt="拖动该图标增加处理人" />
  </div>
</template>

<script setup>
  const props = defineProps({
    startDragToGraph: Function
  })
</script>

<style lang="scss" scoped>
.auditor-stencil {
  margin-bottom: 20px;
}
</style>