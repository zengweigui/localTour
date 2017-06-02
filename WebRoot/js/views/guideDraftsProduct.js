var guidephone = localStorage.getItem("gphone");
$(document).ready(function() {
    // 判断是否登录
    /*if (guidephone == "" || guidephone == null) {
        window.location = 'login.jsp';
    }*/
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

    // 一进页面根据传进来的JSON循环创建行程
    (function() {
        // 获取后台传过来的Json
        var tripJson = $(".add-trip-box").attr("data-trip-json");
        // 将传过来的Json字符串转成Json格式
        tripJson = eval('(' + tripJson + ')');

        var addTripBtn, tripItem, tripTimeBox, tripTimeInput, tripImgsBox, addTripImgsBtn,
            tripImageInput, textarea;;
        addTripBtn = $(".add-trip-btn");

        // 循环Json
        $.each(tripJson, function(index, value) {
            // 获取trip-item的个数，+1 ,,这个不能放在$.each()前面！
            var tripItemNumber = $(".trip-item").length ? $(".trip-item").length + 1 : 0 + 1;
            console.log(value[0]);
            // trip-time-input
            tripTimeInput = $('<input />');
            tripTimeInput.addClass("trip-time-input");
            tripTimeInput.attr({
                "type": "text",
                "placeholder": "在这儿填写行程时间",
                "id": "trip-time-input-" + tripItemNumber
            });
            tripTimeInput.val(value[0]);
            // trip-time-box
            tripTimeBox = $('<div></div>');
            tripTimeBox.addClass("trip-time-box");
            tripTimeBox.append(tripTimeInput);

            // trip-image-input
            tripImageInput = $('<input />');
            tripImageInput.addClass("trip-image-input");
            tripImageInput.attr({
                "type": "file",
                "name": "file",
                "multiple": "multiple",
                "title": "添加行程图片",
                "id": "trip-image-input-" + tripItemNumber
            });
            // add-trip-imgs-btn
            addTripImgsBtn = $('<div></div>');
            addTripImgsBtn.addClass("add-trip-imgs-btn");
            addTripImgsBtn.append(tripImageInput);

            // trip-imgs-box
            tripImgsBox = $('<div></div>');
            tripImgsBox.addClass("trip-imgs-box");
            tripImgsBox.attr({
                "id": "trip-imgs-box-" + tripItemNumber
            });
            
            // 创建一个Image对象
            var imgObj = new Image();

            //循环创建img
            for (var item in value[1]) {
                var img = $('<img />');
                img.attr({
                    "src": "../BYSJIMG/tripImg/" + value[1][item],
                    "data-src": value[1][item]
                });
         
                // 将js创建的img元素的src赋值给Image对象imgObj，用来获取图片的宽高
                imgObj.src = img.attr("src");
                // console.log("图片高：" + imgObj.height() + "图片宽：" + imgObj.width());
                
                // 判断图片的宽高，来设置显示方式
                if (imgObj.width > imgObj.height) {
                    img.attr("src", this.src);
                    img.addClass("width-auto");
                } else {
                    img.attr("src", this.src);
                    img.addClass("height-auto");
                }
                
                var cancelBtn = $('<span></span>');
                cancelBtn.addClass("cancel-btn");

                var tripImgItemBox = $('<div></div>');
                tripImgItemBox.addClass("trip-img-item-box");

                var tripImgBox = $('<div></div>');
                tripImgBox.addClass("trip-img-box");

                tripImgItemBox.append(img);
                tripImgBox.append(tripImgItemBox);
                tripImgBox.append(cancelBtn);

                tripImgsBox.append(tripImgBox);
            }

            tripImgsBox.append(addTripImgsBtn);

            // textarea
            textarea = $('<textarea></textarea>');
            textarea.attr({
                "id": "trip-description-" + tripItemNumber,
                "placeholder": "在这儿填写行程描述...."
            });
            textarea.val(value[2]);

            // trip-item
            tripItem = $('<div></div>');
            tripItem.attr("id", "trip-item-" + tripItemNumber);
            tripItem.addClass("trip-item");
            tripItem.append(tripTimeBox, tripImgsBox, textarea);

            // add-trip-btn
            addTripBtn.before(tripItem);
        });
    })();

    // 绑定cancel-picture点击事件 - 取消背景图按钮
    $(document).on('click', '.cancel-picture', function(e) {
        var that = $(this);
        that.siblings("img").attr("src", "");
        that.hide();
    });
    // 产品背景图上传
    $('#product-bg-input').on('change', function() {
        var that = $(this),
            tid = $(".mainContent").attr("data-tid"),
            bgNameArr = that.siblings("img").attr("data-src");
        //检验是否为图像文件
        var file = document.getElementById("product-bg-input").files[0],
            fileSize = file.size / 1024;
        if (!/image\/\w+/.test(file.type)) {
            var txt = "请选择图片！";
            var option = {
                title: "提示"
            };
            window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info, option);
            // 将确定按钮的宽度设为100%，并去掉border-right
            $(".ok").removeClass("border-right").css({
                "width": "100%"
            });
            return;
        } else if (fileSize > 2000) {
            var txt = "图片不能大于2M！";
            var option = {
                title: "提示"
            };
            window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info, option);
            // 将确定按钮的宽度设为100%，并去掉border-right
            $(".ok").removeClass("border-right").css({
                "width": "100%"
            });
            return;
        }
        var reader = new FileReader();
        //将文件以Data URL形式读入页面
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            var img = new Image();
            img.src = this.result;
            img.onload = function() {
                $.ajax({ // 上传产品背景图
                    url: "ajax/guideUploadTripBgAjax.jsp",
                    type: "post",
                    async: false,
                    data: {
                        "tid": tid, // 产品ID
                        "gphone": guidephone,
                        "productBg": img.src
                    },
                    success: function(data) { // 如果上传成功，删除之前存储在本地的产品背景图
                        var data = $.trim(data);
                        $(".product-bg").attr({
                            "src": "../BYSJIMG/tripBg/" + data,
                            "data-src": data
                        });
                        $.ajax({ // 执行删除产品背景图操作
                            url: "ajax/guideDeleteImgAjax.jsp",
                            type: "post",
                            async: false,
                            data: {
                                "category": 0, // 背景图标识
                                "imgNameArr": bgNameArr
                            },
                            success: function(data) {
                                var data = $.trim(data);
                                if (data == "success") {} else if (data == "failed") {}
                            }
                        });
                    }
                });
            };
        };
    });

    // 费用包含
    limitedNumber("cost-includes", "cost-includes-yishuru", "cost-includes-shengyu");
    // 备注说明
    limitedNumber("remark-information", "remark-information-yishuru", "remark-information-shengyu");
    /*字数限制 共用函数*/
    function limitedNumber(className, lyishu, lsheng) {
        //匹配包含给定属性的元素，keyup在按键释放时发生
        $('.' + className).keyup(function() {
            var area = $(this);
            //parseInt 方法返回与保存在 numString 中的数字值相等的整数。如果 numString 的前缀不能解释为整数，则返回 NaN（而不是数字）。  
            var max = parseInt(area.attr("maxlength"), 10); //获取maxlength的值 转化为10进制，将输入到textarea的文本长度  
            //这个判断可知max得到的是不是数字，设定的大小是多少
            if (max > 0) {
                if (area.val().length > max) { //textarea的文本长度大于maxlength   
                    area.val(area.val().substr(0, max)); //截断textarea的文本重新赋值   
                }
                var yishu = area.val().length;
                var sheng = max - area.val().length;
                $('.' + lyishu).html(yishu);
                $('.' + lsheng).html(sheng);
            }
        });
        $('.' + className).blur(function() {
            var area = $(this);
            var max = parseInt(area.attr("maxlength"), 10); //获取maxlength的值   
            if (max > 0) {
                if (area.val().length > max) { //textarea的文本长度大于maxlength   
                    area.val(area.val().substr(0, max)); //截断textarea的文本重新赋值   
                }
                var yishu = area.val().length;
                var sheng = max - area.val().length;
                $('.' + lyishu).html(yishu);
                $('.' + lsheng).html(sheng);
            }
        });
    }

    // 添加行程按钮
    $(".add-trip-btn").click(function() {
        // 获取trip-item的个数，+1
        var tripItemNumber = $(".trip-item").length ? $(".trip-item").length + 1 : 0 + 1;
        // 超过9个返回
        /*if (tripItemNumber > 9) {
            return false;
        }*/

        var addTripBtn, tripItem, tripTimeBox, tripTimeInput, tripImgsBox, addTripImgsBtn,
            tripImageInput, textarea;

        addTripBtn = $(".add-trip-btn");

        // trip-time-input
        tripTimeInput = $('<input />');
        tripTimeInput.addClass("trip-time-input");
        tripTimeInput.attr({
            "type": "text",
            "placeholder": "在这儿填写行程时间",
            "id": "trip-time-input-" + tripItemNumber
        });
        // trip-time-box
        tripTimeBox = $('<div></div>');
        tripTimeBox.addClass("trip-time-box");
        tripTimeBox.append(tripTimeInput);

        // trip-image-input
        tripImageInput = $('<input />');
        tripImageInput.addClass("trip-image-input");
        tripImageInput.attr({
            "type": "file",
            "name": "file",
            "multiple": "multiple",
            "title": "添加行程图片",
            "id": "trip-image-input-" + tripItemNumber
        });
        // add-trip-imgs-btn
        addTripImgsBtn = $('<div></div>');
        addTripImgsBtn.addClass("add-trip-imgs-btn");
        addTripImgsBtn.append(tripImageInput);
        // trip-imgs-box
        tripImgsBox = $('<div></div>');
        tripImgsBox.addClass("trip-imgs-box");
        tripImgsBox.attr({
            "id": "trip-imgs-box-" + tripItemNumber
        });
        tripImgsBox.append(addTripImgsBtn);

        // textarea
        textarea = $('<textarea></textarea>');
        textarea.attr({
            "id": "trip-description-" + tripItemNumber,
            "placeholder": "在这儿填写行程描述...."
        });

        // trip-item
        tripItem = $('<div></div>');
        tripItem.attr("id", "trip-item-" + tripItemNumber);
        tripItem.addClass("trip-item");
        tripItem.append(tripTimeBox, tripImgsBox, textarea);

        // add-trip-btn
        addTripBtn.before(tripItem);
    });

    // 当输入域发生变化时，上传图片
    /*
    $(".trip-image-input").on('change',function() {}); 无效
    $(document).on('change', '.trip-image-input', function() {}); 才有效
     */
    $(document).on('change', '.trip-image-input', function() {
        var that = $(this),
            thatId = that.attr("id");
        readAsDataURL(that, thatId); // 传入当前对象与对象ID
    });
    // 将文件以Data URL形式读入页面
    function readAsDataURL(that, thatId) {
        //检验是否为图像文件
        var file = document.getElementById(thatId).files;
        for (i = 0; i < file.length; i++) {
            fileSize = file[i].size / 1024;
            if (!/image\/\w+/.test(file[i].type)) {
                var txt = "请选择图片！";
                var option = {
                    title: "提示"
                };
                window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info, option);
                // 将确定按钮的宽度设为100%，并去掉border-right
                $(".ok").removeClass("border-right").css({
                    "width": "100%"
                });
                return;
            } else if (fileSize > 1000) {
                var txt = "图片不能大于1M！";
                var option = {
                    title: "提示"
                };
                window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info, option);
                // 将确定按钮的宽度设为100%，并去掉border-right
                $(".ok").removeClass("border-right").css({
                    "width": "100%"
                });
                return;
            }
            var reader = new FileReader();
            //将文件以Data URL形式读入页面
            reader.readAsDataURL(file[i]);
            reader.onload = function(e) {
                var img = new Image();
                img.src = this.result;
                img.onload = function() {
                    var addBtn = that.parent();
                    var img = $('<img />');
                    if (this.width > this.height) {
                        img.attr("src", this.src);
                        img.addClass("width-auto");
                    } else {
                        img.attr("src", this.src);
                        img.addClass("height-auto");
                    }
                    var cancelBtn = $('<span></span>');
                    cancelBtn.addClass("cancel-btn");

                    var tripImgItemBox = $('<div></div>');
                    tripImgItemBox.addClass("trip-img-item-box");

                    var tripImgBox = $('<div></div>');
                    tripImgBox.addClass("trip-img-box");

                    tripImgItemBox.append(img);
                    tripImgBox.append(tripImgItemBox);
                    tripImgBox.append(cancelBtn);
                    addBtn.before(tripImgBox);
                };
            };
        }
    }

    // 所有(含有data-src属性)删除了的图片名称的集合
    var deleteImgNameArr = new Array();
    // 绑定cancel-btn点击事件 - 取消行程图片按钮
    $(document).on('click', '.cancel-btn', function(e) {
        var that = $(this);

        // 如果相应的img含有data-src属性，则将此img的名称放入deleteImgNameArr中
        if (that.parent(".trip-img-box").find("img").attr("data-src")) {
            deleteImgNameArr.push(that.parent(".trip-img-box").find("img").attr("data-src"));
        }

        console.log("deleteImgNameArr...." + deleteImgNameArr);

        that.parent(".trip-img-box").remove();
    });

    // 保存草稿箱
    $(".save-draft").click(function() {
        var tid = $(".mainContent").attr("data-tid"), // 套餐id
            productTitle = $("#product-title").val(), // 产品标题
            productPrice = $(".product-price").val(), // 产品价格
            productStock = $(".product-stock").val(), // 产品库存
            cityValue = $(".city-value").html(), // 产品所在城市
            costIncludes = $(".cost-includes").val(), // 产品费用包含
            remarkInformation = $(".remark-information").val(), // 产品备注说明
            allTripJSON = JSON.stringify(getAllTripJSON());

        $.ajax({
            url: "ajax/guideUploadDraftsAjax.jsp",
            type: "post",
            async: false,
            data: {
                "tid": tid,
                "productTitle": productTitle,
                "productPrice": productPrice,
                "productStock": productStock,
                "cityValue": cityValue,
                "costIncludes": costIncludes,
                "remarkInformation": remarkInformation,
                "allTripJSON": allTripJSON,
                "drafts": "1"
            },
            success: function(data) {
                var data = $.trim(data);
                console.log("保存成功");
                if (data == "success") {
                    $.ajax({ // 上传成功执行删除行程图片（服务器本地图片）的Ajax
                        url: "ajax/guideDeleteImgAjax.jsp",
                        type: "post",
                        async: false,
                        data: {
                            "category": 1,
                            "imgNameArr": deleteImgNameArr.join(",")
                        },
                        success: function(data) {
                            var data = $.trim(data);
                            if (data == "success") {
                            	alert("保存成功");
                            } else if (data == "failed") {
                            	alert("保存失败");
                            	console.log("删除本地图片失败");
                            }
                        }
                    });
                } else if (data == "failed") {
                    var txt = "保存草稿箱失败";
                    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
                }
            }
        });
    });

    // 确认上传
    $(".upload-product").click(function() {
        var tid = $(".mainContent").attr("data-tid"), // 套餐id
        	productTitle = $("#product-title").val(), // 产品标题
            productPrice = $(".product-price").val(), // 产品价格
            productStock = $(".product-stock").val(), // 产品库存
            cityValue = $(".city-value").html(), // 产品所在城市
            costIncludes = $(".cost-includes").val(), // 产品费用包含
            remarkInformation = $(".remark-information").val(), // 产品备注说明
            allTripJSON = JSON.stringify(getAllTripJSON());
        $.ajax({
            url: "ajax/guideUploadDraftsAjax.jsp",
            type: "post",
            async: false,
            data: {
                "tid": $.trim(tid),
                "productTitle": $.trim(productTitle),
                "productPrice": $.trim(productPrice),
                "productStock": $.trim(productStock),
                "cityValue": $.trim(cityValue),
                "costIncludes": $.trim(costIncludes),
                "remarkInformation": $.trim(remarkInformation),
                "allTripJSON": $.trim(allTripJSON),
                "drafts": "0"
            },
            success: function(data) {
                var data = $.trim(data);
                if (data == "success") {
                	$.ajax({ // 上传成功执行删除行程图片（服务器本地图片）的Ajax
                        url: "ajax/guideDeleteImgAjax.jsp",
                        type: "post",
                        async: false,
                        data: {
                            "category": 1,
                            "imgNameArr": deleteImgNameArr.join(",")
                        },
                        success: function(data) {
                            var data = $.trim(data);
                            if (data == "success") {
                                window.location = "guideStores.jsp?gphone=" + guidephone;
                            } else if (data == "failed") {
                            	alert("保存失败");
                            	console.log("删除本地图片失败");
                            }
                        }
                    });
                } else if (data == "failed") {
                    var txt = "上传失败";
                    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
                }
            }
        });
    });

    // 获取所有行程
    function getAllTripJSON() {
        var tripItemSum = $(".trip-item").length, // 获取行程总数
            tripJSON = {}, // 所有行程的JSON
            tripTime, // 行程时间
            tripImgsObject, // 行程图片的集合
            tripDescription, // 行程描述
            allAripImgsArr; // 所有行程图片的数组
        console.log(tripItemSum);

        for (var i = 1; i <= tripItemSum; i++) {
            // 因为数组是通过push赋值的，所以需要重复创建，防止叠加
            var tripItemArr = new Array(), // 所有行程的集合
                // tripImgsArr = new Array(), // 行程图片的数组，要传到后台然后保存到本地
                tripImgsNameArr = new Array(); // 行程图片名称的数组，要存进JSON里面的

            // 单个行程的含有data-src属性的图片的集合-即原先就有的
            var tripImgsHasDataSrcObject = $("#trip-imgs-box-" + i + " img" + "[data-src]");
            $.each(tripImgsHasDataSrcObject, function(index, value) {
                console.log(value.dataset.src);
                // 先获取有data-src值得img名称
                tripImgsNameArr.push(value.dataset.src);
            });

            // 行程时间
            tripTime = $("#trip-time-input-" + i).val();

            // 单个行程的所有图片的集合，除含有data-src属性的img-新添加的
            tripImgsObject = $("#trip-imgs-box-" + i + " img" + ":not([data-src])");

            // 循环获取单个行程中的含有data-src属性的图片的src并存入tripImgsArr数组中
            $.each(tripImgsObject, function(index, value) {
                // console.log(value);
                // 循环上传每张图片，并返回相应的名称
                $.ajax({
                    url: "ajax/guideUploadImgAjax.jsp",
                    type: "post",
                    async: false,
                    data: {
                        "imgItemBase64": value.src
                    },
                    success: function(data) {
                        var data = $.trim(data);
                        // 将返回的图片名称放入tripImgsNameArr中
                        tripImgsNameArr.push(data);
                    }
                });
                // tripImgsArr.push(value.src);
            });
            console.log(tripImgsNameArr);

            // 单个行程描述
            tripDescription = $("#trip-description-" + i).val();

            // 单个行程的行程时间、行程图片、行程描述
            tripItemArr.push(tripTime, tripImgsNameArr, tripDescription);

            // 将所有行程图片依次存入allAripImgsArr中
            // allAripImgsArr.push(tripTime, tripImgsArr, tripDescription);

            // 依次将单个行程存入tripJSON中
            tripJSON[i - 1] = tripItemArr;
        }
        // console.log(tripJSON);
        return tripJSON;
    }

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
    // 我的产品
    $(".myProdyct").click(function() {
        clickJump("guideStores");
    });
    // 草稿箱
    $(".guideDraftsBox").click(function() {
        clickJump("guideDraftsBox");
    });
    // 产品上传
    $(".guideUploadProduct").click(function() {
        clickJump("guideUploadProduct");
    });

    // 退出登录
    $(".sign-out").click(function() {
        localStorage.removeItem("gphone");
        window.location = "login.jsp";
    });
});

