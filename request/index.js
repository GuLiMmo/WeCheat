
let ajaxtime = 0;

export const request=(parmas)=>{
    ajaxtime++
    // 自定义加载
     wx.showLoading({
        title: '加载中',
        mask: true
      })

    // 公共URL
    const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            ...parmas,
            url: baseURL + parmas.url,
            success:(result)=>{
                resolve(result.data.message)
            },
            fail:(err)=>{
                reject(err)

            },
            // 关闭加载
            complete:() => {
                ajaxtime--
                if (ajaxtime===0) {
                 wx.hideLoading()   
                } 
            }
        })
    })
}