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

	// 获取当前省市
	(function() {
		// HTML5 Geolocation对象
		/*var geolocation = new BMap.Geolocation();
		var gc = new BMap.Geocoder();

		geolocation.getCurrentPosition(function(r) {
			if (this.getStatus() == BMAP_STATUS_SUCCESS) {
				var pt = r.point;
				gc.getLocation(pt, function(rs) {
					// 如果用户拒绝则设置为默认省市
					if (r.accuracy == null) {
			            // alert('accuracy null:'+r.accuracy);
			            //用户决绝地理位置授权
			            // 将省市存储在本地
						localStorage.setItem("province", "广东省");
						localStorage.setItem("city", "广州市");
			            return;
			        }
					var addComp = rs.addressComponents;

					var province = addComp.province;
					var city = addComp.city;

					// 将省市存储在本地
					localStorage.setItem("province", province);
					localStorage.setItem("city", city);
				});
			} else {
				alert("定位失败");
			}
		}, {
			enableHighAccuracy: true
		});*/
	})();
	
	// 点击进入产品详细页
	$(document).on('click', '.intoTour', function() {
        var that = $(this),
            tId = that.attr("data-tid");
        window.location = "tourDetails.jsp?tid=" + tId;
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

	/*轮播图*/
	$('.flicker-example').flicker();
});