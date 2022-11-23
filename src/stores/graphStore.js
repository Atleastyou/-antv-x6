import { defineStore } from "pinia";
import { Graph, Shape, Addon } from '@antv/x6';
import useGraphDataStore from './counter';
import useStencilStore from './stencil';

export default defineStore('graphStore', {
  state: () => ({
    graph: null
  }),
  actions: {
    initGraph (className) {
      // const stencilStore = useStencilStore()
      this.graph = new Graph({
        container: document.getElementById(className),
        autoResize: true,
        panning: {
          enabled: true,
          modifiers: 'shift',
        },
        // resizing: true,
        selecting: {
          enabled: true,
          // rubberband: true,
          // showNodeSelectionBox: true,
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
                  // strokeDasharray: 5,
                  targetMarker: 'classic',
                },
              },
            })
          },
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
      this.graph.on('node:selected', ({cell, node, options}) => {
        node.setData({ isSelect: true })
      })
      this.graph.on('node:unselected', ({cell, node, options}) => {
        node.setData({ isSelect: false })
      })
      this.graph.on('node:mouseenter', () => {
        const container = document.getElementById('container')
        const ports = container.querySelectorAll(
          '.x6-port-body',
        )
        this.showPorts(ports, true)
      })
      this.graph.on('node:mouseleave', () => {
        const container = document.getElementById('container')
        const ports = container.querySelectorAll(
          '.x6-port-body',
        )
        this.showPorts(ports, false)
      })
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
    initNodes (component) {
      const data = useGraphDataStore()
      const graphData = data.graphData.ResultSet.Result[0]
      graphData.detailSystemProcessActivity.map(item => {
        const shapeName = `shape_node_${item.activitySerialNo}`
        // this.createNode(component, shapeName)
        this.addNode(item, shapeName)
      })
    },
    createNode (component, shapeName) {
      Graph.registerNode(shapeName, {
        inherit: "vue-shape",
        width: 100,
        height: 100,
        component: component,
      })
    },
    addNode (item, shapeName) {
      this.graph.addNode({
        id: item.activitySerialNo + '',
        x: item.posx,
        y: item.posy,
        data: item,
        shape: 'vue-shape',
        width: 100,
        height: 100,
        component: 'auditor-node'
      })
    },
    initLinks () {
      const data = useGraphDataStore()
      const graphData = data.graphData.ResultSet.Result[0]
      graphData.detailSystemProcessLink.map(item => {
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
        })
        this.graph.addEdge(edge)
      })
    },
    // 控制连接桩显示/隐藏
    showPorts (ports, show) {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
      }
    },
  }
})