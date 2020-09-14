/*
 * 
 * WordPres版微信小程序
 * author: GCJ
 */
import config from '../../utils/config.js';
var INDEX_URL = config.getRootDomain;

module.exports = {
 //获取我的关注
 getMyFollow: function(str) {
  var url = INDEX_URL+"/spring-cloud-article/myFollow/queryMyFollowInfoByUserId?userId="+str;
   return url;
 },
 
};