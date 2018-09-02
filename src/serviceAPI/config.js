const BASEURL = 'https://www.easy-mock.com/mock/5b62d452518de97c5d45fbc9/vmall/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURL,
  // getGoodsInfo: BASEURL + ''
  registerUser: LOCALURL + 'user/register',
  loginUser: LOCALURL + 'user/login',
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',
  getCategoryList: LOCALURL + 'goods/getCategoryList',
  getCategorySubList: LOCALURL + 'goods/getCategorySubList',
  getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID'
}

export default URL
