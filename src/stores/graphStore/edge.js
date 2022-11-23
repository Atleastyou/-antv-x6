import { defineStore } from "pinia";
import { Shape } from '@antv/x6';
import useInitGraph from './init'
import useSetData from './setData'

export default defineStore('edgeStore', {
  state: () => ({}),
  actions: {
    initLinks () {
      this.edges.map(item => {
        const edge = new Shape.Edge({
          source: item.processActivityId + '',
          target: item.toProcessActivityId + '',
          attrs: {
            line: {
              stroke: '#1890ff',
              // strokeDasharray: 5,
              targetMarker: 'classic',
            },
          },
          tools: {

          }
        })
        this.graph.addEdge(edge)
      })
    },
  },
  getters: {
    graph () {
      return useInitGraph().graph
    },
    edges () {
      return useSetData().edges
    }
  }
})