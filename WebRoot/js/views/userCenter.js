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
    
    // 修改资料
    $(".modify-btn").click(function() {
        window.location = "userModifyData.jsp?uphone=" + userphone;
    });

    // 退出登录
    $(".sign-out").click(function() {
        localStorage.removeItem("uphone");
        window.location = "login.jsp";
    });
});