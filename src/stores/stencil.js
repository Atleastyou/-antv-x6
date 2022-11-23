import { defineStore } from "pinia";
import { Graph, Addon } from "@antv/x6";
import auditorNode from '@/components/Graph/nodes/auditor'
import operatorNode from '@/components/Graph/nodes/operator'
import insiderNode from '@/components/Graph/nodes/insider'
import useGraphStore from './graphStore';

export default defineStore('stencilStore', {
  state: () => ({
    stencil: null,
    ports: {
      groups: {
        // 输入链接桩群组定义
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#2D8CF0',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        // 输出链接桩群组定义
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#2D8CF0',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#2D8CF0',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#2D8CF0',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      },
      items: [
        {
          id: 'port1',
          group: 'top',
        },
        {
          id: 'port2',
          group: 'bottom',
        },
        {
          id: 'port3',
          group: 'left',
        },
        {
          id: 'port4',
          group: 'right',
        }
      ],
    }
  }),
  actions: {
    initStencil () {
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
    },
    // 拖拽节点新增
    startDragToGraph (type, e) {
      const graphStore = useGraphStore()
      const graph = graphStore.graph
      let node = null
      this.showRight = false
      this.nodeId = ''
      // // 验证 startNode endNode 是否已存在，只能添加一个
      // if (['startNode', 'endNode'].includes(type)) {
      //   const graphData = this.graph.toJSON()
      //   const posIndex = graphData.cells.findIndex((item) => item.type === type)

      //   if (posIndex >= 0) return
      // }

      switch(type) {
        case 'auditorNode':
          node = graph.createNode({
            type: 'auditorNode',
            shape: 'vue-shape',
            width: 100,
            height: 100,
            data: {
              isSelect: false,
              type
            },
            ports: this.ports,
            component: 'auditor-node'
          })
          break
        case 'operatorNode':
          node = graph.createNode({
            type: 'operatorNode',
            shape: 'vue-shape',
            width: 100,
            height: 100,
            data: {
              isSelect: false,
              type
            },
            ports: this.ports,
            component: 'operator-node'
          })
          break
        case 'insiderNode':
          node = graph.createNode({
            type: 'insiderNode',
            shape: 'vue-shape',
            width: 100,
            height: 100,
            data: {
              isSelect: false,
              type
            },
            ports: this.ports,
            component: 'insider-node'
          })
          break
      }

      const dnd = new Addon.Dnd({ target: graph })
      dnd.start(node, e)
    },
  }
})