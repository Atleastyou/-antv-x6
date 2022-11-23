<template>
  <div class="count">
    <img :src="imgUrl" />
    <div class="count-txt">{{item.activityName}}</div>
  </div>
</template>

<script setup>
import { inject, onMounted, computed, reactive } from 'vue'
const getNode = inject('getNode')
const item = reactive(getNode().data)
const imgUrl = computed({
  get: () => {
    switch (item.activityType) {
      case 0:
        return require('../../static/images/start.png');
      case 1:
        return require('../../static/images/stop.png');
      case 2:
        if (item.isSelect) return require('../../static/images/auditor_active.png');
        else return require('../../static/images/auditor_normal.png');
      case 3:
        if (item.isSelect) return require('../../static/images/operator_active.png');
        else return require('../../static/images/operator_normal.png');
      case 4:
        if (item.isSelect) return require('../../static/images/insider_active.png');
        else return require('../../static/images/insider_normal.png');
      default:
        break;
    }
  }
})
const node = getNode()
onMounted(() => {
  node.on('change:data', ({ current }) => {
    item.isSelect = current.isSelect
  })
})
</script>

<style lang="scss" scoped>
  .count {
    padding: 5px;
    text-align: center;
  }
</style>