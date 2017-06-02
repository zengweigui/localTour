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
	System.out.println("guideStores..."+gphone);
	List<Tourarrangement> productAll = new ArrayList<Tourarrangement>(); 
	Guide g = new Guide();
	GuideBiz gb = new GuideBizImpl();
	/* g = gb.getGuideInfo(gphone); */
	productAll = gb.ShowAllProduct(gphone);
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
    <link rel="stylesheet" href="css/views/guideStores.css">
    <link rel="stylesheet" href="css/plugins/xcConfirm.css">
    <link rel="stylesheet" href="css/plugins/cropper.min.css">
    <link rel="stylesheet" href="css/plugins/mui.min.css">
    <title>店铺 - 我的产品</title>
</head>

<body>
    <div class="aside">
        <p class="store-name">...</p>
        <div class="store-photo-container">
            <p>请上传您的店铺背景图</p>
            <input id="shopbg-image" class="file" type="file" name="file" />
            <div id="changeShopbg" class="change">
                <img id="shopbgImg" class="change-img" src='' />
            </div>
        </div>
        <button id="business-btn" class="start-business"></button>
    </div>
    <!--mainContent-->
    <div class="mainContent">
        <div class="mainContent-nav">
            <div class="ul-box">
                <ul class="text-uppercase">
                    <li><a class="active">我的产品</a></li>
                    <li><a class="userOrder">游客订单</a></li>
                    <li><a class="guideCenter">个人中心</a></li>
                    <li><a class="guideUploadProduct">上传产品</a></li>
                    <li><a class="guideDraftsBox">草稿箱</a></li>
                </ul>
            </div>
            <button class="sign-out">退出</button>
        </div>
        <div class="product-content clearfix">
        <%
    		for(Tourarrangement tour :productAll){
     	%>
            <div class="toulist-box">
                <div class="img-box" data-tid="<%=tour.getId() %>">
                    <img src="../BYSJIMG/tripBg/<%=tour.getBimages() %>">
                    <div class="toulist-desc"><span>￥<%=tour.getPrice() %></span></div>
                </div>
                <div class="ground-box">
                    <p title="<%=tour.getTitle() %>"><%=tour.getTitle() %></p>
                    <div class="checkbox" data="<%=tour.getState()%>" data-tourID="<%=tour.getId() %>" title="设置产品上下架">
                        <span class="circle"></span>
                        <label class="label" for="checkbox"></label>
                    </div>
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
    <script src="js/views/guideStores.js"></script>
</body>

</html>

