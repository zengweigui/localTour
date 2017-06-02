var userphone = localStorage.getItem("uphone");
$(document).ready(function() {
    // 将body的百分比高度设置为固定值
    var bodyHeight = $("body").height();
    $("body").css({
        "height": bodyHeight
    });

    $('#open-btn').on('click', function() {
        var userName = $.trim($('#nickname').val()), // 名称
            AvatarImg = $(".changeAvatar-img").attr("data-src"); // 头像

        if (userName == "") {
            var txt = "昵称不可为空";
            window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
        } else {
            $.ajax({
                url: "ajax/userModifyAjax.jsp",
                type: "post",
                async: false,
                data: {
                    "uphone": userphone,
                    "userName": userName,
                    "AvatarImg": AvatarImg
                },
                success: function(data) {
                    var data = $.trim(data);
                    if (data == "success") {
                        window.location = "userCenter.jsp?uphone=" + userphone;
                    } else if (data == "failed") {
                        var txt = "修改失败";
                        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
                    }
                }
            });
        }
    });
});

// 图片裁剪
$(function() {
    function toFixed2(num) {
        return parseFloat(+num.toFixed(2));
    }
    $('#cancleBtn').on('click', function() {
        $("#showEdit").fadeOut();
        $('#showResult').fadeIn();
    });

    $('#confirmBtn').on('click', function() {
        $("#showEdit").fadeOut();

        var $image = $('#report > img');
        var dataURL = $image.cropper("getCroppedCanvas");

        var imgurl = dataURL.toDataURL("image/png", 0.5);
        $("#changeAvatar > img").attr("src", imgurl);
        $(".changeAvatar-img").attr("data-src", imgurl);
        $('#showResult').fadeIn();

    });

    function cutImg() {
        $('#showResult').fadeOut();
        $("#showEdit").fadeIn();
        var $image = $('#report > img');
        $image.cropper({
            aspectRatio: 1 / 1,
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
            minContainerWidth: 300,
        });
    }

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

    $('#image').on('change', function() {
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
});