/*城市選擇*/
var expressArea, areaCont, areaList = $("#areaList"),
    areaTop = areaList.offset().top;

$(function() {
    /*打开省市区选项*/
    $("#expressArea").click(function() {
        $("#areaMask").fadeIn();
        $("#areaLayer").animate({
            "bottom": 0
        }, 300);
        // 弹出省市选项时，让html,body的滚动条禁用
        $("html,body").css({
            overflow: "hidden",
            height: "100%"
        });
    });
    /*关闭省市区选项*/
    $("#areaMask, #closeArea").click(function() {
        clockArea();
    });
});

/*关闭省市区选项*/
function clockArea() {
    $("#areaMask").fadeOut();
    $("#areaLayer").animate({
        "bottom": "-100%"
    }, 300);
    intProvince();
}

/*初始化省份*/
function intProvince() {
    areaCont = "";
    for (var i = 0; i < province.length; i++) {
        areaCont += '<li onClick="selectP(' + i + ');">' + province[i] + '</li>';
    }
    areaList.html(areaCont);
    $("#areaBox").scrollTop(0);
    $("#backUp").removeAttr("onClick").hide();
    // 恢复html,body的滚动条
    $("html,body").removeAttr("style");
}
intProvince();

/*选择省份*/
function selectP(p) {
    areaCont = "";
    areaList.html("");
    for (var j = 0; j < city[p].length; j++) {
        areaCont += '<li onClick="selectC(' + p + ',' + j + ');">' + city[p][j] + '</li>';
    }
    areaList.html(areaCont);
    $("#areaBox").scrollTop(0);
    expressArea = province[p];

    if (expressArea == "北京市" || expressArea == "天津市" || expressArea == "上海市" || expressArea == "重庆市") {
        $("#expressArea .city-value").html(expressArea);
        clockArea();
    } else {
        $("#backUp").attr("onClick", "intProvince();").show();
    }
}

/*选择城市*/
function selectC(p, c) {
    clockArea();
    var sCity = city[p][c];
    expressArea += " - " + sCity;
    $("#expressArea .city-value").html(expressArea);
}

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