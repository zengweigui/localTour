var userphone = localStorage.getItem("uphone");
$(document).ready(function() {
	// 判断是否登录
	if (userphone == "" || userphone == null) {
		$(".login-out").show();
	} else {
		// 获取用户头像
		$(".user-box").show();
	}
	
	// 加载全部订单和获取客户信息
	$.ajax({
		url: "ajax/userGetOrderAjax.jsp",
		type: "post",
		async: false,
		data: {
			"uphone": userphone,
			"ship": 2,
			"refund": 2
		},
		success: function(orderJson) {
			var orderJson = eval('(' + orderJson + ')');
			
			$.each(orderJson[1], function(index, item) {
				$(".user-avatar img").attr("src", "../BYSJIMG/userAvatarImg/" + item.head);
			});
			
			if (getJsonLength(orderJson[0]) == 0) {
				$(".loading").show().html("暂无订单");
			} else {
				$(".loading").hide().html("");
				creatOrder(orderJson);
			}
		}
	});

    //订单按钮
	$(document).on('click', '.refund-box button', function() {
    	var that = $(this),
    		oid = that.attr("data-oid"),
			dataRefund = that.attr("data-refund"),
			dataShip = that.attr("data-ship");

    	if (dataShip == "0" && dataRefund == "1") { // 未发货，并且还未取消订单
    		var txt = "你确定要取消订单吗？";
            var option = {
                title: "猪猪旅行",
                btn: parseInt("0011", 2),
                onOk: function() {
                	$.ajax({
                		url: "ajax/userSetOrderStateAjax.jsp",
                		type: "post",
                		async: false,
                		data: {
                			"id": oid,
                			"ship": 0,
                			"refund": 0
                		},
                		success: function(data) {
                            that.css({
                                "backgroundColor": "#ccc",
                                "border": "1px solid #ccc",
                                "color": "#fff"
                            }).html("已取消订单").attr("disabled", true);
                		}
                	});
                }
            };
            window.wxc.xcConfirm(txt, "custom", option);
    	} else if (dataShip == "1" && dataRefund == "1") { // 已发货，并且还未确认订单
    		$.ajax({
        		url: "ajax/userSetOrderStateAjax.jsp",
        		type: "post",
        		async: false,
        		data: {
        			"id": oid,
        			"ship": 1,
        			"refund": 0
        		},
        		success: function(data) {
                    that.css({
                        "backgroundColor": "#ccc",
                        "border": "1px solid #ccc",
                        "color": "#fff"
                    }).html("已确认").attr("disabled", true);
        		}
        	});
    	}
    });

    // 订单分类
	$('.order-list span').click(function() {
		var that = $(this);
		if (!that.hasClass('spanActive')) {
			var dataShip = that.attr("data-ship"),
				dataRefund = that.attr("data-refund");
			console.log(dataRefund);
			
        	$(".loading").show().html("加载中...");
        	
			$.ajax({
				url: "ajax/userGetOrderAjax.jsp",
				type: "post",
				async: false,
				data: {
					"uphone": userphone,
					"ship": dataShip,
					"refund": dataRefund
				},
				success: function(orderJson) {
					var orderJson = eval('(' + orderJson + ')');
					
					$(".myOrder-box").remove();
					//使用siblings()来选择同辈元素，为当前点击的li添加li-active类，再将同辈元素的class移除。
					that.addClass("spanActive").siblings().removeClass("spanActive");
					
					if (getJsonLength(orderJson[0]) == 0) {
						$(".loading").show().html("暂无订单");
					} else {
						$(".loading").hide().html("");
						creatOrder(orderJson);
					}
				}
			});
		}
	});
	
	// 创建订单
	function creatOrder(orderJson) {
		console.log($.trim(orderJson));
		console.log(orderJson[0]);
		console.log(getJsonLength(orderJson[0]));
		
		var orderList, myOrderBox, guideInfo, userHead, pUsername, spanUsername, packageTitle, purchaseInfo, spanNum,
		spanMoney, refundBox, buyingTime, refundBtn;
		
		orderList = $(".order-list");
		$.each(orderJson[0], function(index, item) {

			userHead = $('<img />');
			userHead.addClass("user-head");

			spanUsername = $('<span></span>');
			spanUsername.addClass("spanUsername");

			pUsername = $('<p></p>');
			pUsername.append(spanUsername);

			guideInfo = $('<div></div>');
			guideInfo.addClass("guide-info");
			guideInfo.attr({
				"data-oid": item.id
			});
			guideInfo.append(userHead, pUsername);

			packageTitle = $('<p></p>');
			packageTitle.addClass("package-title");
			packageTitle.attr({
				"data-oid": item.id
			});
			packageTitle.append(item.title);

			spanNum = $('<span></span>');
			spanNum.append(item.num);

			spanMoney = $('<span></span>');
			spanMoney.append(item.money);

			purchaseInfo = $('<p></p>');
			purchaseInfo.addClass("purchase-info");
			purchaseInfo.attr({
				"data-oid": item.id
			});
			purchaseInfo.append("出团人数为：", spanNum, "人，实付￥", spanMoney);

			buyingTime = $('<span></span>');
			buyingTime.addClass("buying-time");
			buyingTime.append(item.tourTime);

			refundBtn = $('<button></button>');
			refundBtn.attr({
				"data-refund": item.refund,
				"data-ship": item.ship,
				"data-oid": item.id
			});
			if (item.ship == 0) { // 待发货
				if (item.refund == 0) { // 已取消订单
					refundBtn.addClass("already-refund");
					refundBtn.attr("disabled", true);
					refundBtn.append("已取消订单");
		        } else if (item.refund == 1) { // 未取消订单
		        	refundBtn.addClass("refund");
					refundBtn.append("取消订单");
		        }
			} else if (item.ship == 1) { // 已发货
				if (item.refund == 0) { // 已确认订单
					refundBtn.addClass("already-refund");
					refundBtn.attr("disabled", true);
					refundBtn.append("已确认订单");
		        } else if (item.refund == 1) { // 未确认订单
		        	refundBtn.addClass("refund");
					refundBtn.append("确认订单");
		        }
			}
	
			refundBox = $('<div></div>');
			refundBox.addClass("refund-box");
			refundBox.append(buyingTime, refundBtn);

			myOrderBox = $('<div></div>');
			myOrderBox.addClass("myOrder-box");
			myOrderBox.attr({
				"data-oid": item.id
			});
			myOrderBox.append(guideInfo, packageTitle, purchaseInfo, refundBox);

			orderList.after(myOrderBox);
		});

		$.each(orderJson[1], function(index, item) {
			$(".user-head").attr("src", "../BYSJIMG/userAvatarImg/" + item.head);
			$(".spanUsername").html(item.username);
		});
	}

	//鼠标的移入移出 - 显示隐藏.user-list
	$(".user-box").mouseover(function() {
		$(".user-list").show();
	}).mouseout(function() {
		$(".user-list").hide();
	});
	
	// 进入订单详细
	$(document).on('click', ".guide-info, .package-title, .purchase-info", function() {
		var that = $(this),
			dataOid = that.attr("data-oid");
		window.location = "orderDetails.jsp?oid=" + dataOid;
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
	// 购物车
	$(".userShoppingCart").click(function() {
		clickJump("userShoppingCart");
	});
	// 首页
	$(".userHome").click(function() {
		clickJump("userHome");
	});
	// 旅行产品
	$(".userTourList").click(function() {
		clickJump("userTourList");
	});

	// 退出登录
	$(".sign-out").click(function() {
		localStorage.removeItem("uphone");
		window.location = "login.jsp";
	});
});

// 获取json的长度
function getJsonLength(jsonData){
	var jsonLength = 0;
	for(var item in jsonData){
		jsonLength++;
	}
	return jsonLength;
}