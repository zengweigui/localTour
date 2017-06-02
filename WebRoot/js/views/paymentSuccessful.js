var userphone = localStorage.getItem("uphone");
$(document).ready(function() {
	// 查看订单
	$(".p-see-btn").click(function() {
		window.location = "userOrder.jsp?uphone=" + userphone;
	});

	// 返回首页
	$(".p-home-btn").click(function() {
		window.location = "userHome.jsp?uphone=" + userphone;
	});
});