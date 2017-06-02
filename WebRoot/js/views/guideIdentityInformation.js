$(document).ready(function() {
	$("#next-btn").click(function() {
		clickNext();
	});
});

function clickNext() {
	var phone = $("#next-btn").attr("data"); /*获取后台的值*/
	var name = $("#name"),
		age = $("#age"),
		city = $("#city_name"),
		idImg = $("#idImg");
	if (name.val() == "") {
		var txt = "店名不能为空！";
		window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
	} else if (!name.val().match(/^[a-zA-Z\u4E00-\u9FA5]{2,15}$/)) {
		var txt = "请输入合格店名";
		window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
	} else if (age.val() == "") {
		var txt = "年龄不能为空";
		window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
	} else if (!age.val().match(/^(?:[1-9]?\d|120)$/)) {
		var txt = "请输入合格0 - 120之间的年龄！";
		window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
	} else if (city.val() == "") {
		var txt = "请选择城市！";
		window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
	} else if (idImg.attr("src") == "") {
		var txt = "请选择身份证！";
		window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
	} else {
		var cityname = $("#expressArea .city-value").html();
		$.post('uploadIDPictures.jsp', {
			image: $("#basetxt").val() + "#zhl" + phone
		}, function(msg) {
			window.location = "guideCardInformation.jsp?name=" + name.val() + "&age=" + age.val() + "&city=" + cityname;
		});
	}
}



/*城市選擇*/
var expressArea, areaCont, areaList = $("#areaList"),
	areaTop = areaList.offset().top;

$(function() {
	/*打开省市区选项*/
	$("#expressArea").click(function() {
		$("#areaMask").fadeIn();
		$("#areaLayer").animate({
			"bottom": 0
		}, 300);
		// 弹出省市选项时，让html,body的滚动条禁用
		$("html,body").css({
			overflow: "hidden",
			height: "100%"
		});
	});
	/*关闭省市区选项*/
	$("#areaMask, #closeArea").click(function() {
		clockArea();
	});
});

/*关闭省市区选项*/
function clockArea() {
	$("#areaMask").fadeOut();
	$("#areaLayer").animate({
		"bottom": "-100%"
	}, 300);
	intProvince();
}

/*初始化省份*/
function intProvince() {
	areaCont = "";
	for (var i = 0; i < province.length; i++) {
		areaCont += '<li onClick="selectP(' + i + ');">' + province[i] + '</li>';
	}
	areaList.html(areaCont);
	$("#areaBox").scrollTop(0);
	$("#backUp").removeAttr("onClick").hide();
	// 恢复html,body的滚动条
	$("html,body").removeAttr("style");
}
intProvince();

/*选择省份*/
function selectP(p) {
	areaCont = "";
	areaList.html("");
	for (var j = 0; j < city[p].length; j++) {
		areaCont += '<li onClick="selectC(' + p + ',' + j + ');">' + city[p][j] + '</li>';
	}
	areaList.html(areaCont);
	$("#areaBox").scrollTop(0);
	expressArea = province[p];

	if (expressArea == "北京市" || expressArea == "天津市" || expressArea == "上海市" || expressArea == "重庆市") {
		$("#expressArea .city-value").html(expressArea);
		clockArea();
	} else {
		$("#backUp").attr("onClick", "intProvince();").show();
	}
}

/*选择城市*/
function selectC(p, c) {
	clockArea();
	var sCity = city[p][c];
	expressArea += " - " + sCity;
	$("#expressArea .city-value").html(expressArea);
}

/*图像裁剪*/
$(function() {

	function toFixed2(num) {
		return parseFloat(+num.toFixed(2));
	}

	$('#cancleBtn').on('click', function() {
		$("#showEdit").fadeOut();
		$('#showResult').fadeIn();
	});

	$('#confirmBtn').on('click', function() {
		$("#showEdit").fadeOut();

		var $image = $('#report > img');
		var dataURL = $image.cropper("getCroppedCanvas");
		var imgurl = dataURL.toDataURL("image/jpeg", 0.5);
		$("#changeAvatar > img").attr("src", imgurl);
		$("#basetxt").val(imgurl);
		$('#showResult').fadeIn();

	});

	function cutImg() {
		$('#showResult').fadeOut();
		$("#showEdit").fadeIn();
		var $image = $('#report > img');
		$image.cropper({
			aspectRatio: 5 / 3,
			autoCropArea: 0.7,
			strict: true,
			guides: false,
			center: true,
			highlight: false,
			dragCrop: false,
			cropBoxMovable: false,
			cropBoxResizable: false,
			zoom: -0.2,
			checkImageOrigin: true,
			background: false,
			minContainerHeight: 400,
			minContainerWidth: 300,
		});
	}

	function doFinish(startTimestamp, sSize, rst) {
		var finishTimestamp = (new Date()).valueOf();
		var elapsedTime = (finishTimestamp - startTimestamp);
		//$('#elapsedTime').text('压缩耗时： ' + elapsedTime + 'ms');

		var sourceSize = toFixed2(sSize / 1024),
			resultSize = toFixed2(rst.base64Len / 1024),
			scale = parseInt(100 - (resultSize / sourceSize * 100));
		$("#report").html('<img src="' + rst.base64 + '" style="width: 100%;height:100%">');
		cutImg();
	}

	$('#image').on('change', function() {
		var startTimestamp = (new Date()).valueOf();
		var that = this;
		lrz(this.files[0], {
				width: 800,
				height: 800,
				quality: 0.7
			})
			.then(function(rst) {
				//console.log(rst);
				doFinish(startTimestamp, that.files[0].size, rst);
				return rst;
			});
	});
});