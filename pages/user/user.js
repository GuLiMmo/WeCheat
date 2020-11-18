// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow () {
    const userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo
    })
  }
})