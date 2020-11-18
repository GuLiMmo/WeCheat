import {request} from '../../request/index';

// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '全部订单',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待收货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      }
    ],
    Type: 0
  },
  // options只存在于onLoad
  onShow (options) {
    /* 
      如何获取options
      获取当前的小程序的页面栈 页面栈为数组 长度为10 一个有十个页面
      数组中最大索引就是当前页面
    */
    var curPages =  getCurrentPages();
    let Page = curPages[curPages.length-1].options
    this.getOrders(Page)
  },
  async getOrders (type) {
    const res = await request({url: "/my/orders/all", data: {type}})
    console.log(res);
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
  }

})