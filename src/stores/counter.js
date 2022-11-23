import { defineStore } from 'pinia'
import graphData from 'utils/x6Data'

export default defineStore('graphDataStore', {
  state: () => ({
    graphData: graphData
  })
})