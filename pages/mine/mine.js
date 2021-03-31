// pages/mine/mine.js
var utils = require("../../utils/util.js");
var app = getApp();
var urlG = app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  
  /**
	* 实名认证，先判断是否认证过，有提示已认证，否跳转认证界面
   */
  toVerify:function(){
	  var data = {
		  "RequestType": "CheckIdentifier",
		  "UID":wx.getStorageSync('userID'),
	  };
	  wx.showLoading({
		  title: '加载中',
	  })
    var url = urlG + "CheckIdentifier";
	  utils.httpPOST(url, data, this.afterVerify);
  },

	afterVerify: function (data) {
		wx.hideLoading();
		console.log('是否认证？');
		console.log(data);
		if (data.result =='success'){
			wx.showToast({
				title: '已认证！',
			})
		}else{
			wx.navigateTo({
				url: '/pages/mine/verify/verify',
			})
		}
	},
	
	onClearCacheTap: function (data) {
		var that = this;
		wx.showModal({
			title: '提示',
			content: '确认删除本机所有数据，确认后重启小程序生效',
			success: function (res) {
				if (res.confirm) {
					wx.clearStorageSync();
					wx.showToast({
						title: '清除成功',
						icon: 'succes',
						duration: 1000,
						mask: true
					})
				};
			}
		})
	},
	onFeedbackTap: function () {
		wx.navigateTo({
			url: '../mine/feedback/feedback',
		})
	},
	onAboutTap: function () {
		wx.navigateTo({
			url: '../mine/about/about',
		})
	},
	onHelpTap: function () {
		wx.showModal({
			title: '提示',
			content: '暂无使用手册&常见问题，如有问题欢迎反馈，感谢您的支持！',
			showCancel: false
		})
	},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})