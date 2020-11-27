// pages/questionnaire/questionnaire.js
var questions = require('../../data/data.js')
Page({

    data: {
        item: [],
        items: [],
        question: [],
        QT: [],
        right: 0,
        score: 0,
        sum: 0,
        avarage: [],
        modalHidden: true,
        SPscore: 0, //1-19
        MAscore: 0, //1-10
        SRscore: 0, //20-31
        isNext: false
    },
    onLoad: function (options) {
        this.setData({
            item: questions.questions
        })
        var items = [];
        var question = []
        for (var i = 0; i < 31; i++) {
            question.push(this.data.item[i])
        }
        for (var i = 31; i < 42; i++) {
            items.push(this.data.item[i])
        }
        this.setData({
            items: items,
            question: question,
            QT: question
        })
        console.log(this.data.items)
        console.log(this.data.question)
    },
    PointTap: function (e) {
        var that = this
        console.log(e)
        var id = e.currentTarget.dataset.id
        var postid = e.currentTarget.dataset.postid
        var post = true
        var avarg = this.data.avarage
        if (postid != 31) {
            for (var i = 0; i < 42; i++) {
                if (this.data.avarage[i] == postid) {
                    post = false
                }
            }
            if (post == true) {
                avarg.push(postid)
                this.setData({
                    sum: this.data.sum + 1,
                    avarage: avarg
                })
            }
        }
        console.log(this.data.sum)
        if (postid < 31) {
            if (id == 1) {
                var items = this.data.question
                items[postid].isPoint1 = true
                items[postid].isPoint2 = false
                that.setData({
                    question: items
                })
            }
            if (id == 2) {
                var items = this.data.question
                items[postid].isPoint2 = true
                items[postid].isPoint1 = false
                that.setData({
                    question: items
                })
            }
        } else {

            if (id == 1) {
                var items = this.data.items
                items[postid].isPoint1 = true
                items[postid].isPoint2 = false
                items[postid].isPoint3 = false
                items[postid].isPoint4 = false
                items[postid].isPoint5 = false
                that.setData({
                    items: items
                })
            }
            if (id == 2) {
                var items = this.data.items
                items[postid].isPoint2 = true
                items[postid].isPoint1 = false
                items[postid].isPoint3 = false
                items[postid].isPoint4 = false
                items[postid].isPoint5 = false
                that.setData({
                    items: items
                })
            }
            if (id == 3) {
                var items = this.data.items
                items[postid].isPoint1 = false
                items[postid].isPoint2 = false
                items[postid].isPoint3 = true
                items[postid].isPoint4 = false
                items[postid].isPoint5 = false
                that.setData({
                    items: items
                })
            }
            if (id == 4) {
                var items = this.data.items
                items[postid].isPoint1 = false
                items[postid].isPoint2 = false
                items[postid].isPoint3 = false
                items[postid].isPoint5 = false
                items[postid].isPoint4 = true
                that.setData({
                    items: items
                })
            }
            if (id == 5) {
                var items = this.data.items
                items[postid].isPoint1 = false
                items[postid].isPoint2 = false
                items[postid].isPoint3 = false
                items[postid].isPoint4 = false
                items[postid].isPoint5 = true
                that.setData({
                    items: items
                })
            }
        }
        if (this.data.sum <= 31) {
            this.setData({
                QT: this.data.question
            })
        } else {
            this.setData({
                QT: this.data.items
            })
        }
        wx.setStorageSync('item', items) //储存答题记录
        wx.setStorageSync('isQuestionaire', true) //开始答题
        if (this.data.sum == 41) {
            wx.setStorageSync('isQF', true) //结束答题
            //算1-19SP分数
            for (var i = 0; i < 19; i++) {
                if (this.data.question[i].isPoint1 == true) {
                    this.setData({
                        SPscore: this.data.SPscore + 1
                    })
                }
            }
            console.log(this.data.SPscore)
            //算20-31SR分数
            for (var i = 19; i < 31; i++) {
                if (this.data.question[i].isPoint1 == true) {
                    this.setData({
                        SRscore: this.data.SRscore + 1
                    })
                }
            }
            console.log(this.data.SRscore)
            for (var i = 1; i < 11; i++) {
                if (this.data.items[i].isPoint1 == true) {
                    this.setData({
                        MAscore: this.data.MAscore + 1
                    })
                } else if (this.data.items[i].isPoint2 == true) {
                    this.setData({
                        MAscore: this.data.MAscore + 2
                    })
                } else if (this.data.items[i].isPoint3 == true) {
                    this.setData({
                        MAscore: this.data.MAscore + 3
                    })
                } else if (this.data.items[i].isPoint4 == true) {
                    this.setData({
                        MAscore: this.data.MAscore + 4
                    })
                } else if (this.data.items[i].isPoint5 == true) {
                    this.setData({
                        MAscore: this.data.MAscore + 5
                    })
                }
            }
            console.log(this.data.MAscore)
            let tableName = 'data'
            let recordID = wx.getStorageSync('id') // 数据行 id
            let Product = new wx.BaaS.TableObject(tableName)
            let product = Product.getWithoutData(recordID)

            product.set('SPscore', this.data.SPscore)
            product.set('SRscore', this.data.SRscore)
            product.set('MAscore', this.data.MAscore)
            product.update().then(res => {
                console.log(res)
            }, err => {
                // err
            })
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
    next: function (e) {
        var that = this
        if (this.data.isNext == false) {
            if (this.data.sum < 31) {
                this.setData({
                    modalHidden: false
                })
            }
            if (this.data.sum == 31) {
                this.setData({
                    QT: this.data.items,
                    isNext: true,
                    back: false
                })
             setTimeout(function(e){
                 that.setData({
                     back : false
                 })
             },1000)
            }
        } else if (this.data.isNext == true) {
            if (this.data.sum < 41) {
                this.setData({
                    modalHidden: false
                })
            }
        }
        if (this.data.sum == 41) {
            wx.redirectTo({
                url: '/pages/information/choose/choose',
            })
        }
    }
})