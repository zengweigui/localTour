var userphone = localStorage.getItem("uphone");
$(document).ready(function() {
	$(".product-box").click(function() {
		var tid = $(this).attr("data-tid");
		window.location = "tourDetails.jsp?tid=" + tid;
	});

	// 返回
	$(".return-icon").click(function() {
		history.go(-1);
	});
});