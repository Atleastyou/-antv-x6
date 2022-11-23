import { defineStore } from "pinia";
import { Addon } from '@antv/x6';
import usePortStore from './graphStore/ports'
import useGraphStore from './graphStore';

export default defineStore('nodeStore', {
  state: () => ({}),
  actions: {
    createNode (type) {
      const portStore = usePortStore()
      const graphStore = useGraphStore()
      const graph = graphStore.graph
      switch(type) {
        case 'auditorNode':
          node = graph.createNode({
            type: 'auditorNode',
            shape: 'auditor-node',
            width: 100,
            height: 100,
            data: {
              isSelect: false,
              type
            },
            ports: portStore.ports,
            component: 'auditor-node'
          })
          break
        case 'operatorNode':
          node = graph.createNode({
            type: 'operatorNode',
            shape: 'operator-node',
            width: 100,
            height: 100,
            data: {
              isSelect: false,
              type
            },
            ports: portStore.ports,
            component: 'operator-node'
          })
          break
        case 'insiderNode':
          node = graph.createNode({
            type: 'insiderNode',
            shape: 'insider-node',
            width: 100,
            height: 100,
            data: {
              isSelect: false,
              type
            },
            ports: portStore.ports,
            component: 'insider-node'
          })
          break
      }
      const dnd = new Addon.Dnd({ target: graph })
      dnd.start(node, e)
    },
  }
})