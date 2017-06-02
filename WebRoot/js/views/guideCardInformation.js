$(document).ready(function() {
	// 点击下一步
	$("#next-btn").click(function() {
		clickNext();
	});
});

// 下一步
function clickNext() {
	var gudieCard = $("#gudieCard"),
		cardImg = $("#cardImg");
	var phone = $("#next-btn").attr("data-phone"); /*获取后台的值*/
	var transfer = 0;

	if (gudieCard.val() == "") {
		var txt = "导游证号不能为空！";
		window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
	} else if (cardImg.attr("src") == "") {
		var txt = "请选择导游证！";
		window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
	} else {
		$.post('uploadGuideIDPictures.jsp', {
			image: $("#basetxt").val() + "#zhl" + phone
		}, function(msg) {
			window.location = "returnLogin.jsp?gudieCard=" + gudieCard.val() + "&transfer=" + transfer;
		});
	}
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
			aspectRatio: 2 / 3,
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