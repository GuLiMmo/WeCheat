/* 
  绑定点击事件
  调用小程序内置api获取用户收货地址 wx.chooseAddress

  获取用户对小程序所授权地址的权限状态 scope
    假设用户点击收取地址的提示框为确定 scope为true
    假设用户点击收取地址的提示框为确定 scope为false
    假设用户用来没有使用过收货地址api scope为underfine
*/
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart_goods: [],
    allChecked: false,
    // 总价格
    totalPrice: 0,
    totalNum: 0
  },
  onShow () {
    // 获取缓存中的信息
    const address = wx.getStorageSync("address");
    // 读取购物车商品内容
    const cart_goods = wx.getStorageSync("cart")||[];
    // 计算全选
    /* 
      - every数组方法，会遍历接收一个回调函数，当每一个回调函数都返回true的时候，那么every方法的返回值为true
      - 如果有一个回调函数返回了false，那么不在循环执行，直接返回false
      - b空数组调用every方法返回值就是true
    */
    // const allChecked = cart_goods.length?cart_goods.every(v => v.checked):false
    this.setData({address})
    this.setCart(cart_goods)
  },
  // 收货按钮的点击事件
  handleChooseAddress () {
    // 获取收货地址
    wx.chooseAddress({
      success: (res)=>{
        const address = res
        wx.setStorageSync("address", address);
      }
    }) 
  },
  // check按钮监听事件
  handleItemChange (e) {
    // 获取修改对象的id
    const {id} = e.currentTarget.dataset
    // 获取购物车数组
    let {cart_goods} = this.data
    // 找到被修改的商品对象
    let index = cart_goods.findIndex(v=>v.goods_id === id)
    // 选中状态取反
    // cart_goods[index].checked默认也为true
    cart_goods[index].checked=!cart_goods[index].checked
    
    this.setCart(cart_goods)
   
  },
  // 设置购物车状态同是计算总价格和数量
  setCart (cart_goods) {
    let allChecked = true
    // 计算总价格
    let totalPrice = 0
    let totalNum = 0
    cart_goods.forEach(v => {
      if (v.checked) {
        totalPrice+=v.num*v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    });
    // 判断数组是否为空
    allChecked=cart_goods.length!=0?allChecked:false

    this.setData({
      cart_goods,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync("cart",cart_goods)
  },
  // 全选和反选
  handleAllChange () {
    let {allChecked, cart_goods} = this.data
    // 修改值
    // 因为allchecked默认值为true
    allChecked=!allChecked
    // 循环cart_goods，修改选该状态
    cart_goods.forEach(v => {
      v.checked = allChecked
    });
    this.setCart(cart_goods)
  },
  // 商品数量的加减
  handleNumEdit (e) {
    let {id,operation} = e.currentTarget.dataset
    let {cart_goods} = this.data
    let index = cart_goods.findIndex(v => v.goods_id === id)
    // if (operation === -1 ) {
    //   cart_goods[index].num--
    //   if (cart_goods[index].num === 1) {
        
    //     var that = this
    //     wx.showModal({
    //       title: '提示',
    //       content: '是否要删除商品',
    //       success (res) {
    //         if (res.confirm) {
    //           cart_goods.splice(index,1)
    //           that.setCart(cart_goods)
    //         } else if (res.cancel) {
    //           wx.showToast({
    //             title: '成功',
    //             icon: 'success',
    //             duration: 2000
    //           })
    //         }
    //       }
    //     })
    //   }
    // } else {
    //   cart_goods[index].num++
    // }
    if (operation === -1 && cart_goods[index].num === 1) {
      var that = this
      wx.showModal({
        title: '提示',
        content: '是否要删除商品',
        success (res) {
          if (res.confirm) {
            cart_goods.splice(index,1)
            that.setCart(cart_goods)
          } else if (res.cancel) {
            wx.showToast({
              title: '取消成功',
              icon: 'success',
              duration: 1000
            })
          }
        }
      })
    } else {
      cart_goods[index].num +=operation
      this.setCart(cart_goods)
    }    
  },
  // 结算
  handlePay () {
    let {address,cart_goods} = this.data
    // 判断地址
    if (!address.userName) {
      wx.showToast({
        title: '还没填收货地址呢',
        icon: 'none',
        duration: 1000
      })
    } else if (cart_goods.length===0) {
      // 判断有没有购买商品
      wx.showToast({
        title: '还没选购商品呢',
        icon: 'none',
        duration: 1000
      })
    } else {
      // 跳转
      const {totalNum} = this.data
      if (totalNum === 0) {
        wx.showToast({
          title: '商品数量为0',
          icon: 'none',
          duration: 1000
        })
      } else {
        const {totalPrice,totalNum} = this.data
        const Price = {"totalPrice":totalPrice,"totalNum":totalNum}
        wx.setStorageSync("Price", Price)
        wx.navigateTo({url: '/pages/pay/pay'});
      }
    }
  }
})