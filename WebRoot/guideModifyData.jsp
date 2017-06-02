<%@page import="sun.misc.BASE64Encoder"%>
<%@page import="java.io.FileInputStream"%>
<%@page import="java.io.InputStream"%>
<%@page import="BizImpl.GuideBizImpl"%>
<%@page import="Biz.GuideBiz"%>
<%@page import="entitiy.Guide"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
	String gphone = new String(request.getParameter("gphone").trim().getBytes("ISO-8859-1"),"utf-8");
	System.out.println("guideCenter..."+gphone);
	Guide gi = new Guide();
	Guide si = new Guide();
	GuideBiz gb = new GuideBizImpl();
	gi  = gb.getGuideInfo(gphone);
	si  = gb.getShopInfo(gphone);
	
	String imagePath = "D:" + "/" + "JavaProject" + "/" + ".metadata" + "/" + ".me_tcat" + "/" + "webapps" + "/" + "BYSJIMG" + "/" + "guideAvatarImg/" + gi.getHead();
	
	InputStream inputStream = null;
    byte[] data = null;
    inputStream = new FileInputStream(imagePath);
    data = new byte[inputStream.available()];
    inputStream.read(data);
    inputStream.close();
    
    // 加密
    BASE64Encoder encoder = new BASE64Encoder();
    encoder.encode(data);
    
    String imageBase64 =encoder.encode(data);
%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>导游修改资料</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link rel="stylesheet" href="css/common/reset.css" />
    <link rel="stylesheet" href="css/views/guideModifyData.css" />
    <link rel="stylesheet" href="css/plugins/cropper.min.css" />
    <link rel="stylesheet" href="css/plugins/mui.min.css" />
    <link rel="stylesheet" href="css/plugins/xcConfirm.css" />
</head>

<body>
    <div id="showResult" class="fillin-container">
        <div class="edit-box">
            <input id="image" class="file" type="file" name="file" />
            <div id="changeAvatar">
                <img class="changeAvatar-img" data-src="<%=imageBase64 %>" src="../BYSJIMG/guideAvatarImg/<%=gi.getHead() %>" />
            </div>
        </div>
        <p class="edit-desc">点击编辑头像</p>
        <div class="return">修改资料</div>
        <input id="nickname" class="nickname" type="text" value="<%=gi.getUsername() %>" name="nickname" placeholder="昵称" autocomplete="off" />
        <input id="store-Name" class="nickname" type="text" value="<%=si.getStorename() %>" name="store-Name" placeholder="店铺名称" autocomplete="off" />
        <!--选择地区-->
        <section class="express-area">
            <div id="expressArea">
                <span class="xuanzediqu">选择省市：</span>
                <span class="city-value"><%=si.getProvince() %> - <%=si.getCity() %></span>
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
        <button id="open-btn" class="open-btn" data-phone="18998772818">保存修改</button>
    </div>
    <div id="showEdit">
        <div class="showEdit-btn">
            <button class="mui-btn" data-mui-style="fab" id='cancleBtn'>取消</button>
            <button class="mui-btn" data-mui-style="fab" data-mui-color="primary" id='confirmBtn'>确定</button>
        </div>
        <div id="report">
            <img src="" />
        </div>
    </div>
    <input id="Avatar-img" type="hidden" name="" />
    <script src="js/libs/jquery-2.1.3.min.js"></script>
    <script src="js/plugins/lrz6.mobile.min.js"></script>
    <script src="js/plugins/dist/lrz.all.bundle.js"></script>
    <script src="js/plugins/cropper.min.js"></script>
    <script src="js/plugins/jquery.area.data.js"></script>
    <script src="js/plugins/xcConfirm.js"></script>
    <script src="js/views/guideModifyData.js"></script>
</body>

</html>