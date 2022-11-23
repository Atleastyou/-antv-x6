<template>
<div class="graph">
  <div class="graph-container">
    <div class="stencil">
      <stencilAuditor :startDragToGraph="startDragToGraph"></stencilAuditor>
      <stencilOperator :startDragToGraph="startDragToGraph"></stencilOperator>
      <stencilInsider :startDragToGraph="startDragToGraph"></stencilInsider>
    </div>
    <div id="container"></div>
  </div>
  <div class="button" @click="save">保存</div>
</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useInitGraph, useAddonStore, useSetData } from '@/stores'
import stencilAuditor from '@/components/Graph/stencil/auditor'
import stencilOperator from '@/components/Graph/stencil/operator'
import stencilInsider from '@/components/Graph/stencil/insider'
import dropdown from '@/components/Graph/nodes/dropdown'
const initGraph = useInitGraph()
const addonStore = useAddonStore()
const setData = useSetData()
// const graphStore = useGraphStore()
const startDragToGraph = (type, e) => {
  addonStore.startDragToGraph(type, e)
}

// const save = () => {
//   const data = graphStore.graph.toJSON()
//   console.log(data)
// }

onMounted(async () => {
  initGraph.initGraph('container')
  // await stencilStore.initStencil()
  // graphStore.initGraph('container')
  // graphStore.initNodes()
  // graphStore.initLinks()
  // // stencilStore.initStencil('stencil')
})
</script>

<style lang="scss" scoped>
  .graph {
    width: 100%;
    height: 100%;
  }
  .graph-container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%
  }
  .stencil {
    width: 150px;
    height: 100%;
    padding: 20px 0;
    position: relative;
    text-align: center;
    background-color: rgb(211, 211, 211);
  }
  #container {
    flex: 1;
    height: 100%;
  }
</style>