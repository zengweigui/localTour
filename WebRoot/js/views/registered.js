$(document).ready(function() {
    $("input").focus(function() {
        var that = $(this);

        that.attr("placeholder", "");
    });

    $("input").blur(function() {
        var that = $(this),
            placeholder = that.attr("data-placeholder");

        that.attr("placeholder", placeholder);
    });

    // 点击注册
    $(".registered-btn").click(function() {
        var that = $(this),
            phoneVal = $("#phone").val(), // 手机号
            pwdVal = $("#pwd").val(), // 密码
            pwdAgainVal = $("#pwdAgain").val(), // 再次输入密码
            selectTypeVal = $("input[type=radio]:checked").val();
        
        if (phoneVal == "") {
            var txt = "手机号不能为空";
            window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
        } else if (pwdVal == "") {
            var txt = "密码不能为空";
            window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
        } else if (pwdVal != pwdAgainVal) {
            var txt = "密码不一致";
            window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
        } else {
        	$.ajax({
                url: "ajax/isRegisteredAjax.jsp",
                type: "post",
                async: false,
                data: {
                    "phone": phoneVal,
                    "selectType": selectTypeVal
                },
                success: function(data) {
                	var data = $.trim(data),
                		dataLength = getJsonLength(data);
                	
                	console.log(data);
                	console.log(dataLength);
                	
                	if (dataLength != 2) { // 已注册
                		var txt = "该手机号已经注册！请换一个手机号";
                        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm);
                	} else { // 未注册
                    	if (selectTypeVal == "导游") {
                        	window.location = "guideFillin.jsp?gphone=" + phoneVal + "&pwd=" + pwdVal;
                        } else if (selectTypeVal == "游客") {
                        	window.location = "userFillin.jsp?uphone=" + phoneVal + "&pwd=" + pwdVal;
                        }
                	}
                }
            });
        }
    });
});

//获取json的长度
function getJsonLength(jsonData){
	var jsonLength = 0;
	for(var item in jsonData){
		jsonLength++;
	}
	return jsonLength;
}

particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 60,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#fff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 8,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": false,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true,
    "config_demo": {
        "hide_card": false,
        "background_color": "#b61924",
        "background_image": "",
        "background_position": "50% 50%",
        "background_repeat": "no-repeat",
        "background_size": "cover"
    }
});