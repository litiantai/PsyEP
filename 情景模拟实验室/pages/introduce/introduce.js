// pages/introduce/introduce.js
Page({
  data: {

  },
  onLoad: function (options) {
    this.setData({
      model : wx.getStorageSync('model')
    })
    if(this.data.model == 1){
      let tableName = 'data'
      let recordID = wx.getStorageSync('id') // 数据行 id
      let Product = new wx.BaaS.TableObject(tableName)
      let product = Product.getWithoutData(recordID)
      
      product.set('model',"损失")
      product.update().then(res => {
          console.log(res)
      }, err => {
          // err
      })
  }
  },

  next: function (event) {
    var isPass = wx.getStorageSync('isPass')
    if (isPass == true) {
      wx.reLaunch({
        url: '/pages/game/display/display',
      })
    } else {
      wx.reLaunch({
        url: '/pages/require/require',
      })
    }
  },

})