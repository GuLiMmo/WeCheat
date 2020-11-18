import {request} from '../../request/index';

// pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },

  // 商品信息
  goodsinfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.getGoodsdetail(goods_id)
  },
  
  // 获取商品详情
  async getGoodsdetail (goods_id) {
    const res = await request({ url: "/goods/detail", data: {goods_id} })
    this.goodsinfo = res
    this.setData({
      goodsObj: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        pics: res.pics,
        /* 
          部分手机不识别webp图片格式
          临时自己改
          使用replace和正则表达式修改
        */
        goods_introduce: res.goods_introduce.replace(/\.webp/g,'.jpg')
      }
    })
  },

  // 点击轮播图预览
  handlePrevewImage (e) {
    // 构造数组
    const urls = this.goodsinfo.pics.map(v=>v.pics_big);
    const {url} = e.currentTarget.dataset
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  // 点击加入购物车
  handleCartaAdd () {
    // 转换为数组||[]
    let cart = wx.getStorageSync("cart")||[]
    // 判断商品对象是否存在于购物车数组之中
    let index = cart.findIndex(v=>v.goods_id===this.goodsinfo.goods_id)
    if (index === -1) {
      // 不存在于数组
      /* 
        第一次添加
        num为商品数量
      */
      this.goodsinfo.num = 1
      this.goodsinfo.checked = true
      cart.push(this.goodsinfo)
      
    } else {
      // 存在于数组之中
      // 已经存在购物车中 数量++
      cart[index].num++
    }
    // 将购物车数组添加到缓存之中
    wx.setStorageSync("cart", cart);
    // 弹窗提示
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 1000,
      mask: true
    })
  }

})