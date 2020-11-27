var questions_Require = [{
    id:1,
    question:"游戏一开始我可以获得金额",
    A:"￥0",
    B:"￥5",
    C:"不知道",
    res: 2
},{
    id:2,
    question:"当我报告的点数为“4”时，我的金额变化是",
    A:"-￥0.5",
    B:"￥0.5",
    C:"不变",
    res: 3
},{
    id:3,
    question:"当我报告的点数不是“4”时（即点数为1/2/3/5/6），我的金额变化是",
    A:"-￥0.5",
    B:"￥0.5",
    C:"不变",
    res: 1 
},{
    id:4,
    question:"我最后获得的金额是如何计算的",
    A:"根据每轮的累积金额来计算的",
    B:"我所获得的金额是固定的",
    C:"不知道",
    res: 1 
}]

module.exports = {
    questionsRequire :questions_Require
  }