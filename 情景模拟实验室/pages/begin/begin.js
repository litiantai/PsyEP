// pages/begin/begin.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
       
    },

    /**
     * 生命周期函数--监听页面加载
     */
    next: function (options) {
        if(wx.getStorageSync('isInformation') != true){
                wx.redirectTo({
                    url: '/pages/information/information',
                })
        }
        if(wx.getStorageSync('isInformation') == true && wx.getStorageSync('isGame') != true){
                wx.redirectTo({
                    url: '/pages/introduce/introduce',
                })
        }
         if(wx.getStorageSync('isInformation') == true && wx.getStorageSync('isGame')==true && wx.getStorageSync('isQF') == true && wx.getStorageSync('isInformation2') != true){
                wx.redirectTo({
                    url: '/pages/information/choose/choose',
                })
        }
        if (wx.getStorageSync('isGame') == true && wx.getStorageSync('isInformation2') != true && wx.getStorageSync('isQF')!=true) {
            wx.redirectTo({
                url: '/pages/questionnaire/display/display',
            })
        }

        if (wx.getStorageSync('isQF') == true  && wx.getStorageSync('isInformation2') == true) {
            wx.redirectTo({
                url: '/pages/end/end',
            })
        } 
        //新建知晓云对象
      if(wx.getStorageSync('id') == ''){
        let tableName = 'data'
        let Product = new wx.BaaS.TableObject(tableName)
        let product = Product.create()

        // 设置方式一
        let data = {
          nameValue: '',
        }

        product.set(data).save().then(res => {
          // success
          console.log(res)
          app.globalData.data = res.data
          wx.setStorageSync('id', res.data.id)
          wx.setStorageSync('isBegin', true)
        }, err => {
          //err 为 HError 对象
        })
      }
        
       
       //随机游戏模式
        var model = Math.floor(Math.random() + 0.5) //随机0或1
        this.setData({
            model: model
        })
        if (wx.getStorageSync('isModel') == true) {
            this.setData({
                model: wx.getStorageSync('model')
            })
        }
        console.log(this.data.model)
       
        wx.setStorageSync('model', this.data.model)
        },

  
})