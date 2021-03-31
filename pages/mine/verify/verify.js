// pages/mine/verify/verify.js
var utils = require("../../../utils/util.js");
var app = getApp();
var urlG = app.globalData.url;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		name:"",
		id:"",
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},
	nameBlur: function (e) {
		var name = e.detail.value;
		this.data.name = name;
		//console.log("name");
		//console.log(name);
	},
	idBlur: function (e) {
		var id = e.detail.value;
		this.data.id = id;
		//console.log("id");
		//console.log(id);
	},
	onPublishTap: function () {
		var uid = wx.getStorageSync('userID');
		console.log('uid:' + uid);
		var data = {
			"RequestType": "Identifier",
			"UID": wx.getStorageSync('userID'),
			"name": this.data.name,
			"id": this.data.id,
		}
		console.log(data);
		wx.showLoading({
			title: '加载中',
		})
    var url = urlG + "Identifier";
		utils.httpPOST(url, data, this.verified);
	},

	verified: function (data) {
		wx.hideLoading();
		if(data.Result=="success"){
			wx.showToast({
				title: '认证成功！',
			})
		}else{
			wx.showModal({
				title: 'ERROR',
				content: '抱歉！认证错误！',
			})
		}
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