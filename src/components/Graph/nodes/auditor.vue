// 审核节点
<template>
  <el-dropdown class="auditor-node" trigger="contextmenu">
    <div class="auditor-node">
      <img :src="imgUrl" />
      <div class="auditor-label">审核人</div>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="deleteNode">删除</el-dropdown-item>
        <el-dropdown-item>属性</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { inject, reactive, computed } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
const getNode = inject('getNode')
const getGraph = inject('getGraph')
const item = reactive(getNode().data)
const imgUrl = computed({
  get: () => {
    if (item.isSelect) return require('../../../static/images/auditor_active.png');
    else return require('../../../static/images/auditor_normal.png');
  }
})
const node = getNode()
const graph = getGraph()
node.on('change:data', ({ current }) => {
  item.isSelect = current.isSelect
})
function deleteNode () {
  let source = []
  let target = []
  node.model.collection.cells.map(item => {
    if (item.isEdge()) {
      if (node.id === item.target.cell) {
        source.push(item.source.cell)
      }
      if (node.id === item.source.cell) {
        target.push(item.target.cell)
      }
    }
  })
  source.map(item => {
    target.map(row => {
      graph.addEdge({
      source: item,
      target: row,
      attrs: {
        line: {
          stroke: '#1890ff',
          // strokeDasharray: view.targetView.cell.data.type === 'insiderNode' ? 10 : 0,
          targetMarker: 'classic',
        }
      }
    })
    })
  })
  graph.removeNode(node)
  // console.log(source, target)
}
</script>

<style lang="scss" scoped>
.auditor-node {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>