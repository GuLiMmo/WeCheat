import { request } from '../../request/index'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    swiperList: [],
    catesList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList(),
    this.getCatesList(),
    this.getFloorsList()
  },
  // 获取轮播图
  async getSwiperList() {
      const res = await request({ url: "/home/swiperdata" })
      this.setData({
        swiperList: res
      })
  },

  // 获取分类导航
  async getCatesList () {
      const res = await request({ url: "/home/catitems" })
      this.setData({
        catesList: res
      })
  },

  // 获取楼层数据
  async getFloorsList () {
      const res = await request({ url: "/home/floordata" })
      this.setData({
        floorList: res
      })
  }

})