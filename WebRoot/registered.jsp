<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="applicable-device" content="mobile">
    <meta name="renderer" content="webkit">
    <meta name="copyright" content="ecmadao">
    <meta name="force-rendering" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no,target-densitydpi=device-dpi">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="full-screen" content="true">
    <meta name="screen-orientation" content="portrait">
    <meta name="renderer" content="webkit">
    <meta name="x5-fullscreen" content="true">
    <meta name="360-fullscreen" content="true">
    <link rel="stylesheet" href="css/common/reset.css">
    <link rel="stylesheet" href="css/views/registered.css">
    <link rel="stylesheet" href="css/plugins/xcConfirm.css">
    <title>注册</title>
</head>

<body>
    <div class="registeredContainer">
        <div class="registered">
            <div class="registered-title">
                <h4>注册</h4>
            </div>
            <div class="registered-content">
                <form class="clearfix" id="registeredForm">
                    <div class="registered-form">
                        <div class="registered-row">
                            <input id="phone" class="registered-input" data-placeholder="手机号" placeholder="手机号" name="account" type="number" autocomplete="off">
                        </div>
                        <div class="registered-row">
                            <input id="pwd" class="registered-input" data-placeholder="密码" placeholder="密码" name="password" type="password" autocomplete="off">
                        </div>
                        <div class="registered-row">
                            <input id="pwdAgain" class="registered-input" data-placeholder="再次输入密码" placeholder="再次输入密码" name="password" type="password">
                        </div>
                        <div class="radio-row">
                            <label class="radio-left">
                                <input type="radio" class="option-input radio" name="example" value="导游" /> <span>导游</span>
                            </label>
                            <label class="radio-right">
                                <input type="radio" class="option-input radio" name="example" value="游客" /> <span>游客</span>
                            </label>
                        </div>
                    </div>
                    <input name="dealerId" value="" type="hidden">
                    <a class="registered-btn" role="submit">注册</a>
                    <div class="registered-tip registered-lr clearfix">
                        <a href="login.jsp" class="fr" id="signupBtn">去登陆</a>
                    </div>
                </form>
            </div>
        </div>
        <!-- particles.js container -->
        <div id="particles-js"></div>
    </div>
    <script src="js/libs/jquery-2.1.3.min.js"></script>
    <script src="js/plugins/particles.min.js"></script>
    <script src="js/plugins/xcConfirm.js"></script>
    <script src="js/views/registered.js"></script>
</body>

</html>

