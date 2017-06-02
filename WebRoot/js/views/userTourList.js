var userphone = localStorage.getItem("uphone");
var searchCity = localStorage.getItem("city");
$(document).ready(function() {
	// 判断是否登录
	if (userphone == "" || userphone == null) {
		$(".login-out").show();
	} else {
		// 获取用户头像
		$(".user-box").show();
	}

	// 一进来根据本地存储的城市，搜索并创建产品
	$.ajax({
		url: "ajax/userSearchProductAjax.jsp",
		type: "post",
		async: false,
		data: {
			"city": $.trim(searchCity)
		},
		success: function(productJson) {
			var productJsonLength = $.trim(productJson.toString()).length;
			console.log(productJsonLength);
			if (productJsonLength == 2) { // 如果是空，productJson.toString()的值为{}，所以长度为2
				$(".loading").html("此城市无产品");
			} else {
				$(".loading").hide();
				createProduct(productJson);
			}
		}
	});
	
	$(".all-order").click(function() {
		$(".toulist-box").remove(); // 将之前的删掉
		$(".loading").show().html("加载中...");
		$.get("ajax/userSearchAllProductAjax.jsp", function(productJson) {
			var productJsonLength = $.trim(productJson.toString()).length;
			console.log(productJsonLength);
			if (productJsonLength == 2) { // 如果是空，productJson.toString()的值为{}，所以长度为2
				$(".loading").html("此城市无产品");
			} else {
				$(".loading").hide();
				$(".city-value").html("全部城市");
				createProduct(productJson);
			}
		});
	});

	// 将本地的省市获取，然后放进省市选择中
	(function() {
		var province = localStorage.getItem("province");
		var city = localStorage.getItem("city");
		$(".city-value").html(province + " - " + city);
	})();

	//鼠标的移入移出 - 显示隐藏.user-list
	$(".user-box").mouseover(function() {
		$(".user-list").show();
	}).mouseout(function() {
		$(".user-list").hide();
	});
	
	// 点击进入产品详细页
	$(document).on('click', '.toulist-box', function() {
        var that = $(this),
            tId = that.attr("data-tid");
        window.location = "tourDetails.jsp?tid=" + tId;
    });

	// 页面跳转函数
	function clickJump(link) {
		window.location = link + ".jsp?uphone=" + userphone;
	}
	// 首页
	$(".userHome").click(function() {
		clickJump("userHome");
	});
	// 个人中心
	$(".userCenter").click(function() {
		clickJump("userCenter");
	});
	// 我的订单
	$(".userOrder").click(function() {
		clickJump("userOrder");
	});
	// 购物车
	$(".userShoppingCart").click(function() {
		clickJump("userShoppingCart");
	});

	// 退出登录
	$(".sign-out").click(function() {
		localStorage.removeItem("uphone");
		window.location = "login.jsp";
	});
});
// 动态创建产品
function createProduct(productJson) {
	var productJson = eval('(' + productJson + ')');
	console.log(productJson);
	$.each(productJson, function(index, item) {
		console.log(item);
		item = eval('(' + item + ')');
		
		var loading, toulistBox, imgBox, img, toulistDesc, spanPrice, spanCity, groundBox, pTitle;

		loading = $(".loading");

		img = $('<img />');
		img.attr("src", "../BYSJIMG/tripBg/" + item.bimages);

		// 价格
		spanPrice = $('<span></span>');
		spanPrice.append(item.price);

		// 城市
		spanCity = $('<span></span>');
		spanCity.append(item.city);

		// 价格、城市 div
		toulistDesc = $('<div></div>');
		toulistDesc.addClass("toulist-desc");
		toulistDesc.append(spanPrice, spanCity);

		// .img-box
		imgBox = $('<div></div>');
		imgBox.addClass("img-box");
		imgBox.append(img, toulistDesc);

		// 标题
		pTitle = $('<p></p>');
		pTitle.append(item.title);

		// ground-box
		groundBox = $('<div></div>');
		groundBox.addClass("ground-box");
		groundBox.append(pTitle);

		// toulist-box
		toulistBox = $('<div></div>');
		toulistBox.addClass("toulist-box");
		toulistBox.attr("data-tid", item.id);
		toulistBox.append(imgBox, groundBox);

		// 在loading前面添加toulistBox
		loading.before(toulistBox);
	});
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
		// 搜索城市
		$(".toulist-box").remove(); // 将之前的删掉
		$(".loading").show().html("加载中...");
		$.ajax({
			url: "ajax/userSearchProductAjax.jsp",
			type: "post",
			async: false,
			data: {
				"city": $.trim(expressArea)
			},
			success: function(productJson) {
				var productJsonLength = $.trim(productJson.toString()).length;
				console.log(productJsonLength);
				if (productJsonLength == 2) { // 如果是空，productJson.toString()的值为{}，所以长度为2
					$(".loading").html("此城市无产品");
				} else {
					$(".loading").hide();
					createProduct(productJson);
				}
			}
		});
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
	// 搜索城市
	$(".toulist-box").remove(); // 将之前的删掉
	$(".loading").show().html("加载中...");
	$.ajax({
		url: "ajax/userSearchProductAjax.jsp",
		type: "post",
		async: false,
		data: {
			"city": $.trim(sCity)
		},
		success: function(productJson) {
			var productJsonLength = $.trim(productJson.toString()).length;
			console.log(productJsonLength);
			if (productJsonLength == 2) { // 如果是空，productJson.toString()的值为{}，所以长度为2
				$(".loading").html("此城市无产品");
			} else {
				$(".loading").hide();
				createProduct(productJson);
			}
		}
	});
}