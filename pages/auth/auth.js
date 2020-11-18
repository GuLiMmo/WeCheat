import {login} from '../../request/AsyncWx';
import {request} from '../../request/index';
// pages/auth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  async GetuserInfo (e) {
   
    try {
      const {encryptedData,rawData,iv,signature} = e.detail
      const {code} = await login()
      const PrimseLogin = {encryptedData,rawData,iv,signature,code}
      const res = await request({url: "/users/wxlogin",data:PrimseLogin,method: "post"})
      wx.setStorageSync("token", res);
      wx.navigateTo({url: '/pages/pay/pay'});
    } catch (error) {
      console.log(error);
    }
  }

})