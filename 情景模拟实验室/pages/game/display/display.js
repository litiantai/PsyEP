// pages/game/display/display.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    next:function(e){
        wx.redirectTo({
          url: '/pages/game/game',
        })
    },
   
})