// pages/message/chat/chat.js
var utils = require("../../../utils/util.js");
var app = getApp();
var url = app.globalData.url;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		senderID:"",
		portraitUrl: "",
		nickName: "",
		currentMessage:"",
		messageRecord: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var receiverUID = decodeURIComponent(options.senderUID);
		var image = decodeURIComponent(options.image);
		var nickName = decodeURIComponent(options.nickName);
		console.log("receiverUID: " + receiverUID);
		console.log("image: " + image);
		console.log("nickName: " + nickName);
		this.setData({
			receiverID: receiverUID,
			portraitUrl: image,
			nickName: nickName
		})
		wx.setNavigationBarTitle({
			title: this.data.nickName
		})
		this.setData({
			senderID: wx.getStorageSync('userID')
		}) 
		this.getMessage();
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

	getMessage() {

		/*首次跳转到对话框，获取消息记录*/
		var data={
			"senderUID":this.data.senderID,
			"receiverUID":this.data.receiverID,
			"RequestType": "GetMessage",
		}
		console.log(data);
		utils.httpPOST(url, data, this.reverseMessage);
	},

	reverseMessage: function (data) {
		console.log(data);
		var originArray=[];
		for (var idx in data.messageList){
			originArray.push(data.messageList[idx])
		}
		console.log("originArray:");
		console.log(originArray);
		var reversdList = utils.reverse(originArray);
		this.setData({
			messageRecord: reversdList,
			//toLast:`item${this.data.messageRecord.length}`
		})
		this.processMessage();
	},

	processMessage: function () {
		var tempArray=this.data.messageRecord;
		console.log(tempArray);
		var userID = wx.getStorageSync('userID');
		for (var idx in this.data.messageRecord){
			var judge = "messageRecord[" + idx + "].isMine"
			if (tempArray[idx].senderUID == userID){
				this.setData({
					[judge] : true
				})
			} else if (tempArray[idx].receiverUID == userID){
				this.setData({
					[judge]: false
				})
			}
		}
		console.log(tempArray);
		var timeProcessedArray = utils.timeProcess(tempArray);
		this.setData({
			messageRecord:timeProcessedArray
		})
	},

	inputMessage: function (e){
		this.setData({
			currentMessage: e.detail.value
		})
	},

	sendMessage:function(){
		//var time = utils.formatTime(new Date());
		Date.now() ;
		var time = utils.getTime(new Date);
		var data = {
			"senderUID": wx.getStorageSync('userID'),
			"receiverUID": this.data.receiverID,
			"message": this.data.currentMessage,
			"time": time,
			"RequestType":"SendMessage",
		}
		console.log(data)
		utils.httpPOST(url,data,this.sendFeedback)
	},
	sendFeedback:function(data){
		console.log(data)
		if(data.Result=="success"){
			this.getMessage();
			this.setData({
				currentMessage:"",
			})
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