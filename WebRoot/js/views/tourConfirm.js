var userphone = localStorage.getItem("uphone");
$(document).ready(function() {
	// 判断是否登录
	if (userphone == "" || userphone == null) {
		$(".login-out").show();
	} else {
		// 获取用户头像
		$(".user-box").show();
	}

	//鼠标的移入移出 - 显示隐藏.user-list
	$(".user-box").mouseover(function() {
		$(".user-list").show();
	}).mouseout(function() {
		$(".user-list").hide();
	});

	subtract();
	add();

	// 弹出时间选择
	$(".package-time").click(function() {
		$(".pop-package-time").animate({
			"left": "0",
			"-webkit-opacity": "1",
			"opacity": "1",
			"filter": "alpha(opacity=100)"
		}, 300);
	});

	// 时间选择弹出框返回按钮
	$(".select-time-return").click(function() {
		hideSelectTimeReturn();
	});

	// 时间选择弹出框隐藏
	function hideSelectTimeReturn() {
		$(".pop-package-time").animate({
			"left": "100%",
			"-webkit-opacity": "0",
			"opacity": "0",
			"filter": "alpha(opacity=0)"
		}, 300);
	}

	// 日期初始化
	$('#calendar').datepicker({
		inline: true,
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		showOtherMonths: true,
		selectOtherMonths: true,
		minDate: 0,
		maxDate: "+1M",
		/* +1M +10D 加一个月10天 */
		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
		onSelect: function(dateText, inst) { //选中事件
			console.log(dateText);
			dateTextSplit = dateText.split('-'); //日期为输入日期，格式为 2013-3-10
			var week = new Date(dateTextSplit[0], parseInt(dateTextSplit[1] - 1), dateTextSplit[2]);
			week.getDay(); //就是你要的星期几
			console.log(week.getDay());
			$(".package-time-value").html(dateText);
			hideSelectTimeReturn();
		}
	});

	// 立即支付
	$(".purchase").click(function() {
		var name = $("#name"),
			phone = $("#phone"),
			packageTimeValue = $(".package-time-value").html(); // 出行时间

		if (name.val() == "") {
			var txt = "姓名不能为空！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
		} else if (!name.val().match(/^[a-zA-Z\u4E00-\u9FA5]{2,10}$/)) {
			var txt = "请输入合格姓名";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
		} else if (phone.val() == "") {
			var txt = "请输入手机号！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
		} else if (!phone.val().match(/^1[34578]\d{9}$/)) {
			var txt = "请输入正确的手机号！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
		} else if (packageTimeValue == "选择出行时间") {
			var txt = "请选择出行日期！";
			window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
		} else {
			var contactsName = name.val(), // 姓名
				contactsPhone = phone.val(), // 手机号
				totalPrice = $("#total-price").html(), // 总金额
				sum = parseInt($("#purchase-number").html()); // 总数
			$.ajax({
				url: "ajax/purchaseOrderAjax.jsp",
				type: "post",
				data: {
					"totalPrice": totalPrice,
					"sum": sum,
					"uphone": userphone,
					"packageTimeValue": packageTimeValue,
					"contactsName": contactsName,
					"contactsPhone": contactsPhone
				},
				success: function(data) {
					var data = $.trim(data);
					if (data == "success") {
						window.location = "paymentSuccessful.html";
					}
				}
			});
		}
	});

    // 页面跳转函数
    function clickJump(link) {
        window.location = link + ".jsp?uphone=" + userphone;
    }
    // 个人中心
    $(".userCenter").click(function() {
        clickJump("userCenter");
    });
    // 我的订单
    $(".userOrder").click(function() {
        clickJump("userOrder");
    });
    // 首页
    $(".userHome").click(function() {
        clickJump("userHome");
    });
    // 旅行产品
    $(".userTourList").click(function() {
        clickJump("userTourList");
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

/*减*/
function subtract() {
	$("#subtract").click(function() {
		var basePrice = parseInt($("#total-price").attr("data-base-price")); // 价格
		var purchaseNumber = parseInt($("#purchase-number").html()); // 套数

		if (purchaseNumber < 2) { // 如果套数小于2则不执行减
			return false;
		} else {
			var totalPrice = (basePrice * purchaseNumber) - basePrice; // 总价
			purchaseNumber = purchaseNumber - 1;
			$("#total-price").html(totalPrice);
			$("#purchase-number").html(purchaseNumber);
		}
	});
}
/*加*/
function add() {
	$("#add").click(function() {
		var basePrice = parseInt($("#total-price").attr("data-base-price")); // 保底价
		var purchaseNumber = parseInt($("#purchase-number").html()); // 套数

		var totalPrice = parseInt(basePrice + (basePrice * purchaseNumber)); // 总价
		purchaseNumber = purchaseNumber + 1;
		$("#purchase-number").html(purchaseNumber);
		$("#total-price").html(totalPrice);
	});
}