import { defineStore } from "pinia";
import { Graph, Shape } from '@antv/x6';
import useRegisterVue from './registerVue'
import useSetData from './setData'
import useNodeStore from './nodes'
import useEdgeStore from './edge'

export default defineStore('initGraph', {
  state: () => ({
    graph: null
  }),
  actions: {
    initGraph (className) {
      const nodeStore = useNodeStore()
      const edgeStore = useEdgeStore()
      const registerVue = useRegisterVue()
      registerVue.registerComponent()
      this.graph = new Graph({
        container: document.getElementById(className),
        autoResize: true,
        panning: {
          enabled: true,
          modifiers: 'shift',
        },
        selecting: {
          enabled: true,
        },
        // scroller: {
        //   enabled: true,
        //   pannable: true,
        //   pageVisible: true,
        //   pageBreak: false,
        // },
        mousewheel: {
          enabled: true,
          modifiers: ['ctrl', 'meta'],
        },
        connecting: {
          allowBlank: false,
          allowLoop: false,
          allowMulti: false,
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: '#1890ff',
                  // strokeDasharray: 5, // 边的间隔
                  targetMarker: 'classic',
                },
              },
            })
          },
        },
        interacting: function ({ cell }) {
          let nodeMovable = true
          if (cell.component && cell.component === 'node-dropdown') {
            nodeMovable = false
          }
          return { nodeMovable, edgeMovable: true }
        },
        // highlighting: {
        //   magnetAdsorbed: {
        //     name: 'stroke',
        //     args: {
        //       attrs: {
        //         fill: '#5F95FF',
        //         stroke: '#5F95FF',
        //       },
        //     },
        //   },
        // },
      })
      this.nodeSelect()
      this.unNodeSelect()
      this.nodeMouseEnter()
      this.nodeMouseLeave()
      this.edgeMouseup()
      this.nodeAdded()
      this.edgeMouseEnter()
      this.edgeMouseLeave()
      this.edgeContextmenu()
      nodeStore.initNodes()
      edgeStore.initLinks()
    },
    // 控制连接桩显示/隐藏
    showPorts (ports, show) {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
      }
    },
    nodeAdded () {
      this.graph.on('node:added', ({ node, index, options }) => {
        const setData = useSetData()
        setData.setPushGraphData(node.data)
      })
    },
    nodeSelect () {
      this.graph.on('node:selected', ({cell, node, options}) => {
        node.setData({ isSelect: true })
      })
    },
    unNodeSelect () {
      this.graph.on('node:unselected', ({cell, node, options}) => {
        node.setData({ isSelect: false })
      })
    },
    nodeMouseEnter () {
      this.graph.on('node:mouseenter', ({ node, view }) => {
        const ports = view.container.querySelectorAll(
          '.x6-port-body',
        )
        this.showPorts(ports, true)
      })
    },
    nodeMouseLeave () {
      this.graph.on('node:mouseleave', ({ node, view }) => {
        const ports = view.container.querySelectorAll(
          '.x6-port-body',
        )
        this.showPorts(ports, false)
      })
    },
    edgeMouseEnter () {
      // 连接线鼠标移出
      this.graph.on('edge:mouseenter', ({ edge }) => {
        edge.addTools([
          'source-arrowhead',
          'target-arrowhead'
        ])
      })
    },
    edgeMouseLeave () {
      // 连接线鼠标移出
      this.graph.on('edge:mouseleave', ({ edge }) => {
        edge.removeTools()
      })
    },
    edgeMouseup () {
      this.graph.on('edge:mouseup', ({ e, edge, view, cell }) => {
        if (edge.target.cell) {
          this.graph.removeEdge(edge)
          this.graph.addEdge({
            source: edge.source.cell,
            target: edge.target.cell,
            attrs: {
              line: {
                stroke: '#1890ff',
                strokeDasharray: view.targetView.cell.data.type === 'insiderNode' ? 10 : 0,
                targetMarker: 'classic',
              }
            }
          })
        }
      })
    },
    edgeContextmenu () {
      this.graph.on('edge:contextmenu', ({ x, y }) => {
        this.graph.addNode({
          x: x + 220,
          y: y + 20,
          // data: item,
          shape: 'vue-shape',
          // ports: this.ports,
          component: 'node-dropdown'
        })
      })
    }
  }
})