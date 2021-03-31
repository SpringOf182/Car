var utils = require("../../utils/util.js");
var app = getApp();
var urlG = app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  chatCardList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		this.getChatList();
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
	  this.getChatList();
  },

  getChatList:function(){
	  var receiverID = wx.getStorageSync('userID');
	  var data={
		  "receiverUID":receiverID,
		  "RequestType":"ShowNewMessage"
	  }
	  console.log("消息列表即将被请求")
	  console.log(receiverID);
	  wx.showLoading({
		  title: '加载中',
	  })
    var url = urlG + "ShowNewMessage";
	  utils.httpPOST(url,data,this.setChatList)
  },

	setChatList: function (data) {
		wx.hideLoading();
	  console.log(data);
	  this.setData({
		  chatCardList: data.messageList
	  })
	  console.log("chatCardList");
	  console.log(this.data.chatCardList);
	  this.setData({
		  chatCardList: utils.timeProcess(this.data.chatCardList)
	  })
  },

  openDialogBox:function(event){
	  var senderUID = event.target.dataset.chat;
	  console.log("senderUID");
	  console.log(senderUID);
	  var chatCardList = this.data.chatCardList;
	  for (var idx in chatCardList) {
		  if (senderUID == chatCardList[idx].senderUID) {
			  //var senderUID = encodeURIComponent(JSON.stringify(chatCardList[idx].senderUID));
			  var senderUID = encodeURIComponent(chatCardList[idx].senderUID);
			  //var image = encodeURIComponent(JSON.stringify(chatCardList[idx].image));
			  var image = encodeURIComponent(chatCardList[idx].image);
			  //var nickName = encodeURIComponent(JSON.stringify(chatCardList[idx].nickName));
			  var nickName = encodeURIComponent(chatCardList[idx].nickName);
			  console.log("senderUID: " + senderUID);
			  console.log("image: " + image);
			  console.log("nickName: " + nickName);
		  }
	  }
	  wx.navigateTo({
		  url: 'chat/chat?senderUID=' + senderUID + '&image=' + image + '&nickName=' + nickName
	  })
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