var userphone = localStorage.getItem("uphone");
var dataClickTime; // 用来存选择日期的当前点击对象
$(document).ready(function() {
	// 判断是否登录
	/*if (userphone == "" || userphone == null) {
		$(".login-out").show();
	} else {
		// 获取用户头像
		$(".user-box").show();
	}*/
	
	//鼠标的移入移出 - 显示隐藏.user-list
	$(".user-box").mouseover(function() {
		$(".user-list").show();
	}).mouseout(function() {
		$(".user-list").hide();
	});
	
	// 弹出时间选择
	$(".package-time").click(function() {
		var that = $(this);
		dataClickTime = that;
		console.log(dataClickTime);
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
			console.log(dataClickTime);
			dataClickTime.html(dateText);
			hideSelectTimeReturn();
		}
	});
	
	// 删除购物车
	$(".del").click(function() {
		var that = $(this);
		var txt = "您确定要删除此产品吗？";
        var option = {
            title: "提示",
            btn: parseInt("0011", 2),
            onOk: function() {
            	var dataTid = that.attr("data-tid"),
	    			dataShoppingCartString = $(".hinput").attr("data-shoppingCartString"),
	    			dataShoppingCartArr = new Array();
	    		
	    		dataShoppingCartArr = dataShoppingCartString.split(",");
	    		dataShoppingCartArr = $.grep(dataShoppingCartArr, function(value) {
	    			return value != dataTid;
	    		});
	    		
	    		if (dataShoppingCartArr == "") {
	    			dataShoppingCartString = "[]";
	    		} else {
	    			
	    			dataShoppingCartString = dataShoppingCartArr.join(",");
	    		}
	    		
	    		console.log(dataShoppingCartString);
	    		
	    		$.ajax({
	                url: "ajax/addShoppingCartAjax.jsp",
	                type: "post",
	                async: false,
	                data: {
	                    "uphone": userphone,
	                    "shoppingCartArr": dataShoppingCartString
	                },
	                success: function(data) {
	                    var data = $.trim(data);
	                    if (data == "success") {
	                    	$(".hinput").attr("data-shoppingCartString", dataShoppingCartString);
	                    	that.parents("tr").remove();
	                    } else if (data == "failed") {
	                        var txt = "删除失败，请重试！";
	                        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
	                    }
	                }
	            });
            }
        };
        window.wxc.xcConfirm(txt, "custom", option);
	});
	
	// 单个加一
	$(".add").click(function() {
		var that = $(this);
		that.siblings("input").val(that.siblings("input").val() / 1 + 1);
		
		if (that.parents("td").siblings(".gw").find(".checkbox").is(':checked')) {
			// 计算结算金额
			calAmount();
		}
	});
	
	// 单个减一
	$(".minus").click(function() {
		var that = $(this);
		
		if (that.siblings("input").val() > 1) {
			that.siblings("input").val(that.siblings("input").val() / 1 - 1);
		}
		
		if (that.parents("td").siblings(".gw").find(".checkbox").is(':checked')) {
			// 计算结算金额
			calAmount();
		}
	});
	
	// 多选框选中
	$(".checkbox").click(function() {
		var that = $(this);
		
		$("#cost_points").html($("input[type='checkbox']:checked").length);
		
		// 计算结算金额
		calAmount();
	});
	
	// 立即结算
	$(".imm-set").click(function() {
		if($("input[type='checkbox']:checked").length == 0) {
			var txt = "请选择要购买的产品！";
            window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
            return false;
		}

		var dataShoppingCartString = $(".hinput").attr("data-shoppingCartString"),
			dataShoppingCartArr = new Array(),
			thatTid;
		dataShoppingCartArr = dataShoppingCartString.split(",");
		
		$("input[type='checkbox']:checked").each(function() {
			var that = $(this),
				thatPrice = that.parents("td").siblings(".gpw").find(".price").html(),
				thatNum = that.parents("td").siblings(".gnw").find("input").val() / 1,
				thatTime = that.parents("td").siblings(".gtw").find(".package-time").html(),
				thatName = that.parents("td").siblings(".ganw").find("input").val(),
				thatPhone = that.parents("td").siblings(".gapw").find("input").val(),
				thatTitle = that.parents("dt").siblings("dd").find(".order-name").html(),
				thatGphone = that.parents("td").siblings(".gow").find(".del").attr("data-gphone"),
				itemAmount;

			thatTid = that.parents("td").siblings(".gow").find(".del").attr("data-tid");
			
			itemAmount = thatPrice * thatNum;
			
			/*if (thatTime == "选择出行时间") {
				var txt = "请选择出行时间！";
                window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
				return false;
			} else if (thatName == "") {
				var txt = "请输入联系人姓名！";
                window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
				return false;
			} else if (thatPhone == "") {
				var txt = "请输入联系人手机号！";
                window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
				return false;
			}*/
			
			$.ajax({
				url: "ajax/shoppingCartOrderAjax.jsp",
				type: "post",
	            async: false,
				data: {
					"tid": thatTid,
					"title": thatTitle,
					"totalPrice": itemAmount,
					"sum": thatNum,
					"uphone": userphone,
					"gphone": thatGphone,
					"packageTimeValue": thatTime,
					"contactsName": thatName,
					"contactsPhone": thatPhone
				},
				success: function(data) {
					var data = $.trim(data);
					if (data == "success") {
			    		dataShoppingCartArr = $.grep(dataShoppingCartArr, function(value) {
			    			return value != thatTid;
			    			console.log("1");
			    		});
					}
				}
			});
		});
		
		if (dataShoppingCartArr == "") {
			dataShoppingCartString = "[]";
		} else {
			dataShoppingCartString = dataShoppingCartArr.join(",");
		}

		console.log(dataShoppingCartString);
		alert(dataShoppingCartString);
		$.ajax({
            url: "ajax/addShoppingCartAjax.jsp",
            type: "post",
            async: false,
            data: {
                "uphone": userphone,
                "shoppingCartArr": dataShoppingCartString
            },
            success: function(data) {
                var data = $.trim(data);
                if (data == "success") {
					window.location = "paymentSuccessful.html";
                	console.log("2");
                }
            }
        });
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

	// 退出登录
	$(".sign-out").click(function() {
		localStorage.removeItem("uphone");
		window.location = "login.jsp";
	});
});
// 计算结算金额
function calAmount() {
	var totalAmount = 0;
	
	$("input[type='checkbox']:checked").each(function() {
		var that = $(this),
			thatPrice = that.attr("data-price"),
			thatNum = that.parents("td").siblings(".gnw").find("input").val() / 1,
			itemAmount;
		console.log(thatNum);
		itemAmount = thatPrice * thatNum;
		totalAmount += itemAmount;
	});
	
	$("#order_amount").html(totalAmount);
}