<%@page import="sun.misc.BASE64Encoder"%>
<%@page import="java.io.FileInputStream"%>
<%@page import="java.io.InputStream"%>
<%@page import="BizImpl.UserBizImpl"%>
<%@page import="Biz.UserBiz"%>
<%@page import="entitiy.Users"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
	String uphone = new String(request.getParameter("uphone").trim().getBytes("ISO-8859-1"),"utf-8");
	System.out.println("userCenter..."+uphone);
	Users ui = new Users();
	UserBiz ub = new UserBizImpl();
	ui  = ub.getUserInfo(uphone);
	
	String imagePath = "D:" + "/" + "JavaProject" + "/" + ".metadata" + "/" + ".me_tcat" + "/" + "webapps" + "/" + "BYSJIMG" + "/" + "userAvatarImg/" + ui.getHead();
	
	InputStream inputStream = null;
    byte[] data = null;
    inputStream = new FileInputStream(imagePath);
    data = new byte[inputStream.available()];
    inputStream.read(data);
    inputStream.close();
    
    // 加密
    BASE64Encoder encoder = new BASE64Encoder();
    encoder.encode(data);
    
    String imageBase64 =encoder.encode(data);
%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>修改资料</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link rel="stylesheet" href="css/common/reset.css" />
    <link rel="stylesheet" href="css/views/userModifyData.css" />
    <link rel="stylesheet" href="css/plugins/cropper.min.css" />
    <link rel="stylesheet" href="css/plugins/mui.min.css" />
</head>

<body>
    <div id="showResult" class="fillin-container">
        <div class="edit-box">
            <input id="image" class="file" type="file" name="file" />
            <div id="changeAvatar">
                <img class="changeAvatar-img" data-src="<%=imageBase64 %>" src="../BYSJIMG/userAvatarImg/<%=ui.getHead() %>" />
            </div>
        </div>
        <p class="edit-desc">点击编辑头像</p>
        <div class="return">修改资料</div>
        <input id="nickname" class="nickname" value="<%=ui.getUsername() %>" type="text" name="nickname" placeholder="昵称" autocomplete="off" />
        <button id="open-btn" class="open-btn" data-phone="18998772818">确定修改</button>
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
    <script src="js/libs/jquery-2.1.3.min.js"></script>
    <script src="js/plugins/lrz6.mobile.min.js"></script>
    <script src="js/plugins/dist/lrz.all.bundle.js"></script>
    <script src="js/plugins/cropper.min.js"></script>
    <script src="js/views/userModifyData.js"></script>
</body>

</html>