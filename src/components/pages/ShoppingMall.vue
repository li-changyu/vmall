<template>
  <div>
    <!--search area-->
    <van-row class="search-bar">
      <van-col span="3" class="location-icon"><img :src="locationIcon" width="80%"></van-col>
      <van-col span="16"><input type="text" class="search-input"></van-col>
      <van-col span="5"><van-button size="mini">查找</van-button></van-col>
    </van-row>

    <!--swiper area-->
    <div class="swiper-area">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="(banner, index) in bannerPic" :key="index">
          <img v-lazy="banner" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>

    <!--type-bar-->
    <div class="type-bar">
      <div v-for="(cate, index) in category" :key="index">
        <img v-lazy="cate.image" width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>

    <!--ad banner-->
    <div class="ad-banner">
      <img v-lazy="adBannerPic" width="100%">
    </div>

    <!--recommend goods area-->
    <div class="recommend-area">
      <div class="recomend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img v-lazy="item.image" width="80%">
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <Floor :floorData="floor1" :floorName="floorTitle1"></Floor>
    <Floor :floorData="floor2" :floorName="floorTitle2"></Floor>
    <Floor :floorData="floor3" :floorName="floorTitle3"></Floor>

    <!--hot area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
              <GoodsInfo :goodsImage="item.image" :goodsId="item.goodsId" :goodsName="item.name" :goodsPrice="item.price"></GoodsInfo>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Floor from '../component/floor'
import GoodsInfo from '../component/goodsInfoComponent'
import toMoney from '@/filter/moneyFilter'
import config from '@/serviceAPI/config'
export default {
  data () {
    return {
      locationIcon: require('../../assets/images/location.png'),
      bannerPic: [],
      category: [],
      adBannerPic: '',
      recommendGoods: [],
      swiperOptions: {
        slidesPerView: 3
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorTitle1: '',
      floorTitle2: '',
      floorTitle3: '',
      hotGoods: []
    }
  },
  components: {
    swiper,
    swiperSlide,
    Floor,
    GoodsInfo
  },
  created () {
    axios({
      url: config.getShoppingMallInfo,
      method: 'get'
    })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          this.category = res.data.data.category
          this.category[0].image = this.category[3].image // 第一张图片长宽有问题
          this.adBannerPic = res.data.data.advertesPicture.PICTURE_ADDRESS
          res.data.data.slides.forEach(item => this.bannerPic.push(item.image))
          this.recommendGoods = res.data.data.recommend
          this.floor1 = res.data.data.floor1
          this.floor2 = res.data.data.floor2
          this.floor3 = res.data.data.floor3
          this.floorTitle1 = res.data.data.floorName.floor1
          this.floorTitle2 = res.data.data.floorName.floor2
          this.floorTitle3 = res.data.data.floorName.floor3
          this.hotGoods = res.data.data.hotGoods
        }
      })
      .catch(err => console.log(err))
  },
  filters: {
    moneyFilter (val) {
      return toMoney(val)
    }
  }
}
</script>

<style scoped>
  .search-bar {
    height: 2.2rem;
    line-height: 2.2rem;
    background-color: #e5017d;
    overflow: hidden;
  }
  .search-input {
    width: 100%;
    height: 1.3rem;
    border: none;
    border-bottom: 1px solid;
    color: #fff;
    background: #e5017d;
  }
  .location-icon {
    padding-left: 0.2rem;
    padding-top: 0.2rem;
  }
  .swiper-area {
    width: 20rem;
    clear: both;
    max-height: 15rem;
    overflow: hidden;
  }
  .type-bar {
    background-color: #fff;
    margin: 0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .type-bar div {
    padding: .3rem;
    font-size: 12px;
    text-align: center;
  }
  .recommend-area {
    background-color: #fff;
    margin-top: .3rem;
  }
  .recommend-title {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: 2rem;
    color: #e5017d;
  }
  .hot-goods {
    height: 130rem;
    overflow: hidden;
    background-color: #fff;
  }
  .recommend-body {
    border-bottom: 1px solid #eee;
  }
  .recommend-item {
    width: 99%;
    border-left: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }
</style>
