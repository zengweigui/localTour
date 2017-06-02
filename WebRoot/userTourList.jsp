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
    <title>产品列表</title>
    <link rel="stylesheet" href="css/common/reset.css" />
    <link rel="stylesheet" href="css/views/userTourList.css" />
</head>

<body>
    <!-- 导航栏 -->
    <div class="nav clearfix">
        <div class="list-box">
            <ul>
                <li><a class="userHome">首页</a></li>
                <li><a class="active">旅行产品</a></li>
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
    <!-- 选择城市 -->
    <div class="select-city-box">
        <section class="express-area">
            <div id="expressArea">
                <span class="city-value">省 - 市</span>
            </div>
        </section>
        <button class="all-order">查询全部</button>
        <!--选择地区弹层-->
        <section id="areaLayer" class="express-area-box">
            <header>
                <h3>选择地区</h3>
                <a id="backUp" class="back" href="javascript:void(0)" title="返回"></a>
                <a id="closeArea" class="close" href="javascript:void(0)" title="关闭"></a>
            </header>
            <article id="areaBox">
                <ul id="areaList" class="area-list"></ul>
            </article>
        </section>
        <!--遮罩层-->
        <div id="areaMask" class="mask"></div>
    </div>
    <div class="product-content clearfix">
        <!-- <div class="toulist-box" data-tid="">
            <div class="img-box">
                <img src="images/productBg.jpg">
                <div class="toulist-desc"><span>￥450</span><span>深圳市</span></div>
            </div>
            <div class="ground-box">
                <p>北海道海鲜之旅两日游</p>
            </div>
        </div> -->
        <div class="loading">加载中...</div>
    </div>
    <script src="js/libs/jquery-1.8.3.min.js"></script>
    <script src="js/plugins/jquery.area.data.js"></script>
    <script src="js/views/userTourList.js"></script>
</body>

</html>
