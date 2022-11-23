import { defineStore } from "pinia";

export default defineStore('portStore', {
  state: () =>({
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
              visibility: 'hidden'
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
              visibility: 'hidden'
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
              visibility: 'hidden'
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
              visibility: 'hidden'
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
  })
})