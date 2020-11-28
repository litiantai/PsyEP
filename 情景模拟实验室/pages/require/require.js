// pages/require/require.js
var app = getApp()
var questionsRequire = require('../../data/require.js');
var questionRequire = require('../../data/requires')
Page({
  data: {
    questions: [],
    items: [],
    right: 0,
    i: 0,
    isUsed: false,
    isPass: false,
    modalHidden: true,
    getID: 0
  },
  onLoad: function (options) {
    wx.setStorageSync('isModel', true)
    this.setData({
      model: wx.getStorageSync('model')
    })
    console.log(this.data.model)
    if (this.data.model == 1) {
      var item = questionsRequire.questionsRequire
      var isUsed = wx.getStorageSync('isUsed')
      var i = wx.getStorageSync('i')
      var right = wx.getStorageSync('right')
      if (isUsed == true) {
        this.setData({
          questions: item[i],
          i: i,
          items: questionsRequire.questionsRequire,
          right: right
        })
      } else if (isUsed == false) {
        this.setData({
          questions: item[0],
          items: questionsRequire.questionsRequire
        })
        console.log(this.data.questions)
      }
    } else if (this.data.model == 0) {
      var item = questionRequire.questionsRequire
      var isUsed = wx.getStorageSync('isUsed')
      var i = wx.getStorageSync('i')
      var right = wx.getStorageSync('right')
      if (isUsed == true) {
        this.setData({
          questions: item[i],
          i: i,
          items: questionRequire.questionsRequire,
          right: right
        })
      } else {
        this.setData({
          questions: item[0],
          items: questionRequire.questionsRequire
        })
        console.log(this.data.questions)
      }
    }

  },
  nextQuestionTap: function (event) {
    var that = this
    var id = event.currentTarget.dataset.id
    this.setData({
      getID: id
    })
    wx.setStorageSync('isUsed', true)
    setTimeout(function(e){
      if (that.data.model == 1) {
        var i = that.data.i + 1
        var right = that.data.right;
       
        if (id == that.data.questions.res) {
          right = right + 1
          that.setData({
            i: i,
            questions: that.data.items[i],
            right: right,
            getID: 0
          })
          
        } else {
          that.setData({
            modalHidden: false
          })
        }
        wx.setStorageSync('i', that.data.i)
        wx.setStorageSync('right', that.data.right)
        console.log(that.data.i)
        if (that.data.i == 4 && that.data.right == 4) {
          wx.setStorageSync('isPass', true) //通过四个问题
          wx.setStorageSync('isGame', false) //是否完成游戏
          wx.setStorageSync('isQuestionaire', false) //是否开始答题
          wx.setStorageSync('isQF', false) //是否完成答题
          wx.setStorageSync('money', 5.0)
            wx.redirectTo({
              url: '/pages/game/display/display',
            })
        }
      }
      if (that.data.model == 0) {
        var i = that.data.i + 1
        var right = that.data.right;
        if (id == that.data.questions.res) {
          right = right + 1
          that.setData({
            i: i,
            questions: that.data.items[i],
            right: right,
            getID: 0
          })
        } else {
          that.setData({
            modalHidden: false
          })
        }
        wx.setStorageSync('i', that.data.i)
        wx.setStorageSync('right', that.data.right)
        console.log(that.data.i)
        if (that.data.i == 3 && that.data.right == 3) {
          wx.setStorageSync('isPass', true) //通过三个问题
          wx.setStorageSync('isGame', false) //是否完成游戏
          wx.setStorageSync('isQuestionaire', false) //是否开始答题
          wx.setStorageSync('isQF', false) //是否完成答题
          wx.setStorageSync('money', 0.0)
            wx.redirectTo({
              url: '/pages/game/display/display',
            })
        }
      }
    },1000)
   

  },
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })

    wx.redirectTo({
      url: '/pages/introduce/introduce',
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
    wx.redirectTo({
      url: '/pages/introduce/introduce',
    })
  }

})