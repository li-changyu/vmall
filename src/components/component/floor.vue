<template>
  <div>
    <!--floor one area-->
    <div class="floor">
      <div class="floor-title">{{floorTitle}}</div>
      <div class="floor-anormaly">
        <div class="floor-one"><img :src="floorData0.image" width="100%"></div>
        <div>
          <div class="floor-two"><img :src="floorData1.image" width="100%"></div>
          <div class="floor-three"><img :src="floorData2.image" width="100%"></div>
        </div>
      </div>
      <div class="floor-row">
        <div v-for="(item, index) in floorData.slice(1)" :key="index">
          <img :src="item.image" width="100%">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['floorData', 'floorName'],
  data () {
    return {
      floorData0: {},
      floorData1: {},
      floorData2: {},
      floorTitle: ''
    }
  },
  watch: {
    floorData: function (val) {
      this.floorData0 = val[0]
      this.floorData1 = val[1]
      this.floorData2 = val[2]
    },
    floorName: function (val) {
      this.floorTitle = val
    }
  }
}
</script>

<style>
  .floor-anormaly {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-bottom: 1px solid #eee;
  }
  .floor-anormaly div {
    width: 10rem;
    box-sizing: border-box;
  }
  .floor-one {
    border-right: 1px solid #eee;
  }
  .floor-two {
    border-bottom: 1px solid #eee;
  }
  .floor-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .floor-row div {
    box-sizing: border-box;
    width: 10rem;
    border-bottom: 1px solid #eee;
  }
  .floor-row div:nth-child(odd) {
    border-right: 1px solid #eee;
  }
  .floor-title {
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    background-color: #eee;
    color: #ccc;
    font-size: 14px;
  }
</style>
