// pages/game/display-information/display-information.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        i: 0,
        lose: 0,
        get: 0,
        all: 0
    },

    onLoad: function (options) {
        app.globalData.money = wx.getStorageSync('money')
        console.log(options.touzi)
        this.setData({
            model : wx.getStorageSync('model')
        })
        wx.setStorageSync('isChoose', true)
        if(wx.getStorageSync('model') == 1){
            var i = wx.getStorageSync('sum')
            this.setData({
                i: i,
            })
            if (options.touzi == 4) {
                this.setData({
                    all: app.globalData.money,
                    lose: 0
                })
            } else {
                this.setData({
                    all: app.globalData.money - 0.5,
                    lose: 0.5
                })
            }
        }else if(wx.getStorageSync('model') == 0){
            var i = wx.getStorageSync('sum')
            this.setData({
                i: i,
            })
            if (options.touzi == 4) {
                this.setData({
                    all: app.globalData.money + 0.5,
                    get: 0.5,
                })
            } else {
                this.setData({
                    all: app.globalData.money ,
                    get: 0,
                })
            }
        }
       
        wx.setStorageSync('money', this.data.all)
        let tableName = 'data'
        let recordID = wx.getStorageSync('id') // 数据行 id
        let Product = new wx.BaaS.TableObject(tableName)
        let product = Product.getWithoutData(recordID)

        product.set('money', this.data.all)
        product.update().then(res => {
            console.log(res)
        }, err => {
            // err
        })
        if (this.data.i < 10) {
            setTimeout(function () {
                wx.redirectTo({
                    url: '/pages/game/game',
                })
            }, 2000)
        }
        if (this.data.i == 10) {
            wx.setStorageSync('isGame', true)
            wx.setStorageSync('isGameOk', true)
            setTimeout(function () {
                wx.redirectTo({
                    url: '/pages/questionnaire/display/display',
                })
            }, 2000)
        }

    },

})