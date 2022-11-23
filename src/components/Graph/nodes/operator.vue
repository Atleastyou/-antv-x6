// 知会节点
<template>
  <div class="operator-node">
    <img :src="imgUrl" />
    <div class="auditor-label">处理人</div>
  </div>
</template>

<script setup>
  import { inject, reactive, computed } from 'vue'
  const getNode = inject('getNode')
  const item = reactive(getNode().data)
  const imgUrl = computed({
    get: () => {
      if (item.isSelect) return require('../../../static/images/operator_active.png');
      else return require('../../../static/images/operator_normal.png');
    }
  })
  const node = getNode()
  node.on('change:data', ({ current }) => {
    item.isSelect = current.isSelect
  })
</script>

<style lang="scss" scoped>
.operator-node {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>