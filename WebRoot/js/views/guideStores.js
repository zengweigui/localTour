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

    // 获取店铺信息，设置营业状态、店铺背景图、店铺名称
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

    // checkbox
    $(".checkbox").each(function() {
        if ($(this).attr("data") == "1") {
            $(this).find(".circle").css({
                left: "1px",
                backgroundColor: "#999"
            });
            $(this).find(".label").css({
                backgroundColor: "#fff",
                borderColor: "#999"
            });
        } else if ($(this).attr("data") == "2") {
            $(this).find(".circle").css({
                left: "34px",
                backgroundColor: "#fff"
            });
            $(this).find(".label").css({
                backgroundColor: "#13895f"
            });
        }

        $(this).click(function() {
            var that = $(this);
            if (that.attr("data") == "1") {
                var txt = "你确定要上架产品吗？";
                var option = {
                    title: "猪猪旅行",
                    btn: parseInt("0011", 2),
                    onOk: function() {
                        var tid = that.attr('data-tourID');
                        $.ajax({
                            url: "ajax/shelfProducts.jsp",
                            type: "post",
                            async: false,
                            data: {
                                "gphone": guidephone,
                                "tid": tid,
                                "state": "2"
                            },
                            success: function(data) {
                                var data = $.trim(data);

                                if (data == "success") {
                                    that.find(".circle").animate({
                                        left: "34px"
                                    }, "fast").css({
                                        backgroundColor: "#fff"
                                    });
                                    that.find(".label").css({
                                        backgroundColor: "#13895f"
                                    });
                                    that.attr("data", 2);
                                } else {
                                    var txt = "上架失败";
                                    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
                                }
                            }
                        });
                    },
                    onCancel: function() {}
                };
                window.wxc.xcConfirm(txt, "custom", option);
            } else if(that.attr("data") == "2") {
                var txt = "你确定要下架产品吗？";
                var option = {
                    title: "猪猪旅行",
                    btn: parseInt("0011", 2),
                    onOk: function() {
                        var tid = that.attr('data-tourID');
                        $.ajax({
                            url: "ajax/shelfProducts.jsp",
                            type: "post",
                            async: false,
                            data: {
                                "gphone": guidephone,
                                "tid": tid,
                                "state": "1"
                            },
                            success: function(data) {
                                var data = $.trim(data);

                                if (data == "success") {
                                    that.find(".circle").animate({
                                        left: "1px"
                                    }, "fast").css({
                                        backgroundColor: "#999"
                                    });
                                    that.find(".label").css({
                                        backgroundColor: "#fff"
                                    });
                                    that.attr("data", 1);
                                } else {
                                    var txt = "下架失败";
                                    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
                                }
                            }
                        });
                    },
                    onCancel: function() {}
                };
                window.wxc.xcConfirm(txt, "custom", option);
            }
        });
    });
    
    // 点击进入产品详细页
	$('.img-box').click(function() {
        var that = $(this),
            tId = that.attr("data-tid");
        window.location = "guideTourDetails.jsp?tid=" + tId;
    });

    // 页面跳转函数
    function clickJump(link) {
        window.location = link + ".jsp?gphone=" + guidephone;
    }
    // 个人中心
    $(".guideCenter").click(function() {
        clickJump("guideCenter");
    });
    // 游客订单
    $(".userOrder").click(function() {
        clickJump("guideOrder");
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

// 店铺背景图上传
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