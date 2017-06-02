var guidephone = localStorage.getItem("gphone");
$(document).ready(function() {
	// 判断是否登录
    if (guidephone == "" || guidephone == null) {
        window.location = 'login.jsp';
    }

    // 设置ul-box垂直居中
    (function() {
        var that = $(".ul-box"),
            mainContentNav = that.parent();
        that.css({
            position: 'absolute',
            top: (mainContentNav.height() - that.find("li").outerHeight()) / 2
        });
    })();

    // 判断营业状态
    $.ajax({
        url: "ajax/getShopInfoAjax.jsp",
        type: "post",
        async: false,
        data: {
            "gphone": guidephone
        },
        success: function(data) {
            var data = $.trim(data),
                dataArr = new Array();
            dataArr = data.split(",");
            $(".store-name").html(dataArr[0]);
            // 如果店铺背景图为空不执行
            if (dataArr[1]) $("#shopbgImg").attr("src", "../BYSJIMG/guideShopBgImg/" + dataArr[1]);
            if (dataArr[2] == "没空") {
                $("#business-btn").html("开始营业");
            } else if (dataArr[2] == "有空") {
                $("#business-btn").removeClass("start-business").addClass("in-business").html("营业中...");
            }
        }
    });

    /*营业 and 未营业*/
    $("#business-btn").click(function() {
        if ($(this).html() == "开始营业") {
            var txt = "你确定要开始营业吗？";
            var option = {
                title: "猪猪旅行",
                btn: parseInt("0011", 2),
                onOk: function() {
                    $.ajax({
                        url: "ajax/whetherToShopAjax.jsp",
                        type: "post",
                        async: false,
                        data: {
                            "gphone": guidephone,
                            "state": "没空" // 还没营业-没空，传过去要变成营业，有空
                        },
                        success: function(data) {
                            var data = $.trim(data);
                            if (data == "success") {
                                $("#business-btn").removeClass("start-business").addClass("in-business").html("营业中...");
                            } else {
                                alert("失败");
                            }
                        }
                    });
                }
            };
            window.wxc.xcConfirm(txt, "custom", option);
        } else {
            var txt = "你确定要暂停营业吗？";
            var option = {
                title: "猪猪旅行",
                btn: parseInt("0011", 2),
                onOk: function() {
                    $.ajax({
                        url: "ajax/whetherToShopAjax.jsp",
                        type: "post",
                        async: false,
                        data: {
                            "gphone": guidephone,
                            "state": "有空" // 已经营业-有空，传过去要变成暂停营业，没空
                        },
                        success: function(data) {
                            var data = $.trim(data);
                            if (data == "success") {
                                $("#business-btn").removeClass("in-business").addClass("start-business").html("开始营业");
                            } else {
                                alert("失败");
                            }
                        }
                    });
                }
            };
            window.wxc.xcConfirm(txt, "custom", option);
        }
    });

    //发货状态
    $(".refund").each(function() {
        var that = $(this),
        	dataShip = that.attr("data-ship"),
        	dataRefund = that.attr("data-refund");
        if (dataShip == 1) { // 已发货
            that.css({
                "border": "1px solid #ccc",
                "backgroundColor": "#ccc",
                "color": "#fff"
            }).html("已发货").attr("disabled", true);
        } else if (dataShip == 0 && dataRefund == 1) { // 未发货，并且还未取消订单
            that.css({
                "backgroundColor": "#138250",
                "color": "#fff"
            }).html("发货");
        } else if (dataShip == 0 && dataRefund == 0) { // 未发货，已取消订单
        	that.css({
                "border": "1px solid #ccc",
                "backgroundColor": "#ccc",
                "color": "#fff"
            }).html("已取消订单").attr("disabled", true);
        }
        that.click(function() {
        	var dataOid = that.attr("data-oid");
            var txt = "你确定要发货吗？";
            var option = {
                title: "猪猪旅行",
                btn: parseInt("0011", 2),
                onOk: function() {
                	$.ajax({
                        url: "ajax/guideOrderShipAjax.jsp",
                        type: "post",
                        async: false,
                        data: {
                            "orderId": dataOid,
                            "ship": "1" // 将发货状态设置1，表示已发货
                        },
                        success: function(data) {
                            var data = $.trim(data);
                            if (data == "success") {
                                that.css({
                                    "border": "1px solid #ccc",
                                    "backgroundColor": "#ccc",
                                    "color": "#fff"
                                }).html("已发货").attr("disabled", true).attr("data-state", "1");
                            } else {
                                alert("发货失败");
                            }
                        }
                    });
                }
            };
            window.wxc.xcConfirm(txt, "custom", option);
        });
    });

	// 进入订单详细
	$(document).on('click', ".guide-info, .package-title, .purchase-info", function() {
		var that = $(this),
			dataOid = that.attr("data-oid");
		window.location = "orderDetails.jsp?oid=" + dataOid;
	});

    // 页面跳转函数
    function clickJump(link) {
        window.location = link + ".jsp?gphone=" + guidephone;
    }
    // 个人中心
    $(".guideCenter").click(function() {
        clickJump("guideCenter");
    });
    // 我的产品
    $(".myProdyct").click(function() {
        clickJump("guideStores");
    });
    // 产品上传
    $(".guideUploadProduct").click(function() {
        clickJump("guideUploadProduct");
    });
    // 草稿箱
    $(".guideDraftsBox").click(function() {
        clickJump("guideDraftsBox");
    });

    // 退出登录
    $(".sign-out").click(function() {
        localStorage.removeItem("gphone");
        window.location = "login.jsp";
    });
});

//店铺背景图上传
(function() {
    function toFixed2(num) {
        return parseFloat(+num.toFixed(2));
    }

    //shopbg
    $('#shopbg-image').on('change', function() {
        //取消裁剪框
        $('#cancleBtn').on('click', function() {
            $("#showEdit").fadeOut();
        });

        //确定裁剪框
        $('#confirmBtn').on('click', function() {
            $("#showEdit").fadeOut();

            var $shopbgImage = $('#report > img');
            var dataURL = $shopbgImage.cropper("getCroppedCanvas");
            var imgurl = dataURL.toDataURL("image/jpeg", 0.5);

            $("#report > img").attr("src", "");
            // 上传店铺背景图
            $.ajax({
                url: "ajax/uploadShopBgAjax.jsp",
                type: "post",
                async: false,
                data: {
                    "gphone": guidephone,
                    "storeBgUrl": imgurl
                },
                success: function(data) {
                    var data = $.trim(data);

                    if (data == "success") {
                    	$("#shopbgImg").attr("src", imgurl);
                    } else {
                        var txt = "上传失败";
                        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
                    }
                }
            });
        });

        //裁剪函数
        function cutImg() {
            $("#showEdit").fadeIn();
            var $shopbgImage = $('#report > img');
            $shopbgImage.cropper({
                aspectRatio: 2 / 1,
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
                minContainerWidth: 300
            });
        }

        //完成函数
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
        //时间戳
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
})();