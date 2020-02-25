module.exports = {
	formatTime: formatTime,
	httpPOST: httpPOST,
	reverse: reverse,
	getTime: getTime,
	timeProcess: timeProcess,
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getTime(date) {
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()

	var hour = date.getHours()
	var minute = date.getMinutes()
	var second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function httpPOST(url,data,callBack){
  //console.log('httpPost已调用');
  wx.request({
    url: url,
    data: data,
    method: 'POST',
    header:{
		 'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    success: function(res){
      callBack(res.data)
    },
    error:function(res){
      console.log(data.RequestType + '接口调用失败')
    },
    fail: function(res){
      wx.hideLoading();
      wx.showModal({
        title: '请求失败',
        content: '服务器连接失败，请检查网络后再试！',
        showCancel: false,
      })
    }
  })
}

function reverse(array) {
	var temp = [];
	var newArray = [];
	for (var i = array.length - 1; i >= 0; i--) {
		temp[temp.length] = array[i];
	}
	for (var j = 0; j < temp.length; j++) {
		newArray[j] = temp[j];
	}
	return newArray
}



function timeProcess (array) {
	Date.now();
	var time = this.getTime(new Date);
	for (var idx in array) {
		var year = array[idx].time.slice(0, 3);
		var yearNow = time.slice(0, 3);
		if (year == yearNow) {
			var date = array[idx].time.slice(5, 9);
			var dateNow = time.slice(5, 9);
			if (date == dateNow){
				array[idx].time = array[idx].time.slice(11, 16);
			}else{
				array[idx].time = array[idx].time.slice(5, 16);
			}
		} else {
			array[idx].time = array[idx].time.slice(0, 16);
		}
	}
	return array;
}