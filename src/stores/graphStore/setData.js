import { defineStore } from 'pinia'
import graphData from 'utils/x6Data'

export default defineStore('setData', {
  state: () => ({
    graphData: graphData
  }),
  actions: {
    setPushGraphData (item) {
      if (item && item.activitySerialNo) {
        let len = this.graphData.ResultSet.Result[0].detailSystemProcessActivity.length
        let index = this.graphData.ResultSet.Result[0].detailSystemProcessActivity.findIndex(row => row.activitySerialNo === item.activitySerialNo)
        if (index < 0) {
          this.graphData.ResultSet.Result[0].detailSystemProcessActivity.splice(len - 2, 0, item)
        }
      }
    }
    // setViewNodes () {
    //   let list = this.nodes.map(item => {
    //     return {
    //       id: 
    //     }
    //   })
    //   let item = {}
    //   id: item.activitySerialNo + '',
    //     x: item.posx,
    //     y: item.posy,
    //     data: item,
    //     shape: 'vue-shape',
    //     width: 100,
    //     height: 100,
    //     component: 'auditor-node'
    // },
  },
  getters: {
    nodes () {
      let list = this.graphData.ResultSet.Result[0].detailSystemProcessActivity
      let newList = list.sort((a, b) => { return a.activitySerialNo - b.activitySerialNo })
      return newList
      // return graphData.ResultSet.Result[0].detailSystemProcessActivity
    },
    lastActivitySerialNo () {
      return this.nodes[this.nodes.length - 2].activitySerialNo
    },
    edges () {
      return graphData.ResultSet.Result[0].detailSystemProcessLink
    }
  }
})