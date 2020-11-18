// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    goods_Pay: [],
    Price: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let address = wx.getStorageSync("address");
    const cart_goods = wx.getStorageSync("cart")
    wx.setStorageSync("goods_Pay", cart_goods);
    this.setData({
      address
    })
    this.goodsNum()
  },
  goodsNum () {
    let goods_Pay = wx.getStorageSync("goods_Pay")
    const Price = wx.getStorageSync("Price")
    this.setData({Price})
    goods_Pay.forEach((v,i) => {
      if (!v.checked) {
        goods_Pay.splice(i,1)
        wx.setStorageSync("goods_Pay", goods_Pay);
        this.setData({goods_Pay})
      } else {
        this.setData({goods_Pay})
      }
    })
  },
  // 支付按钮
  handlePay () {
    let token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({ url: '/pages/auth/auth'});
      return;
    }
    console.log("已经存在token了");
  }
})