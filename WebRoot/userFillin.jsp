<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
	String phone  = request.getParameter("uphone");
	String pwd  = request.getParameter("pwd");
	
	session.setAttribute("uphone", phone);
	session.setAttribute("pwd", pwd);
%>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>游客填写资料</title>
	<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />

	<link rel="stylesheet" href="css/common/reset.css" />
	<link rel="stylesheet" href="css/views/userFillin.css" />
	<link rel="stylesheet" href="css/plugins/cropper.min.css" />
    <link rel="stylesheet" href="css/plugins/mui.min.css" />
</head>
<body>
	<div id="showResult" class="fillin-container">
		<div class="edit-box">
			<input id="image" class="file" type="file" name="file" />
			<div id="changeAvatar">
				<img class="changeAvatar-img" src="images/camera.png" />
			</div>
		</div>
		<p class="edit-desc">点击图片编辑头像</p>
		<div class="return">填写资料</div>
		<input id="nickname" class="nickname" type="text" name="nickname" placeholder="昵称" autocomplete="off" />
		<button id="open-btn" class="open-btn" data-phone="18998772818">开启旅行之路</button>
	</div>

	<div id="showEdit">
        <div class="showEdit-btn">
            <button class="mui-btn" data-mui-style="fab" id='cancleBtn'>取消</button>
            <button class="mui-btn" data-mui-style="fab" data-mui-color="primary" id='confirmBtn'>确定</button>
        </div>
        <div id="report">
            <img src="" />
        </div>
    </div>

    <input id="Avatar-img" type="hidden" name="" />

	<script src="js/libs/jquery-2.1.3.min.js"></script>
    <script src="js/plugins/lrz6.mobile.min.js"></script> 
    <script src="js/plugins/dist/lrz.all.bundle.js"></script>
    <script src="js/plugins/cropper.min.js"></script>
    <script src="js/views/userFillin.js"></script>
</body>
</html>