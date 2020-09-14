/*
 * 
 * WordPres版微信小程序
 * author: NiZerin
 * organization: 泽林博客 www.iacblog.com
 * github:    https://github.com/CrazyNing98/WeChatMiniProgram-Blog
 * 技术支持微信号：NINGCZ19980501
 * 开源协议：MIT
 * 
 *  *Copyright (c) 2017 https://www.iacblog.com/ All rights reserved.
 */

var Api = require('../../api/index/index.js');
var WxParse = require('../../wxParse/wxParse.js');
var wxRequest = require('../../utils/wxRequest.js');
var pageCount = config.getPageCount;
import config from '../../utils/config.js'
import util from '../../utils/util.js'

Page({
  data: {
    postsList: [],
    postsShowSwiperList: [],
    isLastPage: false,
    page: 1,
    search: '',
    categories: 0,
    showerror: "none",
    showCategoryName: "",
    categoryName: "",
    showallDisplay: "block",
    displayHeader: "none",
    displaySwiper: "none",
    floatDisplay: "none",
    displayfirstSwiper: "none",
    topNav: []


  },
  formSubmit: function(e) {
    var url = '../list/list'
    var key = '';
    if (e.currentTarget.id == "search-input") {
      key = e.detail.value;
    } else {

      key = e.detail.value.input;

    }
    if (key != '') {
      url = url + '?search=' + key;
      wx.navigateTo({
        url: url
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入内容',
        showCancel: false,
      });


    }
  },
  onShareAppMessage: function() {
    return {
      title: '“' + config.getWebsiteName + '”网站微信小程序,基于WordPress版小程序构建.技术支持：www.watch-life.net',
      path: 'pages/index/index',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  onPullDownRefresh: function() {
    var self = this;
    self.setData({
      showerror: "none",
      showallDisplay: "block",
      displaySwiper: "none",
      floatDisplay: "none",
      isLastPage: false,
      page: 1,
      postsShowSwiperList: []
    });
    this.fetchTopFivePosts();
    this.fetchPostsData(self.data);

  },
  onReachBottom: function() {
    var self = this;
    if (!self.data.isLastPage) {
      self.setData({
        page: self.data.page + 1
      });
      console.log('当前页' + self.data.page);
      this.fetchPostsData(self.data);
    } else {
      console.log('最后一页');
    }

  },
  onLoad: function(options) {
    var self = this;
    self.fetchTopFivePosts();
    self.fetchPostsData(self.data);//加载首页
    self.setData({
      topNav: config.getIndexNav
    });

  },
  onShow: function(options) {
    wx.setStorageSync('openLinkCount', 0);
  },
  fetchTopFivePosts: function() {
    var self = this;
    //取置顶的文章
    var getPostsRequest = wxRequest.getRequest(Api.getSwiperPosts());
    getPostsRequest.then(response => {
        if (response.data.code == 200) {
          self.setData(
            {
            postsShowSwiperList: response.data.data,
            // postsShowSwiperList: self.data.postsShowSwiperList.concat(response.data.data.map(function(item) {
            //   item.firstImage = Api.getContentFirstImage(item.content.rendered);
            //   if (item.post_medium_image_300 == null || item.post_medium_image_300 == '') {
            //     if (item.content_first_image != null && item.content_first_image != '') {
            //       item.post_medium_image_300 = item.content_first_image;
            //     } else {
            //       item.post_medium_image_300 = "../../images/logo700.png";
            //     }
            //   }
            //   item.post_medium_image_300 = "../../images/logo700.png";
            //   return item;
            // })),
            displaySwiper: "block"
          }
          );

        } else {
          self.setData({
            displaySwiper: "none"
          });

        }

      }).catch(function(response) {
        console.log(response);
        self.setData({
          showerror: "block",
          floatDisplay: "none"
        });

      })
      .finally(function() {

      });

  },
    //获取文章列表数据
    fetchPostsData: function(data) {
      var self = this;
      if (!data) data = {};
      if (!data.page) data.page = 1;
      if (!data.categories) data.categories = 0;
      if (!data.search) data.search = '';
      if (data.page === 1) {
        self.setData({
          postsList: []
        });
      };
      wx.showLoading({
        title: '正在加载',
        mask: true
      });
      var getPostsRequest = wxRequest.getRequest(Api.queryArticle(data));
      getPostsRequest
        .then(response => {
          if (response.statusCode === 200) {
            for (var i = 0; i < response.data.data.length; i++) {
              // console.log(response.data[i].excerpt.rendered);
              var rendered = response.data.data[i].excerpt;
              if (rendered === '') {
                continue
              }
              var res = WxParse.wxParse('rendered', 'html', rendered, self, 5, true);
              // console.log(res);
              response.data.data[i].excerpt = res;
            }
            if (response.data.data.length < pageCount) {
              self.setData({
                isLastPage: true
              });
            }
            self.setData({
              floatDisplay: "block",
              postsList: self.data.postsList.concat(response.data.data.map(function(item) {
                var strdate = item.createTime
                if (item.category_name != null) {
                  item.categoryImage = "../../images/category.png";
                } else {
                  item.categoryImage = "";
                }
                if (item.post_thumbnail_image == null || item.post_thumbnail_image == '') {
                  item.post_thumbnail_image = "../../images/logo700.png";
                }
                item.date = util.cutstr(strdate, 31, 1);
                // console.log(item);
                return item;
              })),
            });
            setTimeout(function() {
              wx.hideLoading();
            }, 900);
          } else {
            if (response.data.code == "rest_post_invalid_page_number") {
              self.setData({
                isLastPage: true
              });
              wx.showToast({
                title: '没有更多内容',
                mask: false,
                duration: 1500
              });
            } else {
              wx.showToast({
                title: response.data.message,
                duration: 1500
              })
            }
          }
        })
        .catch(function(response) {
          if (data.page == 1) {
            self.setData({
              showerror: "block",
              floatDisplay: "none"
            });
  
          } else {
            console.log(response);
            wx.showModal({
              title: '加载失败',
              content: '加载数据失败,请重试.',
              showCancel: false,
            });
            self.setData({
              page: data.page - 1
            });
          }
        })
        .finally(function(response) {
          wx.hideLoading();
          wx.stopPullDownRefresh();
        });
    },

})