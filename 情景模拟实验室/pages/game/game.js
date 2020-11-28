// pages/game/game.js
var app = getApp()
Page({

  data: {
    i: 0,
    touzi: ['1', '2', '3', '4', '5', '6'],
    isReady: false,
    modalHidden: true,
    isOK: false,
    value: '',
    Imgurl: [{
        url: 'https://mmbiz.qpic.cn/mmbiz_gif/bsEKk7aR18NCLTlbFogGiaUiaictIjwJJk83taibBWt8YYIJw1rexzSg2Ny81flQqGJE1z9PFTUibtKFzGp6FVWVeEA/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1'
      },
      {
        url: 'https://mmbiz.qpic.cn/mmbiz_gif/bsEKk7aR18NCLTlbFogGiaUiaictIjwJJk8yybibUMibZyN0mSBLVHcHicdqOwOuy6gE4fVodfvk1WtxweDNVf8xEGag/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1'
      },
      {
        url: 'https://mmbiz.qpic.cn/mmbiz_gif/bsEKk7aR18NCLTlbFogGiaUiaictIjwJJk8PW0hicur62QZ8UCpU98vicW6G6uypibZxNH78PzXv1h52fGNMTC8tzF0A/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1'
      },
      {
        url: 'https://mmbiz.qpic.cn/mmbiz_gif/bsEKk7aR18NCLTlbFogGiaUiaictIjwJJk8NUHWk4gJ3ODDHb47hiamhJzhtfHdCvvzDuYXzOCrkdmLu8ApBzKBE2w/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1'
      },
      {
        url: 'https://mmbiz.qpic.cn/mmbiz_gif/bsEKk7aR18NCLTlbFogGiaUiaictIjwJJk83qibeVRK3VGhesT792nDKTCFdTMQLwtETjOjFqmDJN13URHhUfFo9SQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1'
      },
      {
        url: 'https://mmbiz.qpic.cn/mmbiz_gif/bsEKk7aR18NCLTlbFogGiaUiaictIjwJJk8dMibQGRoXmLHuTSwmLe3D6IyvkicXia4ibEl4kI2oUImXrCBaAuSlp8OMQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1'
      },
    ],
    url: 'https://mmbiz.qpic.cn/mmbiz_gif/bsEKk7aR18NCLTlbFogGiaUiaictIjwJJk83taibBWt8YYIJw1rexzSg2Ny81flQqGJE1z9PFTUibtKFzGp6FVWVeEA/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1'
  },

  choose: function (e) {
    var value = e.detail.value //获取点击数据
    console.log(value)
    this.setData({
      value: value
    })
  },

  onLoad: function (options) {
    var that = this
    setTimeout(function (e) {
      that.setData({
        isReady: true
      })
    }, 2000)

    this.setData({
      model: wx.getStorageSync('model')
    })
    var k = Math.floor(Math.random() * 5)
    this.setData({
      url: this.data.Imgurl[k].url,
      k: k
    })
    if (wx.getStorageSync('isChoose') == true) {
      this.setData({
        i: wx.getStorageSync('sum')
      })
    }
  },
  next: function (e) {
    this.setData({
      isOK: true
    })
    if (this.data.value == '') {
      this.setData({
        modalHidden: false
      })
    } else {
      var k = parseInt(this.data.i) + parseInt(1)
      this.setData({
        i: k
      })
      wx.setStorageSync('sum', k)
      console.log(k)
      var sum = wx.getStorageSync('sum')

      let tableName = 'data'
      let recordID = wx.getStorageSync('id') // 数据行 id
      let Product = new wx.BaaS.TableObject(tableName)
      let product = Product.getWithoutData(recordID)

      product.append('touzi', this.data.touzi[this.data.value - 1]) //在知晓云中列入每次的点数
      product.append('rand', this.data.touzi[this.data.k]) //在知晓云中列入每次随机的点数
      product.update().then(res => {
        console.log(res)
      }, err => {
        // err
      })
      console.log(wx.getStorageSync('sum'))
      var that = this
      if (this.data.i < 10) {
        setTimeout(function (e) {
          wx.redirectTo({
            url: '/pages/game/display-information/display-information?touzi=' + that.data.value,
          })
        }, 1000)

      }
      if (this.data.i == 10) { //十次游戏结束
        wx.setStorageSync('isFinish', true) //设置游戏结束缓存
        setTimeout(function (e) {
          wx.redirectTo({
            url: '/pages/game/display-information/display-information?touzi=' + that.data.value,
          })
        }, 1000)
      }

    }

  },
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   *  点击确认
   */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

})