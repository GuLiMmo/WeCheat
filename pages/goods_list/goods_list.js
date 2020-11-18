// pages/goods_list/goods_list.js
import {request} from '../../request/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goods_list: []
  },

  // 接收接口参数的数组
  QueryParmas: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },

  // 总页数
  totalPage: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {cid} = options
    this.QueryParmas.cid = cid

    this.getGoodsList()
  },
  // 获取商品列表
  async getGoodsList () {
    const res = await request({ url: "/goods/search",data: this.QueryParmas })
    // 获取总条数
    const total = res.total
    // 计算页数
    this.totalPage = Math.ceil(total / this.QueryParmas.pagesize)
    this.setData({
      // 拼接的数组
      goods_list: [...this.data.goods_list,...res.goods]
    })
    // console.log(this.data.goods_list);
  },

  handleTabsItemChange (e) {
    const {index} = e.detail
    let {tabs} = this.data;
    tabs.forEach( (v,i) => {
      if (i===index) {
        v.isActive = true;
      } else {
        v.isActive = false;
      }
    })
    this.setData({
      tabs: tabs
    })
  },

  // 上拉触底事件
  onReachBottom(){
    if (this.QueryParmas.pagenum >= this.totalPage) {
      // 没有数据了
      // console.log("aaa");
      wx.showToast({
        title: '没有下一页了',
        icon: 'none',
        duration: 1500
      });
    } else {
      this.QueryParmas.pagenum++
      this.getGoodsList()
    }
  }
})