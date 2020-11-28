const date = new Date()
const nowYear = date.getFullYear()
const nowMonth = date.getMonth() + 1
const nowDay = date.getDate()

let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
// 根据年月获取当月的总天数
let getDays = function (year, month) {
    if (month === 2) {
        return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28
    } else {
        return daysInMonth[month - 1]
    }
}
// 根据年月日设置当前月有多少天 并更新年月日数组
let setDate = function (year, month, day, _this) {
    let daysNum = getDays(year, month)
    day = day > daysNum ? 1 : day
    let monthsNum = 12;
    let years = []
    let months = []
    let days = []
    let yearIndex = 9999
    let monthIndex = 0
    let dayIndex = 0
    // 重新设置年份列表
    for (let i = 1990; i <= nowYear + 10; i++) {
        years.push(i)
    }
    years.map((v, idx) => {
        if (v === year) {
            yearIndex = idx
        }
    })
    // 重新设置月份列表
    for (let i = 1; i <= monthsNum; i++) {
        var k = i;
        months.push(k)
    }
    months.map((v, idx) => {
        if (v === month) {
            monthIndex = idx
        }
    })
    // 重新设置日期列表
    for (let i = 1; i <= daysNum; i++) {
        var k = i;
        days.push(k)
    }
    days.map((v, idx) => {
        if (v === day) {
            dayIndex = idx
        }
    })
    _this.setData({
        //时间列表参数
        years: years,
        months: months,
        days: days,
        //选中的日期
        year: year,
        month: month,
        day: day,
        value: [yearIndex, monthIndex, dayIndex],
    })
}

