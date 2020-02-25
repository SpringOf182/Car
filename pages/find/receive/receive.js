// pages/find/receive/receive.js
var utils = require("../../../utils/util.js");
var app = getApp();
var url = app.globalData.url;
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
		var receiveDetail = JSON.parse(decodeURIComponent(options.receiveDetail));
		console.log("receiveDetail");
		console.log(receiveDetail);
		this.setData({
			receiveDetail: receiveDetail
		})
	},
	getPhoneNumber:function(e){
		this.setData({
			recipentPhoneNumber:e.detail.value
		})
	},
	receiveOrder:function(){
		if(this.data.recipentPhoneNumber==""){
			wx.showModal({
				title: '提示',
				content: '联系电话不可为空',
				showCancel:false,
			})
		} else {
			var receiverUID = wx.getStorageSync('userID');
			var data = {
				"OID": this.data.receiveDetail.OID,
				"recipentPhoneNumber": this.data.recipentPhoneNumber,
				"recipentUID": receiverUID,
				"RequestType": "AcceptOrder"
			}
			console.log("OID:" + this.data.receiveDetail.OID);
			console.log("recipentPhoneNumber:" + this.data.recipentPhoneNumber);
			console.log("receiverUID:" + receiverUID);
			utils.httpPOST(url, data, this.showResult)}
	},
	showResult:function(data){
		if(data.Result=='success'){
			wx.showToast({
				title: '接单成功',
				icon: 'succes',
				duration: 1000,
				mask: true
			})
		}else{
			wx.showModal({
				title: '提示',
				content: '抱歉，未能成功接单',
				showCancel:false
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