// pages/find/find.js
var utils = require("../../utils/util.js");
var app = getApp();
var urlG = app.globalData.url;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pointArray: ['请选择','梅园', '楠园', '竹园', '橘园', '桃园', '李园', '杏园', '西师街'],
    companyArray: ['请选择','顺丰','中通','圆通','申通','百世汇通','韵达','德邦','其他'],
    pickUpIndex:0,
    deliverIndex:0,
    companyIndex:0,
    selectedOrderList:[]
  },
	bindchangePickUpPoint:function(e){
		this.setData({
			pickUpIndex:e.detail.value,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  console.log("url")
	  console.log(urlG)
	  var data = {
		  "RequestType": "OrderMarket",
	  };
	  wx.showLoading({
		  title: '加载中',
		})
		var url = urlG+"OrderMarket";
	  utils.httpPOST(url,data,this.getOrderMarket);
  },

	getOrderMarket(data) {
		wx.hideLoading();
		console.log("OrderMarket");
		console.log(data);
		var orderMarket = [];
		for(var idx in data.orderList){
			orderMarket.push(data.orderList[idx])
		}
		this.setData({
			selectedOrderList: orderMarket
		})
		console.log("selectedOrderList"),
		console.log(this.data.selectedOrderList)
	},
	onSelectTap:function(){
		var data = {
			"pickUp": this.data.pointArray[this.data.pickUpIndex],
			"delivery": this.data.pointArray[this.data.deliverIndex],
			"company": this.data.companyArray[this.data.companyIndex],
			"RequestType": "OrderSelect",
		}
		console.log("Selected Data:");
		console.log(data);
		wx.showLoading({
			title: '加载中',
		})
		var url = urlG+"OrderSelect";
		utils.httpPOST(url, data, this.getSelectedOrder)
	},
	getSelectedOrder(data) {
		wx.hideLoading();
		console.log("Selected order return value:");
		console.log(data);
		var selectedOrder = [];
		for (var idx in data.orderList) {
			selectedOrder.push(data.orderList[idx])
		}
		this.setData({
			selectedOrderList: selectedOrder
		})
	},

	onReceiveMoreTap: function (event) {
		var oid = event.target.dataset.orderid;
		console.log("oid");
		console.log(oid);
		var selectedOrderList = this.data.selectedOrderList;
		for (var idx in selectedOrderList) {
			if (oid == selectedOrderList[idx].OID) {
				var receiveDetail = encodeURIComponent(JSON.stringify(selectedOrderList[idx]));
				console.log("receiveDetail");
				console.log(receiveDetail);
			}
		}
		wx.navigateTo({
			url: 'receive/receive?receiveDetail=' + receiveDetail
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
		//this.onSelectTap();
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

	},
})