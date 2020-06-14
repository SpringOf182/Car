// pages/authorize/authorize.js
var utils = require("../../utils/util.js");
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		nickName:"",
		avatarUrl:"",
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					wx.reLaunch({
						url: '/pages/home/home'
					})
				}
			}
		})
	},

	userInfoHandler:function(){
		var that=this;
		wx.login({
			success(res) {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				if (res.code) {
					var userInfo, nickName, avatarUrl;
					var code = res.code;
					wx.getUserInfo({
						success: function (res) {
							userInfo = res.userInfo;
							nickName = userInfo.nickName;
							avatarUrl = userInfo.avatarUrl;
							//发起网络请求
							var url = app.globalData.url;
							var data = {
								"code": code,
								"nickName": nickName,
								"image": avatarUrl,
								"RequestType": "Login",
							};
							console.log(data);
							wx.showLoading({
								title: '加载中',
							})
							utils.httpPOST(url, data, that.getLoginInfo)
						}
					})
				} else {
					console.log('登录失败！' + res.errMsg)
				}
			}
		})
	},

	getLoginInfo: function (data) {
		wx.hideLoading();
		console.log("login feedback:" );
		console.log(data);
		wx.setStorageSync('userID', data.UID)
		wx.reLaunch({
			url: '/pages/home/home'
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