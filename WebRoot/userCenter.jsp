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
	System.out.println("userHome..." + uphone);
	Users u = new Users();
	UserBiz ub = new UserBizImpl();
	u = ub.getUserInfo(uphone);
%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>个人中心</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link rel="stylesheet" href="css/common/reset.css" />
    <link rel="stylesheet" href="css/views/userCenter.css" />
</head>

<body>
    <!-- 导航栏 -->
    <div class="nav clearfix">
        <div class="list-box">
            <ul>
                <li><a class="userHome">首页</a></li>
                <li><a class="userTourList">旅行产品</a></li>
            </ul>
        </div>
        <div class="login-out">
            <a href="login.jsp">登录</a>
            <span class="split">|</span>
            <a href="registered.html">注册</a>
        </div>
        <div class="user-box">
            <div class="user-avatar">
                <img src="../BYSJIMG/userAvatarImg/<%=u.getHead() %>" />
            </div>
            <div class="user-list">
                <ul>
                    <li><a class="userCenter">个人中心</a></li>
                    <li><a class="userOrder">我的订单</a></li>
                    <li><a class="userShoppingCart">购物车</a></li>
                    <li><a class="sign-out">退出登录</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="userCenter-container">
        <div class="avatar-box">
            <img src="../BYSJIMG/userAvatarImg/<%=u.getHead() %>" />
        </div>
        <p id="nickname" class="nickname"><%=u.getUsername() %></p>
        <button class="modify-btn">修改资料</button>
    </div>
    <script src="js/libs/jquery-2.1.3.min.js"></script>
    <script src="js/views/userCenter.js"></script>
</body>

</html>