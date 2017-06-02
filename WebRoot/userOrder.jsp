<%@page import="BizImpl.OrdersBizImpl"%>
<%@page import="Biz.OrdersBiz"%>
<%@page import="BizImpl.UserBizImpl"%>
<%@page import="Biz.UserBiz"%>
<%@page import="entitiy.Users"%>
<%@page import="entitiy.Orders"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
	String uphone = new String(request.getParameter("uphone").trim().getBytes("ISO-8859-1"),"utf-8");
	System.out.println("userOrder..."+uphone);
	 
/* 	Users u = new Users();
	UserBiz ub = new UserBizImpl();
	u = ub.getUserInfo(uphone);
	
	List<Orders> ordersAll = new ArrayList<Orders>();
	Orders o = new Orders();
	OrdersBiz ob = new OrdersBizImpl();
	ordersAll = ob.getUserOrders(uphone); */
%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>我的订单-游客</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link rel="stylesheet" href="css/common/reset.css" />
    <link rel="stylesheet" href="css/views/userOrder.css" />
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
            <a href="registered.html">注册</a>
        </div>
        <div class="user-box">
            <div class="user-avatar">
                <img src="../BYSJIMG/userAvatarImg/<%-- <%=u.getHead() %> --%>" />
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
    <div class="userOrder-container">
        <div class="order-list">
            <span class="all-order spanActive" data-ship="2" data-refund="2">全部</span>
            <span class="ship-order" data-ship="0" data-refund="1">待发货</span>
            <span class="recceipt-order" data-ship="1" data-refund="1">待收货</span>
            <span class="recceipt-order" data-ship="0" data-refund="0">已取消</span>
            <span class="recceipt-order" data-ship="1" data-refund="0">已确认</span>
        </div>
    <%-- <%
   		for(Orders orders :ordersAll){
    %>
        <div class="myOrder-box">
            <div class="guide-info">
                <img src="../BYSJIMG/userAvatarImg/<%=u.getHead() %>" class="user-head" />
                <p class="pUsername">
                    <span class="spanUsername"><%=u.getUsername() %></span>
                </p>
            </div>
            <p class="package-title"><%=orders.getTitle() %></p>
            <p class="purchase-info">出团人数为：<span><%=orders.getNum() %></span>人，实付￥<span class="purchase-price"><%=orders.getMoney() %></span></p>
            <div class="refund-box">
                <span class="buying-time"><%=orders.getTourTime() %></span>
                <button class="refund" data-state="<%=orders.getRefund() %>">取消订单</button>
            </div>
        </div>
    <%
        }
	%> --%>
		<div class="loading">加载中...</div>
    </div>
    <script src="js/libs/jquery-2.1.3.min.js"></script>
    <script src="js/plugins/xcConfirm.js"></script>
    <script src="js/views/userOrder.js"></script>
</body>

</html>
