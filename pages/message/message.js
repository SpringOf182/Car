var utils = require("../../utils/util.js");
var app = getApp();
var url = app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  chatCardList: [
		  {
			  "receiverUID": "0",
			  "image": "/images/test/test1.jpg",
			  "nickName": "啊哈！",
			  "message": "好哒",
			  "time": "13:40",
		  },
		  {
			  "receiverUID": "idTest2",
			  "image": "/images/test/test2.jpg",
			  "nickName": "陌归",
			  "message": "OK",
			  "time": "12:24",
		  },
		  {
			  "receiverUID": "idTest3",
			  "image": "/images/test/test3.jpg",
			  "nickName": "嘟嘟噜",
			  "message": "麻烦你啦~",
			  "time": "2019-11-22",
		  }
		],
  },

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		//this.getChatList();
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
	  //this.getChatList();
  },

  getChatList:function(){
	  var receiverID = wx.getStorageSync('userID');
	  var data={
		  "receiverUID":receiverID,
		  "RequestType":"ShowNewMessage"
	  }
	  console.log("消息列表即将被请求")
	  console.log(receiverID);
	  utils.httpPOST(url,data,this.setChatList)
  },

  setChatList:function(data){
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