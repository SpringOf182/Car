// pages/order/publish/publish.js
var utils = require("../../../utils/util.js");
var app = getApp();
var urlG = app.globalData.url;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		pointArray: ['请选择', '梅园', '楠园', '竹园', '橘园', '桃园', '李园', '杏园', '西师街'],
		companyArray: ['请选择', '顺丰', '中通', '圆通', '申通', '百世汇通', '韵达', '德邦', '其他'],
		pickUpIndex: 0,
		deliverIndex: 0,
		companyIndex: 0,
		price:0,
		weight:0,
		verificationCode:"",
		contactNumber:"",
		memo:"",
		latestDate: '请选择',
		chosenTime: '请选择',
		latestTime:"",
		max:200,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	bindchangePickUpPoint: function (e) {
		this.setData({
			pickUpIndex: e.detail.value,
		})
	},
	bindchangeDeliverPoint: function (e) {
		this.setData({
			deliverIndex: e.detail.value,
		})
	},
	bindchangeCompany: function (e) {
		this.setData({
			companyIndex: e.detail.value,
		})
	},
	priceBlur: function (e) {
		var price = e.detail.value;
		this.data.price = price;
		//console.log("price");
		//console.log(price);
	},
	weightBlur: function (e) {
		var weight = e.detail.value;
		this.data.weight = weight;
		//console.log("weight");
		//console.log(weight);
	},
	codeBlur: function (e) {
		var code = e.detail.value;
		this.data.verificationCode = code;
		//console.log("verificationCode");
		//console.log(code);
	},
	connectNumberBlur: function (e) {
		var contactNumber = e.detail.value;
		this.data.contactNumber = contactNumber;
		//console.log("contactNumber");
		//console.log(contactNumber);
	},
	memoBlur: function (e) {
		var memo = e.detail.value;
		this.data.memo = memo;
		//console.log("memo");
		//console.log(memo);
	},
	bindchangeDate:function(e){
		this.setData({
			latestDate: e.detail.value
		})
	},
	bindchangeTime: function (e) {
		this.setData({
			chosenTime: e.detail.value,
		})
		this.data.latestTime= this.data.latestDate + " " + this.data.chosenTime+":00";
		//console.log("latestTime")
		//console.log(this.data.latestTime)
	},

	onPublishTap:function(){
		var uid = wx.getStorageSync('userID');
		console.log('uid:'+uid);
		var data={
			"RequestType":"PublishOrder",
			"UID": uid,
			"pickUp": this.data.pointArray[this.data.pickUpIndex],
			"delivery": this.data.pointArray[this.data.deliverIndex],
			"company": this.data.companyArray[this.data.companyIndex],
			"price": this.data.price,
			"weight": this.data.weight,
			"verificationCode": this.data.verificationCode,
			"contactNumber": this.data.contactNumber,
			"memo": this.data.memo,
			"latestTime": this.data.latestTime,
		}
		console.log(data);
		wx.showLoading({
			title: '加载中',
		})
    var url = urlG + "PublishOrder";
		utils.httpPOST(url,data,this.publishFeedback);
	},
	publishFeedback: function (data) {
		wx.hideLoading();
		console.log("publishFeedback");
		console.log(data);
		if(data.Result=='success'){
			wx.showModal({
				title: '结果',
				content: '发布成功!',
				showCancel:false,
			})
		}else{
			wx.showModal({
				title: '失败',
				content: '请检查填写数据!',
				showCancel: false,
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