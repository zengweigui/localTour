<%@page import="BizImpl.UserBizImpl"%>
<%@page import="Biz.UserBiz"%>
<%@page import="entitiy.Users"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="Biz.TourarrangementBiz"%>
<%@page import="entitiy.Tourarrangement"%>
<%@page import="BizImpl.TourarrangementBizImpl"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
	String uphone = session.getAttribute("uphone").toString();
	int tid = Integer.valueOf(request.getParameter("tid"));
	System.out.println("tourDetails..."+tid);
	
	Users u = new Users();
	UserBiz ub = new UserBizImpl();
	u = ub.getUserInfo(uphone);
	
	Tourarrangement t = new Tourarrangement();
	TourarrangementBiz tb = new TourarrangementBizImpl();
	t = tb.getTourInfo(tid);
	
	String gphone = t.getGuidephone();
	String title = t.getTitle();
	int price = t.getPrice();
	
	session.setAttribute("uphone", uphone);
	session.setAttribute("gphone", gphone);
	session.setAttribute("tid", tid);
	session.setAttribute("title", title);
	session.setAttribute("price", price);
	
	System.out.println(gphone);
%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>产品详情</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link rel="stylesheet" href="css/common/reset.css" />
    <link rel="stylesheet" href="css/views/tourDetails.css" />
    <link rel="stylesheet" href="css/plugins/xcConfirm.css">
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
            <a href="registered.jsp">注册</a>
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
    <div class="tourDetails-container">
        <div class="tour-top-box clearfix">
            <div class="tour-bg">
                <img src="../BYSJIMG/tripBg/<%=t.getBimages() %>" />
            </div>
            <div class="tour-info">
                <p class="tour-title"><%=t.getTitle() %></p>
                <p class="tour-price-box">
                    <span class="tour-price-jiage">价格：</span>
                    <span class="tour-price-symbol">￥</span>
                    <span class="tour-price"><%=t.getPrice() %></span>
                </p>
                <p class="booking-information-box clearfix">
                    <span class="booking-information-title">费用包含：</span>
                    <span class="booking-information-value cost-included-value"><%=t.getCostIncludes() %></span>
                </p>
                <p class="booking-information-box clearfix">
                    <span class="booking-information-title">备注说明：</span>
                    <span class="booking-information-value instruction-manual-value"><%=t.getRemarks() %></span>
                </p>
                <p class="tour-sales">已售卖<%=t.getBuynum() %>份</p>
                <button class="detsils-btn shoppingCart-button" data-shoppingCartArr="<%=u.getShoppingCartArr() %>" data-tid="<%=tid %>">加入购物车</button>
                <button class="detsils-btn buy-button">立即购买</button>
            </div>
        </div>
        <div class="tour-bottom-box">
            <div class="tour-bottom-top">
                <span class="tour-details-title">路线详情</span>
            </div>
            <div class="tour-route-box" data-allTripJson='<%=t.getAllTripJson() %>'>
                <!-- <div class="tour-time-box">
                    <p class="tour-time">第一天上午</p>
                </div>
                <div class="tour-img-box">
                    <img src="images/userLunbo1.jpeg" />
                    <img src="images/userLunbo2.jpeg" />
                </div>
                <p class="tour-description">本店概不受理</p> -->
            </div>
            <!-- 返回顶部 到底部 -->
            <ul id="side-bar" class="side-pannel">
                <a class="goTop" style="display:none;">
                    <span class="scroll-top-icon"></span>
                </a>
                <a class="goBottom" style="display:block;">
                    <span class="scroll-bottom-icon"></span>
                </a>
            </ul>
        </div>
    </div>
    <script src="js/libs/jquery-2.1.3.min.js"></script>
    <script src="js/plugins/xcConfirm.js"></script>
    <script src="js/views/tourDetails.js"></script>
</body>

</html>