Page({
    data: {
        //时间列表参数
        years: [],
        months: [],
        days: [],
        //选中的日期
        year: nowYear,
        month: nowMonth,
        day: nowDay,
        value: [9999, 1, 1],
        name: '',
        date: '',
        sex: '',
        identify: '',
        is: '',
        modalHidden: true,
        isName: false,
        isYear: false,
        tempFilePaths: '',
        phone:'',
        isPhone : 'zhifubao'
    },

    onLoad: function (options) {
        if (wx.getStorageSync('ischecked') == 1) {
            this.setData({
                sex: "男"
            })
        }
        if (wx.getStorageSync('ischecked') == 0) {
            this.setData({
                sex: '女'
            })
        }
        if (wx.getStorageSync('isChecked') == 1) {
            this.setData({
                identify: '学生'
            })
        }
        if (wx.getStorageSync('isChecked') == 0) {
            this.setData({
                identify: '社会人士'
            })
        }
        if (wx.getStorageSync('name') != '') {
            this.setData({
                isName: true
            })
        }
        if (wx.getStorageSync('date') != '') {
            this.setData({
                isYear: true
            })
        }
        this.setData({
            ischecked: wx.getStorageSync('ischecked'),
            isChecked: wx.getStorageSync('isChecked'),
            name: wx.getStorageSync('province'),
            date: wx.getStorageSync('date')
        })
        console.log(this.data.isChecked)
        console.log(options.id)
        if (options.id == 1) {
            this.setData({
                isGameOK: true,
                choose: wx.getStorageSync('choose')
            })
        } else {
            this.setData({
                isGameOK: false
            })
        }
        // this.setData({
        //     isGameOK: true,
        //     choose: wx.getStorageSync('choose')
        // })
        console.log(this.data.isGameOK)
        setDate(this.data.year, this.data.month, this.data.day, this);
    },
    nametap: function (e) {
        this.setData({
            isName: false,
            name: ''
        })
        wx.setStorageSync('province', '')
    },
    dateTap: function (e) {
        this.setData({
            isYear: false,
            date: ''
        })
        wx.setStorageSync('date', '')
    },
    //时间选择
    bindChange: function (e) {
        const val = e.detail.value
        setDate(this.data.years[val[0]], this.data.months[val[1]], this.data.days[val[2]], this)

    },
    selsectdate: function () {
        this.setData({
            showWin: 1, //控制弹窗隐藏显示
            dateInput: ' ',
            cacheDate: this.data.dateInput
        })
    },
    hideview: function () {
        this.setData({
            showWin: 0, //控制弹窗隐藏\
            dateInput: this.data.cacheDate
        })
    },
    deleteShow: function () {
        this.setData({
            showWin: 0, //控制弹窗隐藏\
            dateInput: this.data.cacheDate
        })
    },
    defineShow: function () {
        console.log(this.data.year + "年" + this.data.month + "月" + this.data.day + "日");
        var date = this.data.year.toString() + "年" + this.data.month.toString() + "月" + this.data.day.toString() + "日"
        this.setData({
            date: date
        })
        wx.setStorageSync('date', this.data.date)
        let tableName = 'data'
        let recordID = wx.getStorageSync('id') // 数据行 id
        let Product = new wx.BaaS.TableObject(tableName)
        let product = Product.getWithoutData(recordID)

        product.set('date', date);

        product.update().then(res => {
            console.log(res)
        }, err => {
            // err
        })
        this.setData({
            showWin: 0, //控制弹窗隐藏
            dateInput: this.data.year + "年" + this.data.month + "月" + this.data.day + "日",
        })
    },
    sexTap: function (e) {
        var id = e.currentTarget.dataset.radioid
        console.log(id)
        let tableName = 'data'
        let recordID = wx.getStorageSync('id') // 数据行 id
        let Product = new wx.BaaS.TableObject(tableName)
        let product = Product.getWithoutData(recordID)

        if (id == "nan") {
            product.set('sex', '男');
            this.setData({
                sex: '男'
            })
            wx.setStorageSync('isChecked', 1)
        } else {
            product.set('sex', '女')
            this.setData({
                sex: '女'
            })
            wx.setStorageSync('isChecked', 0)
        }
        product.update().then(res => {
            console.log(res)
        }, err => {
            // err
        })
    },
    xuanze: function (e) {
        var id = e.currentTarget.dataset.radioid
        console.log(id)
        let tableName = 'data'
        let recordID = wx.getStorageSync('id') // 数据行 id
        let Product = new wx.BaaS.TableObject(tableName)
        let product = Product.getWithoutData(recordID)
        if (id == "student") {
            product.set('identify', '学生');
            this.setData({
                identify: "学生"
            })
            wx.setStorageSync('ischecked', 1)
        } else {
            product.set('identify', '社会人士')
            this.setData({
                identify: "社会人士"
            })
            wx.setStorageSync('ischecked', 0)
        }
        product.update().then(res => {
            console.log(res)
        }, err => {
            // err
        })
    },
    phone: function (e) {
        var id = e.currentTarget.dataset.radioid
        this.setData({
            isPhone: id.toString()
        })
       
            let tableName = 'data'
            let recordID = wx.getStorageSync('id') // 数据行 id
            let Product = new wx.BaaS.TableObject(tableName)
            let product = Product.getWithoutData(recordID)

            product.set(this.data.isPhone, this.data.phone);
            if (this.data.isPhone == "weixin") {
                product.set('zhifubao', '');
            }
            if (this.data.isPhone == "zhifubao") {
                product.set('weixin', '');
            }
            product.update().then(res => {
                console.log(res)
            }, err => {
                // err
            })
        
    },
    PhoneTap: function (e) {
        var input = (e.detail.value)
        this.setData({
            phone: input.toString()
        })
        let tableName = 'data'
        let recordID = wx.getStorageSync('id') // 数据行 id
        let Product = new wx.BaaS.TableObject(tableName)
        let product = Product.getWithoutData(recordID)

        product.set(this.data.isPhone, input);
        if (this.data.isPhone == "weixin") {
            product.set('zhifubao', '');
        }
        if (this.data.isPhone == "zhifubao") {
            product.set('weixin', '');
        }
        product.update().then(res => {
            console.log(res)
        }, err => {
            // err
        })
    },
    NameTap: function (e) {
        var input = e.detail.value
        let tableName = 'data'
        let recordID = wx.getStorageSync('id') // 数据行 id
        let Product = new wx.BaaS.TableObject(tableName)
        let product = Product.getWithoutData(recordID)

        product.set('province', input);
        this.setData({
            name: input
        })
        wx.setStorageSync('province', this.data.name)
        product.update().then(res => {
            console.log(res)
        }, err => {
            // err
        })
    },
    next: function (e) {
        if (this.data.isGameOK == false) {
            if (this.data.name == '') {
                this.setData({
                    is: "省份未填写",
                    modalHidden: false
                })
            } else if (this.data.identify == '') {
                this.setData({
                    is: "身份未填写",
                    modalHidden: false
                })
            } else if (this.data.identify == '') {
                this.setData({
                    is: "性别未填写",
                    modalHidden: false
                })
            } else if (this.data.date == '') {
                this.setData({
                    is: "出生日期未填写",
                    modalHidden: false
                })
            } else {
                wx.setStorageSync('isInformation', true)
                wx.navigateTo({
                    url: '/pages/introduce/introduce',
                })
            }
        }
        
        if (wx.getStorageSync('choose') == "phone" && this.data.isGameOK == true && this.data.phone == '') {
            
            this.setData({
                is: "电话号未填写",
                modalHidden: false
            })
        }
         if(wx.getStorageSync('choose') == "phone" && this.data.phone != '' && this.data.isGameOK == true ){
            wx.setStorageSync('isInformation2', true)
            wx.reLaunch({
                url: '/pages/end/end',
            })
        }
        if (wx.getStorageSync('choose') == "image" && this.data.isGameOK == true && (this.data.tempFilePaths == '')) {
            this.setData({
                is: "付款码未上传",
                modalHidden: false
            })
        } 
        if (wx.getStorageSync('choose') == "image" && this.data.isGameOK == true &&  this.data.tempFilePaths != '') {
            wx.setStorageSync('isInformation2', true)
            wx.reLaunch({
                url: '/pages/end/end',
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
    ChooseImag: function (e) {
        var that = this
        wx.chooseImage({
            count: 1,
            sourceType: 'album',
            sizeType: ['compressed'],
            success(res) {
                that.setData({
                    tempFilePaths: res.tempFilePaths[0]
                })
                setTimeout(function (e) {
                    wx.showLoading({
                        title: '正在上传图片...',
                    })
                }, 500)
                let MyFile = new wx.BaaS.File()
                let fileParams = {
                    filePath: that.data.tempFilePaths
                }
                let metaData = {
                    categoryName: 'SDK',
                    categoryName: 'image'
                }

                MyFile.upload(fileParams, metaData).then(res => {
                    // 上传成功
                    that.setData({
                        avatarUrl: res.data.path
                    })
                    wx.hideLoading()
                    console.log(that.data.avatarUrl)
                    let tableName = 'data'
                    let recordID = wx.getStorageSync('id') // 数据行 id
                    let Product = new wx.BaaS.TableObject(tableName)
                    let product = Product.getWithoutData(recordID)

                    product.set('fukuanma', that.data.avatarUrl);
                    wx.setStorageSync('isInformation2', true)
                    product.update().then(res => {
                        console.log(res)
                    }, err => {
                        // err
                    })
                }, err => {
                    // HError 对象
                    // this.hideLoading()
                    wx.showModal({
                        title: '上传失败',
                        content: '请等待三秒后重新点击<提交>',
                        showCancel: false,
                        success: res => {
                            if (res.confirm) {
                                that.setData({
                                    submitDisabled: true
                                })
                                setTimeout(function () {
                                    that.setData({
                                        submitDisabled: false
                                    })
                                }, 5000)
                            }
                        }
                    })
                })

            }
        })
    }
})