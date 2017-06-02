<%@page import="BizImpl.UserBizImpl"%>
<%@page import="Biz.UserBiz"%>
<%@page import="entitiy.Users"%>
<%@page import="BizImpl.TourarrangementBizImpl"%>
<%@page import="Biz.TourarrangementBiz"%>
<%@page import="entitiy.Tourarrangement"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
	String uphone = session.getAttribute("uphone").toString();
	String gphone = session.getAttribute("gphone").toString();
	int tid = Integer.valueOf(session.getAttribute("tid").toString());
	String title = session.getAttribute("title").toString();
	int price = Integer.valueOf(session.getAttribute("price").toString());
	
	Users u = new Users();
	UserBiz ub = new UserBizImpl();
	u = ub.getUserInfo(uphone);
	
	session.setAttribute("gphone", gphone);
	session.setAttribute("tid", tid);
	session.setAttribute("title", title);
	session.setAttribute("price", price);
	
	System.out.println("tourConfirm..." + tid);
%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>确认订单</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link rel="stylesheet" href="css/common/reset.css" />
    <link rel="stylesheet" href="css/plugins/xcConfirm.css" />
    <link rel="stylesheet" href="css/views/tourConfirm.css" />
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
    <div class="tourConfirm-container">
        <p class="package-title"><i class="iconfont">&#xe608;</i>套餐名称</p>
        <p class="package-name"><%=title %></p>
        <p class="package-time">
            <span class="package-time-title">出行时间：</span>
            <span class="package-time-value">选择出行时间</span>
        </p>
        <!-- 时间选择弹出 -->
        <div class="pop-package-time">
            <div class="select-time-box"><span class="select-time-return"></span>选择出行时间</div>
            <div id="calendar"></div>
        </div>
        <input id="name" type="text" name="姓名" placeholder="请输入姓名" />
        <input id="phone" type="number" name="手机号" placeholder="请输入手机号" />
        <div class="package-total">
            <p id="package-price" class="package-price">
                ￥<span id="total-price" data-base-price="<%=price %>"><%=price %></span>
            </p>
            <div class="purchase-box">
                <i id="subtract" class="iconfont">&#xe620;</i>
                <p class="purchase-p">购买<span id="purchase-number">1</span>套</p>
                <i id="add" class="iconfont">&#xe68c;</i>
            </div>
        </div>
    </div>
    <button class="purchase">立即支付</button>
    <script src="js/libs/jquery-1.8.3.min.js"></script>
    <script src="js/plugins/jquery-ui-datepicker.min.js"></script>
    <script src="js/plugins/xcConfirm.js"></script>
    <script src="js/views/tourConfirm.js"></script>
</body>

</html>
