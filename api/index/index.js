/*
 * 
 * WordPres版微信小程序
 * author: GCJ
 */
import config from '../../utils/config.js';
var INDEX_URL = config.getRootDomain;

module.exports = {
 //获取轮播图
 getSwiperPosts: function() {
  var url = INDEX_URL+"/spring-cloud-article/image/queryIndexImage";
   return url;
 },

 queryArticle: function() {
  var url = INDEX_URL+"/spring-cloud-article/article/queryArticle";
   return url;
 },
 
};