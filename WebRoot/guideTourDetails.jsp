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
	/* String uphone = session.getAttribute("uphone").toString(); */
	int tid = Integer.valueOf(request.getParameter("tid"));
	System.out.println("tourDetails..."+tid);
	
	/* Users u = new Users();
	UserBiz ub = new UserBizImpl();
	u = ub.getUserInfo(uphone); */
	
	Tourarrangement t = new Tourarrangement();
	TourarrangementBiz tb = new TourarrangementBizImpl();
	t = tb.getTourInfo(tid);
	
	String gphone = t.getGuidephone();
	String title = t.getTitle();
	int price = t.getPrice();
	
	/* session.setAttribute("gphone", gphone);
	session.setAttribute("tid", tid);
	session.setAttribute("title", title);
	session.setAttribute("price", price); */
	
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
    
    <style>
    	/* 顶部 */
		.return { display: -webkit-flex; display: flex; justify-content: center; align-items: center;
		    position: relative; left: 0; top: 0; width: 100%; height: 50px; z-index: 1; font: 1.4em "微软雅黑";
		    border-bottom: 1px solid #ebebeb; background-color: #fff; }
		.return-icon { position: absolute; left: 5px; top: 0; display: block; width: 50px; height: 50px; cursor: pointer;
		    background: #fff url(images/return-icon.png) left center no-repeat; }
    </style>
</head>

<body>
	<div class="return"><span class="return-icon"></span>产品详情</div>
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
    <script>
    	// 返回
		$(".return-icon").click(function() {
			history.go(-1);
		});
    </script>
</body>

</html>