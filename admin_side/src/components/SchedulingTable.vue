<template>
    <v-data-table-virtual
      :headers="headers"
      :items="scheduling"
      height="400"
      item-value="name"
    ></v-data-table-virtual>
  </template>
  <script>
    export default {
      data () {
        return {
          headers: [
            { title: 'Subject Code', align: 'start', key: 'name' },
            { title: 'Subject Title', align: 'end', key: 'speed' },
            { title: 'Day and Time', align: 'end', key: 'length' },
            { title: 'Grade Level', align: 'end', key: 'price' },
            { title: 'Section/Strand', align: 'end', key: 'year' },
            { title: 'Adviser Name', align: 'end', key: 'adName' },
          ],
          boats: [
            {
              name: 'Speedster',
              speed: 35,
              length: 22,
              price: 300000,
              year:2022,
              adName: 2021,
            }
          ],
        }
      },
  
      computed: {
        scheduling () {
          return [...Array(10).keys()].map(i => {
            const boat = { ...this.boats[i % this.boats.length] }
            boat.name = `${boat.name} #${i}`
            return boat
          })
        },
      },
    }
  </script>

  <style lang="scss" scoped>
.header{
    font-weight: bold;
}
  </style>