<%@page import="BizImpl.OrdersBizImpl"%>
<%@page import="Biz.OrdersBiz"%>
<%@page import="entitiy.Orders"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
	int oid = Integer.valueOf(request.getParameter("oid"));
	System.out.println("orderDetails..."+oid);
	
	Orders o = new Orders();
	OrdersBiz ob = new OrdersBizImpl();
	o = ob.getOrderInfo(oid);
%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>订单详细</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="cache-control" content="no-cache" />
    <link rel="stylesheet" href="css/common/reset.css" />
    <link rel="stylesheet" href="css/views/orderDetails.css" />
</head>

<body>
    <div class="return"><span class="return-icon"></span>订单详情</div>
    <div class="detail_container">
        <div class="order-title">订单详细</div>
        <div class="product-box" data-tid="<%=o.getTid() %>">
            <span class="product-name"><%=o.getTitle() %></span>
            <span class="product-number">×<%=o.getNum() %></span>
            <span class="product-price">￥<%=o.getMoney() %></span>
        </div>
        <div class="reserve-box">
            <div class="reserve-name">预定人：<%=o.getContactsName() %></div>
            <div class="reserve-phone">预定手机号：<a href="tel:110120119114"><%=o.getContactsPhone() %></a></div>
        </div>
        <div class="order-title">订单信息</div>
        <div class="order-box">
            <div class="order-number">订单号码：<%=o.getTid() %></div>
            <div class="order-time">出游时间：<%=o.getTourTime() %></div>
        </div>
    </div>
    <script src="js/libs/jquery-2.1.3.min.js"></script>
    <script src="js/views/orderDetails.js"></script>
</body>

</html>

