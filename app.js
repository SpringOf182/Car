//fafsafsafsafsafasfsa
//app.js
var utils = require("/utils/util.js");
var message
App({
	onLaunch: function () {
		var that = this;

    // 获取用户信息
    wx.getSetting({
      success: res => {
			if (res.authSetting['scope.userInfo']) {
				var userID = wx.getStorageSync('userID')
				//console.log(userID);
				if (userID == '') {
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
										var url = that.globalData.url;
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
				}
        }
      }
    })
	},

	getLoginInfo: function (data) {
		wx.hideLoading();
		console.log("login feedback:");
		console.log(data);
		wx.setStorageSync('userID', data.UID)
		wx.reLaunch({
			url: '/pages/home/home'
		})
	},

  globalData: {
    acToken: '',
	  url: "http://www.swupanta.top:8080/car/*",
    trainUrl: '',
    newsList: ''
  },
})