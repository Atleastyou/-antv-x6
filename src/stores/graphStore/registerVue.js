import { defineStore } from "pinia";
import { Graph } from "@antv/x6";
import '@antv/x6-vue-shape'
import auditorNode from '@/components/Graph/nodes/auditor'
import operatorNode from '@/components/Graph/nodes/operator'
import insiderNode from '@/components/Graph/nodes/insider'
import startNode from '@/components/Graph/nodes/start'
import stopNode from '@/components/Graph/nodes/stop'
import nodeDropdown from '@/components/Graph/nodes/dropdown'

export default defineStore('registerVue', {
  state: () => ({}),
  actions: {
    registerComponent () {
      Graph.registerVueComponent('auditor-node', {
        template: `<auditorNode></auditorNode>`,
        components: {
          auditorNode
        }
      }, true)
      Graph.registerVueComponent('operator-node', {
        template: `<operatorNode></operatorNode>`,
        components: {
          operatorNode
        }
      }, true)
      Graph.registerVueComponent('insider-node', {
        template: `<insiderNode></insiderNode>`,
        components: {
          insiderNode
        }
      }, true)
      Graph.registerVueComponent('start-node', {
        template: `<startNode></startNode>`,
        components: {
          startNode
        }
      }, true)
      Graph.registerVueComponent('stop-node', {
        template: `<stopNode></stopNode>`,
        components: {
          stopNode
        }
      }, true)
      Graph.registerVueComponent('node-dropdown', {
        template: `<nodeDropdown></nodeDropdown>`,
        components: {
          nodeDropdown
        }
      })
    }
  }
})