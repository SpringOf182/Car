// pages/order/order.js
var utils = require("../../utils/util.js");
var app = getApp();
var url = app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
		showRelease:true,
		showReceive:false,
		phoneNumber:111,//测试数据
		releaseEmpty:false,
		receiveEmpty: false,
		releaseOrderList: [],
		receiveOrderList:[],
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var userID=wx.getStorageSync('userID');
		this.setData({
			userID: userID
		})
		this.onReleaseTap();
	},

	onReleaseTap: function () {
		wx.showLoading({
			title: '加载中',
		})
    this.setData({
      showRelease:true,
      showReceive:false,
	  });
	  var data = {
		  "UID": this.data.userID,
		  "RequestType": "ShowUserPublishOrder",
	  };
	  console.log("get my release");
	  console.log(data);
	  utils.httpPOST(url, data, this.getMyRelease)
	},

	getMyRelease(data) {
		wx.hideLoading();
		console.log("My Release");
		console.log(data);
		var myReleaseList = [];
		for (var idx in data.orderList) {
			myReleaseList.push(data.orderList[idx])
		}
		this.setData({
			releaseOrderList: myReleaseList
		})
		//console.log("releaseOrderList")
		//console.log(this.data.releaseOrderList)
		if (this.data.releaseOrderList == false) {
			this.setData({
				releaseEmpty: true
			})
		} else {
			this.setData({
				releaseEmpty: false
			})
		}
		console.log("releaseEmpty")
		console.log(this.data.releaseEmpty)
	},

	onReceiveTap: function () {
		wx.showLoading({
			title: '加载中',
		})
    this.setData({
      showRelease: false,
      showReceive: true,
	  })
	  var data = {
		  "recipentUID": this.data.userID,
		  "RequestType": "ShowUserAcceptOrder",
	  };
	  console.log("get my Receive");
	  console.log(data);
	  utils.httpPOST(url, data, this.getMyReceive)
	},

	getMyReceive(data) {
		wx.hideLoading();
		console.log("My Receive");
		console.log(data);
		var myReceiveList = [];
		for (var idx in data.orderList) {
			myReceiveList.push(data.orderList[idx])
		}
		this.setData({
			receiveOrderList: myReceiveList
		})
		if (this.data.receiveOrderList == false) {
			this.setData({
				receiveEmpty: true
			})
		} else {
			this.setData({
				receiveEmpty: false
			})
		}
		console.log("receiveEmpty")
		console.log(this.data.receiveEmpty)
	},

  onReceiveMoreTap: function (event) {
    var OID=event.target.dataset.orderid;
    console.log("oid");
    console.log(OID);
    var receiveOrderList=this.data.receiveOrderList;
    for(var idx in receiveOrderList){
      if(OID==receiveOrderList[idx].OID){
        var receiveDetail = encodeURIComponent(JSON.stringify(receiveOrderList[idx]));
        console.log("receiveDetail");
        console.log(receiveDetail);
      }
    }
    wx.navigateTo({
      url: 'receiveDetail/receiveDetail?receiveDetail=' + receiveDetail
    })
  },

	onPublishTap:function(){
		wx.navigateTo({
			url: 'publish/publish'
		})
	},

	cancelOrder: function (event) {
		var OID = event.target.dataset.orderid;
		//var oid = event.target.dataset.orderid;
		console.log("OID:"+OID);
		var data={
			"OID":OID,
			"RequestType":"CancelOrder"
		}
		console.log("cancel request:"+ data);
		utils.httpPOST(url,data,this.showCancelResult)
	},
	showCancelResult:function(data){
		if(data.Result=="success"){
			wx.showToast({
				title: '订单已取消',
				icon: 'succes',
				duration: 1000,
				mask: true
			})
		}else{
			wx.showModal({
				title: '失败',
				content: '抱歉，请稍后再试',
				showCancel:false,
			})
		}
	},

	completeOrder:function(){
		var OID = event.target.dataset.orderid;
		//var oid = event.target.dataset.orderid;
		console.log("OID:" + OID);
		var data = {
			"OID": OID,
			"RequestType": "FinishOrder"
		}
		console.log("cancel request:" + data);
		utils.httpPOST(url, data, this.showCompleteResult)
	},
	showCompleteResult: function (data) {
		if (data.Result == "success") {
			wx.showToast({
				title: '订单已完成',
				icon: 'succes',
				duration: 1000,
				mask: true
			})
		} else {
			wx.showModal({
				title: '失败',
				content: '抱歉，请稍后再试',
				showCancel: false,
			})
		}
	},

	toOrderMarket:function(){
		wx.navigateTo({
			url: '/pages/find/find',
		})
	},

	createChatRelease: function (e) {
		var data = e.target.dataset.theother;
		console.log("data");
		console.log(data);
		var nickName;
		var data = {
			"UID": data.recipentUID,
			"RequestType": "ShowUserInfo"
		}
		utils.httpPOST(url, data, function (data) {
			nickName = data.nickName;
		});
		wx.navigateTo({
			url: '/pages/message/chat/chat?senderUID=' + data.recipentUID + '&image=' + data.image + '&nickName=' + nickName
		})
	},

	createChatReceive:function(e){
		var data = e.target.dataset.theother;
		//console.log("data");
		//console.log(data);
		var nickName;
		var data = {
			"UID": data.UID,
			"RequestType": "ShowUserInfo"
		}
		//console.log(data);
		utils.httpPOST(url, data, function (data) {
			console.log("回调函数：")
			console.log(data);
			nickName = data.nickName;
		});
		wx.navigateTo({
			url: '/pages/message/chat/chat?senderUID=' + data.UID + '&image=' + data.image + '&nickName=' + nickName
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
	  if(this.data.showRelease){
		  //this.onReleaseTap()
	  }else{
		  //this.onReceiveTap()
	  }
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
