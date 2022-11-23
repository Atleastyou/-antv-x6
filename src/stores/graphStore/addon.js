import { defineStore } from "pinia";
import { Addon } from "@antv/x6";
import useNodeStore from './nodes'
import useInitGraph from './init'

export default defineStore('addonStore', {
  state: () => ({}),
  actions: {
    startDragToGraph (type, e) {
      const nodeStore = useNodeStore()
      let node = null
      switch(type) {
        case 'auditorNode':
          node = nodeStore.createAuditorNode()
          break
        case 'operatorNode':
          node = nodeStore.createOperatorNode()
          break
        case 'insiderNode':
          node = nodeStore.createInsiderNode()
          break
      }

      const dnd = new Addon.Dnd({ target: this.graph })
      dnd.start(node, e)
    },
    scale () {
      this.graph.zoom(0.2)
    },
  },
  getters: {
    graph () {
      return useInitGraph().graph
    }
  }
})