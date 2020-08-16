/*
 * 
 * WordPres版微信小程序
 * author: GCJ
 */
import config from '../../utils/config.js';
var domain = config.getRootDomain;
var INDEX_URL = "http://"+domain+":1003"

module.exports = {
 //获取首页滑动文章
 getSwiperPosts: function() {
  var url = INDEX_URL+"/image/queryIndexImage";
   return url;
 },
 
};