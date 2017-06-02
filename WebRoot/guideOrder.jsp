<%@page import="BizImpl.UserBizImpl"%>
<%@page import="Biz.UserBiz"%>
<%@page import="entitiy.Users"%>
<%@page import="BizImpl.OrdersBizImpl"%>
<%@page import="Biz.OrdersBiz"%>
<%@page import="entitiy.Orders"%>
<%@page import="BizImpl.GuideBizImpl"%>
<%@page import="Biz.GuideBiz"%>
<%@page import="entitiy.Guide"%>
<%@page import="entitiy.Tourarrangement"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
	String gphone = new String(request.getParameter("gphone").trim().getBytes("ISO-8859-1"),"utf-8");
	System.out.println("guideOrder..."+gphone);
	List<Tourarrangement> productAll = new ArrayList<Tourarrangement>(); 
	Guide g = new Guide();
	GuideBiz gb = new GuideBizImpl();
	/* g = gb.getGuideInfo(gphone); */
	
	productAll = gb.ShowAllProduct(gphone);
	
	List<Orders> ordersAll = new ArrayList<Orders>();
	Orders o = new Orders();
	OrdersBiz ob = new OrdersBizImpl();
	ordersAll = ob.getGuideOrders(gphone);
%>

<!DOCTYPE html>
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
    <link rel="stylesheet" href="css/common/reset.css">
    <link rel="stylesheet" href="css/views/guideOrder.css">
    <link rel="stylesheet" href="css/plugins/xcConfirm.css">
    <link rel="stylesheet" href="css/plugins/cropper.min.css">
    <link rel="stylesheet" href="css/plugins/mui.min.css">
    <title>游客订单</title>
</head>

<body>
    <div class="aside">
        <p class="store-name">...</p>
        <div class="store-photo-container">
            <p>请上传您的店铺背景图</p>
            <input id="shopbg-image" class="file" type="file" name="file" />
            <div id="changeShopbg" class="change">
                <img id="shopbgImg" class="change-img" src="" />
            </div>
        </div>
        <button id="business-btn" class="start-business">开始营业</button>
    </div>
    <!--mainContent-->
    <div class="mainContent">
        <div class="mainContent-nav">
            <div class="ul-box">
                <ul class="text-uppercase">
                    <li><a class="myProdyct">我的产品</a></li>
                    <li><a class="active">游客订单</a></li>
                    <li><a class="guideCenter">个人中心</a></li>
                    <li><a class="guideUploadProduct">上传产品</a></li>
                    <li><a class="guideDraftsBox">草稿箱</a></li>
                </ul>
            </div>
            <button class="sign-out">退出</button>
        </div>
        <div class="order-content clearfix">
    	<%
   			for(Orders orders :ordersAll) {
   				Users u = new Users();
				UserBiz ub = new UserBizImpl();
				String uphone = orders.getUphone();
				u = ub.getUserInfo(uphone);
    	%>
            <div class="myOrder-box" data-oid="<%=orders.getId() %>">
                <div class="guide-info" data-oid="<%=orders.getId() %>">
                    <img src="../BYSJIMG/userAvatarImg/<%=u.getHead() %>" class="user-head" />
                    <p>
                        <span><%=u.getUsername() %></span>
                    </p>
                </div>
                <p class="package-title" data-oid="<%=orders.getId() %>"><%=orders.getTitle() %></p>
                <p class="purchase-info" data-oid="<%=orders.getId() %>">出团人数为：<span><%=orders.getNum() %></span>人，实付￥<span class="purchase-price"><%=orders.getMoney() %></span></p>
                <div class="refund-box">
                    <span class="buying-time"><%=orders.getTourTime() %></span>
                    <button class="refund" data-ship="<%=orders.getShip() %>" data-refund="<%=orders.getRefund() %>" data-oid="<%=orders.getId() %>">发货</button>
                </div>
            </div>
    	<%
        	}
		%>
        </div>
    </div>
    <!--mainContent end-->
    <div id="showEdit" class="showEdit">
        <div class="showEdit-btn">
            <button class="mui-btn cancleBtn" data-mui-style="fab" id='cancleBtn'>取消</button>
            <button class="mui-btn confirmBtn" data-mui-style="fab" data-mui-color="primary" id='confirmBtn'>确定</button>
        </div>
        <div id="report" class="report">
            <img src="" />
        </div>
    </div>
    <script src="js/libs/jquery-2.1.3.min.js"></script>
    <script src="js/plugins/xcConfirm.js"></script>
    <script src="js/plugins/lrz6.mobile.min.js"></script>
    <script src="js/plugins/dist/lrz.all.bundle.js"></script>
    <script src="js/plugins/cropper.min.js"></script>
    <script src="js/views/guideOrder.js"></script>
</body>

</html>

