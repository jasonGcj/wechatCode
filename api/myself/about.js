/*
 * 
 * WordPres版微信小程序
 * author: GCJ
 */
import config from '../../utils/config.js';

var INDEX_URL = config.getRootDomain;

module.exports = {
 //获取首页滑动文章
 getUserAbout: function() {
  var url = INDEX_URL+"/spring-cloud-user/user/login";
   return url;
 },
};