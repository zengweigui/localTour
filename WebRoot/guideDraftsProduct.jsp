<%@page import="net.sf.json.JSONObject"%>
<%@page import="BizImpl.TourarrangementBizImpl"%>
<%@page import="Biz.TourarrangementBiz"%>
<%@page import="entitiy.Guide"%>
<%@page import="entitiy.Tourarrangement"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
	int tid = Integer.valueOf(request.getParameter("tid"));
	System.out.println("guideDraftsProduct..."+tid);
	
	Tourarrangement t = new Tourarrangement();
	TourarrangementBiz tb = new TourarrangementBizImpl();
	t = tb.getTourInfo(tid);
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
    <link rel="stylesheet" href="css/views/guideDraftsProduct.css">
    <link rel="stylesheet" href="css/plugins/xcConfirm.css">
    <link rel="stylesheet" href="css/plugins/cropper.min.css">
    <link rel="stylesheet" href="css/plugins/mui.min.css">
    <title>编辑草稿产品</title>
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
        <div class="common-btn-box">
            <button id="save-draft" class="save-draft common-btn">保存草稿</button>
            <button id="upload-product" class="upload-product common-btn">确认上传</button>
        </div>
    </div>
    <!--mainContent-->
    <div class="mainContent" data-tid="<%=tid %>">
        <div class="mainContent-nav">
            <div class="ul-box">
                <ul class="text-uppercase">
                    <li><a class="myProdyct">我的产品</a></li>
                    <li><a class="userOrder">游客订单</a></li>
                    <li><a class="guideCenter">个人中心</a></li>
                    <li><a class="guideUploadProduct">上传产品</a></li>
                    <li><a class="guideDraftsBox">草稿箱</a></li>
                </ul>
            </div>
            <button class="sign-out">退出</button>
        </div>
        <div class="addProduct-content clearfix">
            <div class="product-bg-big-box">
                <span class="cancel-picture hide"></span>
                <p>请上传您的产品展示图</p>
                <input id="product-bg-input" class="file" type="file" name="file" />
                <img class="product-bg" src="../BYSJIMG/tripBg/<%=t.getBimages() %>" data-src="<%=t.getBimages() %>" />
                <div class="set-title">
                    <input id="product-title" value="<%=t.getTitle() %>" placeholder="填写产品标题" maxlength="36" type="text">
                </div>
            </div>
            <div class="product-information clearfix">
                <div class="information-box">
                    <span class="information-tit">价格</span>
                    <div class="input-information">
                        <input class="product-price" value="<%=t.getPrice() %>" type="number" name="价格" placeholder="请输入价格" />
                    </div>
                </div>
                <div class="information-box">
                    <span class="information-tit">库存</span>
                    <div class="input-information">
                        <input class="product-stock" value="<%=t.getMaximumNumber() %>" type="number" name="库存" placeholder="请输入库存" />
                    </div>
                </div>
                <div class="information-box">
                    <span class="information-tit">选择省市</span>
                    <div class="input-information">
                        <section class="express-area">
                            <div id="expressArea">
                                <span class="city-value"><%=t.getProvince() %> - <%=t.getCity() %></span>
                            </div>
                        </section>
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
                </div>
            </div>
            <div class="booking-information">
                <span class="notes-tit">费用包含</span>
                <p class="limited-number">
                    <label class="cost-includes-yishuru">0</label> /
                    <label class="cost-includes-shengyu">1000</label>字</p>
                <textarea class="cost-includes" maxlength="1000" placeholder="请输入费用包含"><%=t.getCostIncludes() %></textarea>
                <span class="notes-tit">备注说明</span>
                <p class="limited-number">
                    <label class="remark-information-yishuru">0</label> /
                    <label class="remark-information-shengyu">1000</label>字</p>
                <textarea class="remark-information" maxlength="1000" placeholder="请输入备注说明"><%=t.getRemarks() %></textarea>
            </div>
            <div class="add-trip-box-title">添加行程</div>
            <div class="add-trip-box" data-trip-json='<%=t.getAllTripJson() %>'>
                <!-- 一个行程 -->
                <!-- <div id="trip-item-1" class="trip-item">
                    <div class="trip-time-box">
                        <input id="trip-time-input-1" class="trip-time-input" type="text" placeholder="在这儿填写行程时间" />
                    </div>
                    <div id="trip-imgs-box-1" class="trip-imgs-box">
                        <div class="add-trip-imgs-btn">
                            <input id="trip-image-input-1" class="trip-image-input" type="file" name="file" multiple="multiple" title="添加行程图片" />
                        </div>
                    </div>
                    <textarea id="travel-description-1" placeholder="在这儿填写行程描述...."></textarea>
                </div> -->
                <a class="add-trip-btn" title="添加一个行程"></a>
            </div>
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
    <script src="json/jquery.area.data.json"></script>
    <script src="js/views/guideDraftsProduct.js"></script>
</body>

</html>