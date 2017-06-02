$(document).ready(function() {
    // 将body的百分比高度设置为固定值
    var bodyHeight = $("body").height();
    $("body").css({
        "height": bodyHeight
    });

    $('#open-btn').on('click', function() {
        var phone = $(this).attr('data-phone'),
            userName = $.trim($('#nickname').val()),
            AvatarImg = $("#Avatar-img").val();

        // 如果用户没上传头像，设置为默认头像
        if (AvatarImg == "") {
            AvatarImg = "TX.png";
        }

        if (userName == "") {
            alert("昵称不可为空");
        } else {
            $.ajax({
                url: "ajax/userFillinAjax.jsp",
                type: "post",
                async: false,
                data: {
                    "userName": userName,
                    "AvatarImg": AvatarImg
                },
                success: function(data) {
                	var data = $.trim(data);
                	if (data == "success") {
                		window.location = "login.jsp";
                	} else if (data == "failed") {
                		window.location = "registered.jsp";
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
        $("#Avatar-img").val(imgurl);
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