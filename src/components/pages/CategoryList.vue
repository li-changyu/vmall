<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                v-for="(item, index) in category"
                @click="clickCategory(index, item.ID)"
                :key="index"
                :class="{categoryActive: categoryIndex === index}">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab
                v-for="(item, index) in categorySub"
                :key="index"
                :title="item.MALL_SUB_NAME">
              </van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-pull-refresh
              v-model="isRefresh"
              @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad">
                <div
                  class="list-item"
                  v-for="(item, index) in goodList"
                  :key="index"
                  @click="goGoodsInfo(item.ID)">
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg">
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>￥{{item.ORI_PRICE | moneyFilter}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import axios from 'axios'
import url from '@/serviceAPI/config.js'
import toMoney from '@/filter/moneyFilter.js'
export default {
  data () {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],
      active: 0,
      list: [],
      loading: false,
      finished: false,
      isRefresh: false,
      page: 1,
      goodList: [],
      categorySubId: '',
      errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"'
    }
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 46 - 50 + 'px'
    document.getElementById('list-div').style.height = winHeight - 90 - 50 + 'px'
  },
  methods: {
    clickCategory (index, categoryId) {
      this.categoryIndex = index
      this.page = 1
      this.finished = false
      this.goodList = []
      this.getCategorySubByCategoryId(categoryId)
    },
    getCategory () {
      axios({
        url: url.getCategoryList,
        method: 'get'
      })
        .then(response => {
          console.log(response)
          if (response.data.code === 200 && response.data.message) {
            this.category = response.data.message
            this.getCategorySubByCategoryId(this.category[0].ID)
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getCategorySubByCategoryId (categoryId) {
      axios({
        url: url.getCategorySubList,
        method: 'post',
        data: {categoryId: categoryId}
      })
        .then(response => {
          if (response.data.code === 200 && response.data.message) {
            this.categorySub = response.data.message
            this.active = 0
            this.categorySubId = this.categorySub[0].ID
            this.onLoad()
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getGoodList () {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: 'post',
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(response => {
          console.log(response)
          if (response.data.code === 200 && response.data.message.length) {
            this.page++
            this.goodList = this.goodList.concat(response.data.message)
          } else {
            this.finished = true
          }
          this.loading = false
          console.log(this.finished)
        })
        .catch(error => {
          console.log(error)
        })
    },
    onClickCategorySub (index, title) {
      this.categorySubId = this.categorySub[index].ID
      console.log('categorySubId:' + this.categorySubId)
      this.goodList = []
      this.finished = false
      this.page = 1
      this.onLoad()
    },
    goGoodsInfo (id) {
      console.log(id)
      this.$router.push({name: 'Goods', params: {goodsId: id}})
    },
    onRefresh () {
      setTimeout(() => {
        this.isRefresh = false
        this.finished = false
        this.goodList = []
        this.page = 1
        this.onLoad()
      }, 500)
    },
    onLoad () {
      setTimeout(() => {
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
        this.getGoodList()
      }, 1000)
    }
  },
  created () {
    this.getCategory()
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  }
}
</script>

<style>
  #leftNav {
    background-color: aliceblue;
  }
  #leftNav ul li {
    line-height: 2rem;
    border-bottom: 1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
  }
  .categoryActice {
    background-color: #fff;
  }
  .list-item {
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding: 5px;
  }
  #list-div {
    overflow: scroll;
  }
  .list-item-img {
    flex: 8;
  }
  .list-item-text {
    flex: 16;
    margin-top: 10px;
    margin-left:10px;
  }
</style>
