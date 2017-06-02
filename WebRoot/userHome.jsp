<%@page import="entitiy.Tourarrangement"%>
<%@page import="BizImpl.TourarrangementBizImpl"%>
<%@page import="Biz.TourarrangementBiz"%>
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
	
	TourarrangementBiz tb = new TourarrangementBizImpl();
	
	session.setAttribute("uphone", uphone);
%>

<!doctype html>
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
    <title>首页</title>
    <link rel="stylesheet" href="css/common/reset.css" />
    <link rel="stylesheet" href="css/views/userHome.css" />
    <link rel="stylesheet" href="css/plugins/lunbo.css" />
</head>

<body>
    <!-- 导航栏 -->
    <div class="nav clearfix">
        <div class="list-box">
            <ul>
                <li><a class="active userHome">首页</a></li>
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
    <!-- 轮播图 -->
    <div class="flicker-example" data-block-text="false">
        <ul>
            <li class="intoTour" data-background="images/userLunbo1.jpeg" data-tid="16" /></li>
            <li class="intoTour" data-background="images/userLunbo2.jpeg" data-tid="16" /></li>
        </ul>
    </div>
    <!-- 推荐产品 -->
    <div class="show-title clearfix">
        <h3>推荐产品</h3>
    </div>
    <div class="product-content clearfix">
	    <%
	    	Tourarrangement t16 = tb.showTourById(16);
	     %>
        <div class="intoTour toulist-box" data-tid="16">
            <div class="img-box">
                <img src="../BYSJIMG/tripBg/<%=t16.getBimages() %>">
                <div class="toulist-desc"><span>￥<%=t16.getPrice() %></span><span><%=t16.getCity() %></span></div>
            </div>
            <div class="ground-box">
                <p><%=t16.getTitle() %></p>
            </div>
        </div>
        <%
	    	Tourarrangement t21 = tb.showTourById(21);
	     %>
        <div class="intoTour toulist-box" data-tid="21">
            <div class="img-box">
                <img src="../BYSJIMG/tripBg/<%=t21.getBimages() %>">
                <div class="toulist-desc"><span>￥<%=t21.getPrice() %></span><span><%=t21.getCity() %></span></div>
            </div>
            <div class="ground-box">
                <p><%=t21.getTitle() %></p>
            </div>
        </div>
        <%
	    	Tourarrangement t23 = tb.showTourById(23);
	     %>
        <div class="intoTour toulist-box" data-tid="23">
            <div class="img-box">
                <img src="../BYSJIMG/tripBg/<%=t23.getBimages() %>">
                <div class="toulist-desc"><span>￥<%=t23.getPrice() %></span><span><%=t23.getCity() %></span></div>
            </div>
            <div class="ground-box">
                <p><%=t23.getTitle() %></p>
            </div>
        </div>
    </div>
    <script src="js/libs/jquery-1.8.3.min.js"></script>
    <script src="js/plugins/lunbo.min.js"></script>
    <script src="js/views/userHome.js"></script>
    <script src="http://api.map.baidu.com/api?v=2.0&ak=ntPweqMBmxbd8o5KgLPeOOwQQ7s17Ti5"></script>
</body>

</html>