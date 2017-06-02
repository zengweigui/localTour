var phone = localStorage.getItem("guidephone");

$(document).ready(function() {
    $(".authentication-box").each(function() {
        var that = $(this);
        if (that.attr("data-isauthentication") != "-1") {
            that.hide();
        }
    });
    // 点击认证
    $(".authentication-box").click(function() {
        window.location.href = 'authenticationCenter.jsp';
    });

    $.post('personalStoresGetName.jsp', {
        phone: phone
    }, function(msg) {
        if (jQuery.trim(unescape(msg)) != "failed") {
            $("#ownername").html(jQuery.trim(unescape(msg)));
            $.post('personalStoresGetState.jsp', {
                phone: phone
            }, function(msg) {
                if (jQuery.trim(unescape(msg)) == "没空") {

                    $("#business-btn").html("开始营业");
                } else if (jQuery.trim(unescape(msg)) == "有空") {
                    $("#business-btn").removeClass("start-business").addClass("in-business").html("营业中...");
                } else {
                    window.location = "login.jsp";
                }
            });

        } else {
            window.location = "login.jsp";
        }
    });

    $("#list-item-one").click(function() {
        window.location = "myProduct.jsp?phone=" + phone;
    });
    $("#list-item-two").click(function() {
        window.location = "newMyOrder.jsp?phone=" + phone;
    });
    $("#list-item-three").click(function() {
        window.location = "myWallet.jsp?phone=" + phone;
    });
    $("#personalCenter").click(function() {
        window.location = "personalCenter.jsp";
    });

    $("#item-one").click(function() {
        window.location = "http://mp.weixin.qq.com/s?__biz=MzI0ODU0MzM2Nw==&mid=100000004&idx=1&sn=accbf12badd19c9316235c6390befcf2&scene=18#wechat_redirect";
    });

    /*营业 and 未营业*/
    $("#business-btn").click(function() {
        if ($(this).html() == "开始营业") {
            var txt = "你确定要开始营业吗？";
            var option = {
                title: "猪猪旅行",
                btn: parseInt("0011", 2),
                onOk: function() {
                    /*$.post('startBusiness.jsp', {
                        phone: phone
                    }, function(msg) {
                        if (jQuery.trim(unescape(msg)) == "success") {
                            $("#business-btn").removeClass("start-business").addClass("in-business").html("营业中...");
                        } else {
                            var txt = jQuery.trim(unescape(msg));
                            window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
                        }
                    });*/
                    $("#business-btn").removeClass("start-business").addClass("in-business").html("营业中...");
                }
            };
            window.wxc.xcConfirm(txt, "custom", option);
        } else {
            var txt = "你确定要暂停营业吗？";
            var option = {
                title: "猪猪旅行",
                btn: parseInt("0011", 2),
                onOk: function() {
                    /*$.post('endBusiness.jsp', {
                        phone: phone
                    }, function(msg) {
                        if (jQuery.trim(unescape(msg)) == "success") {
                            $("#business-btn").removeClass("in-business").addClass("start-business").html("开始营业");
                        } else {
                            var txt = jQuery.trim("营业失败！");
                            window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
                        }
                    });*/
                    $("#business-btn").removeClass("in-business").addClass("start-business").html("开始营业");
                }
            };
            window.wxc.xcConfirm(txt, "custom", option);
        }
    });
});

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

            $("#shopbgImg").attr("src", imgurl);
            $("#basetxt").val(imgurl);

            $("#report > img").attr("src", "");
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