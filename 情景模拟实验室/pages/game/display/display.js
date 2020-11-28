// pages/game/display/display.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isNext: false,
    modalHidden: false
  },
  onLoad: function (e) {
    if (wx.getStorageSync('model') == 0) {
      this.setData({
        isNext: true
      })
    }

  },
  next: function (e) {
    if (this.data.isNext == true) {
      wx.redirectTo({
        url: '/pages/game/game',
      })
    } else {
      this.setData({
        modalHidden: true
      })
    }
  },
 
  Next:function(e){
    wx.redirectTo({
      url: '/pages/game/game',
    })
  }

})