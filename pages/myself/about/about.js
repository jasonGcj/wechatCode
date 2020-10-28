var Api = require('../../../api/myself/about.js');
var wxRequest = require('../../../utils/wxRequest.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // onPullDownRefresh: function () {
    //   wx.stopPullDownRefresh()
    // },
    userInfo:{
      "name":"Jason_Gu",
      "phone":"17521124213",
      "birthday":"1995-01-05",
      "email":"8508499112qq.com",
      "info":"不忘初心，方得始终",
      }
  
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var stu = wx.getStorageSync('student');
    var login = this.getUserAbout();
    console.log(login)
    this.setData({ myinfo: stu });
    // console.log(this.data.myinfo);
  },
  exit:function(e){
    wx.showModal({
      title: '提示',
      content: '是否确认退出',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.removeStorageSync('student');
          //页面跳转
          wx.redirectTo({
            url: '../login/login',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
resetpwd:function(e){
    var no=this.data.myinfo.no;
    wx.navigateTo({  
      url: '../password/password?no=' + no,
    })
  },
  setemail: function (e) {
    var no = this.data.myinfo.no;
    wx.navigateTo({
      url: '../email/email?no=' + no,
    })
  },

  getUserAbout:function(){
    var getPostsRequest =wxRequest.postRequest(Api.getUserAbout(), {
      "userName":"jasonGu",
      "passWord":"chao25251325"
    });
    getPostsRequest.then(response => {
      if(response.data.code == 200){
        wx.setStorageSync('USER_TOKEN', response.data.data)
      }
      console.log(wx.getStorageSync('USER_TOKEN'))
      return response.data;
    })
  }
})
