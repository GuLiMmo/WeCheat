import {request} from '../../request/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单
    leftMenuList: [],
    // 右侧商品
    rightContentList: [],
    // 被点击左侧菜单的索引
    currentIndex: 0,
    scroll_top: 0
  },

  // 接口的返回数据
  CatesList: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 
      使用本地缓存
      1. 先判断有没有旧的数据、
      2. 没有旧数据就直接发送请求
      3. 有旧的数据同是旧的数据也没有过期就是用本地数据
    */
    // 1. 读取本地数据
    const Cates = wx.getStorageSync("cates")
    if (!Cates) {
      // 路过不存在数据，则读取数据和存储数据
      this.getCates()
    } else {
      // 有旧数据
      if (Date.now() - Cates.time > 1000 * 180) {
        this.getCates()
      } else {
        // 使用旧数据
        this.CatesList = Cates.data
        let leftMenuList = this.CatesList.map(v => v.cat_name);
        let rightContentList = this.CatesList[0].children
        this.setData({
          leftMenuList,
          rightContentList
        })
      }
    }
    
  },

  // 获取商品分类
  async getCates () {
    // request({ url: "/categories" })
    //   .then( res => { 
    //     this.CatesList = res.data.message;
    //     // 将数据存在本地
    //     wx.setStorageSync("cates",{time: Date.now(), data: this.CatesList})
    //     let leftMenuList = this.CatesList.map(v => v.cat_name);
    //     let rightContentList = this.CatesList[0].children
    //     this.setData({
    //       leftMenuList,
    //       rightContentList
    //     })
    //   })

    // es7 async用法
    const res = await request({ url: "/categories" })
    this.CatesList = res;
        // 将数据存在本地
        wx.setStorageSync("cates",{time: Date.now(), data: this.CatesList})
        let leftMenuList = this.CatesList.map(v => v.cat_name);
        let rightContentList = this.CatesList[0].children
        this.setData({
          leftMenuList,
          rightContentList
        })
  },
  // 左侧菜单的点击事件
  handleItem (e) {
    const {index} = e.currentTarget.dataset
    let rightContentList = this.CatesList[index].children
    this.setData({
      rightContentList,
      currentIndex: index,
      // 右侧scroll-view距离顶部的距离
      scroll_top: 0
    })
  }
})