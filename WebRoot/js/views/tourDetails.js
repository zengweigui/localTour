var userphone = localStorage.getItem("uphone");
$(document).ready(function() {
	// 判断是否登录
	if (userphone == "" || userphone == null) {
		$(".login-out").show();
	} else {
		// 获取用户头像
		$(".user-box").show();
	}

	// 创建行程
	(function() {
		// 获取行程json
		var allTripJson = $(".tour-route-box").attr("data-allTripJson");
		// 将传过来的Json字符串转成Json格式
		allTripJson = eval('(' + allTripJson + ')');

		var tourRouteBox, tourTimeBox, tourTime, tourImgBox, img, tourDescription;

		tourRouteBox = $(".tour-route-box");

		// 循环Json
		$.each(allTripJson, function(index, value) {
			console.log(value[0]);

			// 行程时间
			tourTime = $('<p></p>');
			tourTime.addClass("tour-time");
			tourTime.append(value[0]);

			tourTimeBox = $('<div></div>');
			tourTimeBox.addClass("tour-time-box");
			tourTimeBox.append(tourTime);

			// .tour-img-box
			tourImgBox = $('<div></div>');
			tourImgBox.addClass("tour-img-box");

			//循环创建img
			for (var item in value[1]) {
				var img = $('<img />');
				img.attr({
					"src": "../BYSJIMG/tripImg/" + value[1][item]
				});
				tourImgBox.append(img);
			}

			// 行程描述
			tourDescription = $('<p></p>');
			tourDescription.addClass("tour-description");
			tourDescription.append(value[2]);

			tourRouteBox.append(tourTimeBox, tourImgBox, tourDescription);
		});
	})();

	//鼠标的移入移出 - 显示隐藏.user-list
	$(".user-box").mouseover(function() {
		$(".user-list").show();
	}).mouseout(function() {
		$(".user-list").hide();
	});

	// 立即购买
	$(".buy-button").click(function() {
		// 判断是否登录
		if (userphone == "" || userphone == null) {
			 var txt = "您还未登录，要登录之后才能购买哦！是否要去登录？";
	            var option = {
	                title: "提示",
	                btn: parseInt("0011", 2),
	                onOk: function() {
	                	window.location = "login.jsp";
	                }
	            };
	            window.wxc.xcConfirm(txt, "custom", option);
		} else {
			window.location = "tourConfirm.jsp";
		}
	});
	
	// 加入购物车
	$(".shoppingCart-button").click(function() {
		var that = $(this);
		// 判断是否登录
		if (userphone == "" || userphone == null) {
			var txt = "您还未登录，要登录之后才能加入购物车哦！是否要去登录？";
	        var option = {
	            title: "提示",
	            btn: parseInt("0011", 2),
	            onOk: function() {
	            	window.location = "login.jsp";
	            }
	        };
	        window.wxc.xcConfirm(txt, "custom", option);
		} else {
			var dataShoppingCartArr = new Array(),
				dataShoppingCartString = that.attr("data-shoppingCartArr"),
				tid = that.attr("data-tid");
			
			if ($.trim(dataShoppingCartString) == "[]") {
				dataShoppingCartString = "";
				dataShoppingCartArr.push(tid);
				dataShoppingCartString = dataShoppingCartArr.join(",");
			} else {
				dataShoppingCartArr = dataShoppingCartString.split(',');

				if ($.inArray($.trim(tid), dataShoppingCartArr) != -1 || $.inArray($.trim(tid), dataShoppingCartArr) == 0) {
					var txt = "此产品已在购物车中";
                    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
                    return false;
				}
				dataShoppingCartArr.push(tid);
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
                        var txt = "加入成功";
            	        var option = {
            	            title: "提示",
            	            btn: parseInt("0011", 2),
            	            onOk: function() {
            	            	window.location.reload();
            	            },
            	            onCancel: function() {
            	            	window.location.reload();
            	            }
            	        };
            	        window.wxc.xcConfirm(txt, "custom", option);
                    } else if (data == "failed") {
                    	var txt = "加入失败";
            	        var option = {
            	            title: "提示",
            	            btn: parseInt("0011", 2),
            	            onOk: function() {
            	            	window.location.reload();
            	            },
            	            onCancel: function() {
            	            	window.location.reload();
            	            }
            	        };
            	        window.wxc.xcConfirm(txt, "custom", option);
                    }
                }
            });
		}
	});

	/*控制.goTop的显示与隐藏*/
	$(window).scroll(function() {
		if ($(window).scrollTop() > 100) {
			$(".goTop").fadeIn();
		} else {
			$(".goTop").hide();
		}
	});
	/*回到顶部*/
	$(".goTop").click(function() {
		$('html,body').animate({
			'scrollTop': 0
		}, 550);
	});
	/*到底部*/
	$(".goBottom").click(function() {
		$('html,body').animate({
			'scrollTop': $(document).height()
		}, 550);
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