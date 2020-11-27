// pages/information/choose/choose.js
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
    Pnext:function(e){
        wx.setStorageSync('choose', 'phone')
        wx.navigateTo({
          url: '/pages/information/information?id=' + 1,
        })
        
    },
    Inext:function(e){
        wx.setStorageSync('choose', 'image')
        wx.navigateTo({
            url: '/pages/information/information?id=' + 1,
          })
    }
})