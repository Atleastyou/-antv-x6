import { defineStore } from 'pinia';
import useInitGraph from './init'
import usePortStore from './ports'
import useSetData from './setData';

export default defineStore('nodeStore', {
  state: () => ({}),
  actions: {
    initNodes () {
      this.nodes.map(item => {
        let component = this.filterNodeComponent(item.activityType)
        this.addNode(item, component)
      })
    },
    createAuditorNode () {
      return this.graph.createNode({
        type: 'auditorNode',
        shape: 'vue-shape',
        width: 100,
        height: 100,
        data: {
          activitySerialNo: this.lastActivitySerialNo + 1,
          isSelect: false,
          type: 'auditorNode'
        },
        ports: this.ports,
        component: 'auditor-node'
      })
    },
    createOperatorNode () {
      return this.graph.createNode({
        type: 'operatorNode',
        shape: 'vue-shape',
        width: 100,
        height: 100,
        data: {
          activitySerialNo: this.lastActivitySerialNo + 1,
          isSelect: false,
          type: 'operatorNode'
        },
        ports: this.ports,
        component: 'operator-node'
      })
    },
    createInsiderNode () {
      return this.graph.createNode({
        type: 'insiderNode',
        shape: 'vue-shape',
        width: 100,
        height: 100,
        data: {
          activitySerialNo: this.lastActivitySerialNo + 1,
          isSelect: false,
          type: 'insiderNode'
        },
        ports: this.ports,
        component: 'insider-node'
      })
    },
    filterNodeComponent (type) {
      switch (type) {
        case 0:
          return 'start-node';
        case 1:
          return 'stop-node'
        case 2:
          return 'auditor-node'
        case 3:
          return 'operator-node'
        case 4:
          return 'insider-node'
        default:
          break;
      }
    },
    addStartNode (item) {
      this.graph.addNode({
        id: item.activitySerialNo + '',
        activitySerialNo: item.activitySerialNo + '',
        x: item.posx,
        y: item.posy,
        data: item,
        shape: 'vue-shape',
        width: 100,
        height: 100,
        ports: this.ports,
        component: 'start-node'
      })
    },
    addAuditorNode () {
      this.graph.addNode({
        id: item.activitySerialNo + '',
        activitySerialNo: item.activitySerialNo + '',
        x: item.posx,
        y: item.posy,
        data: item,
        shape: 'vue-shape',
        width: 100,
        height: 100,
        ports: this.ports,
        component: 'auditor-node'
      })
    },
    addOperatorNode () {
      this.graph.addNode({
        id: item.activitySerialNo + '',
        activitySerialNo: item.activitySerialNo + '',
        x: item.posx,
        y: item.posy,
        data: item,
        shape: 'vue-shape',
        width: 100,
        height: 100,
        ports: this.ports,
        component: 'operator-node'
      })
    },
    addInsiderNode () {
      this.graph.addNode({
        id: item.activitySerialNo + '',
        activitySerialNo: item.activitySerialNo + '',
        x: item.posx,
        y: item.posy,
        data: item,
        shape: 'vue-shape',
        width: 100,
        height: 100,
        ports: this.ports,
        component: 'insider-node'
      })
    },
    addNode (item, component) {
      this.graph.addNode({
        id: item.activitySerialNo + '',
        activitySerialNo: item.activitySerialNo + '',
        x: item.posx,
        y: item.posy,
        data: item,
        shape: 'vue-shape',
        width: 100,
        height: 100,
        ports: this.ports,
        component: component
      })
    }
  },
  getters: {
    graph () {
      return useInitGraph().graph
    },
    ports () {
      return usePortStore().ports
    },
    lastActivitySerialNo () {
      return useSetData().lastActivitySerialNo
    },
    nodes () {
      return useSetData().nodes
    }
  }
})