<%@page import="BizImpl.TourarrangementBizImpl"%>
<%@page import="Biz.TourarrangementBiz"%>
<%@page import="entitiy.Tourarrangement"%>
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
	
	String shoppingCartString = u.getShoppingCartArr();
	String shoppingCartStringConstant = "[]";
	String[] shoppingCartArr = new String[]{};
	
	if (!shoppingCartStringConstant.equals(shoppingCartString)) {
		shoppingCartArr = shoppingCartString.split(",");
	}
	
%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>我的购物车</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link rel="stylesheet" href="css/common/reset.css" />
    <link rel="stylesheet" href="css/views/userShoppingCart.css" />
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
                <img src="../BYSJIMG/userAvatarImg/<%=u.getHead() %>" />
            </div>
            <div class="user-list">
                <ul>
                    <li><a class="userCenter">个人中心</a></li>
                    <li><a class="userOrder">我的订单</a></li>
                    <li><a class="sign-out">退出登录</a></li>
                </ul>
            </div>
        </div>
    </div>
    <input type="hidden" class="hinput" data-shoppingCartString="<%=u.getShoppingCartArr() %>" />
    <div class="ar arct arcrt" style="width: 1200px; margin: 0 auto;">
        <div class="arc mct">
            <div class="arci">
                <div class="bx bx1">
                    <div class="bxc">
                        <div class="bxci">
                            <div class="gdfw fw mblk">
                                <div class="glw">
                                    <table id="goods_list" class="goods cgoods">
                                        <tbody id="listbox">
                                            <tr class="cl hli">
                                                <th class="ghw" width="40%">商品</th>
                                                <th class="gphw" width="10%">单价</th>
                                                <th class="gnhw" width="5%">数量</th>
                                                <th class="gthw" width="10%">出行时间</th>
                                                <th class="gahw" width="10%">联系人姓名</th>
                                                <th class="gahw" width="10%">联系人手机号</th>
                                                <th class="gohw" width="5%">操作</th>
                                            </tr>
                                            <%
                                            if(shoppingCartArr.length != 0) {
                                            	for (int i = 0; i < shoppingCartArr.length; i++) {
                                            	Tourarrangement t = new Tourarrangement();
                                            	TourarrangementBiz tb = new TourarrangementBizImpl();
                                            	int shoppingCartInt = Integer.valueOf(shoppingCartArr[i]);
                                            	t = tb.getTourInfo(shoppingCartInt);
                    						%>
                                            <tr class="cl gilw fov">
                                                <td class="gw" width="40%">
                                                    <dl class="cl">
                                                        <dt>
                                                            <input class="checkbox" type="checkbox" data-price="<%=t.getPrice() %>" style="margin-right: 4px;" autocomplete="off">
                                                            <a href="javascript:void(0);">
                                                                <img class="order-bimage" src="../BYSJIMG/tripBg/<%=t.getBimages() %>">
                                                            </a>
                                                        </dt>
                                                        <dd>
                                                            <p class="tt">
                                                                <a class="order-name" href="javascript:void(0);"><%=t.getTitle() %></a>
                                                            </p>
                                                        </dd>
                                                    </dl>
                                                </td>
                                                <td class="gpw" width="10%">
                                                    <p class="gp">￥<span class="tot price"><%=t.getPrice() %></span><span>.00</span></p>
                                                </td>
                                                <td class="gnw" width="5%">
                                                    <p>
                                                        <span class="oprt now strip minus">-</span>
                                                        <input type="text" class="num ti" value="1" readonly="readonly">
                                                        <span class="oprt now plus add">+</span>
                                                    </p>
                                                </td>
                                                <td class="gtw" width="10%">
											        <span class="package-time">选择出行时间</span>
                                                </td>
                                                <td class="ganw" width="10%">
                                                	<input type="text" class="num ti" style="width: 80%; height: 18px; padding: 2px 4px; border: 1px solid #d7cbc6;" />
                                                </td>
                                                <td class="gapw" width="10%">
                                                	<input type="text" class="num ti" style="width: 80%; height: 18px; padding: 2px 4px; border: 1px solid #d7cbc6;" />
                                                </td>
                                                <td class="gow" width="5%">
                                                    <p>
                                                        <a href="javascript:void(0);" class="oprt del" data-tid="<%=t.getId() %>" data-gphone="<%=t.getGuidephone() %>"> 删除</a>
                                                    </p>
                                                </td>
                                            </tr>
                                            <%
                                            	}
                                            }
                    						%>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="smaw">
                                <p class="ospw">
                                    <span class="cpntw" id="cost_points_wrap">已选商品数量：
                                        <span class="em" id="cost_points">0</span>&nbsp;件
                                    </span>商品总额：
                                    <span class="osp">￥<span id="order_amount">0.00</span>
                                    </span>
                                </p>
                                <p class="chk cl">
                                    <input type="button" name="checkout" value="立即结算" class="si bt imm-set">
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 时间选择弹出 -->
    <div class="pop-package-time">
        <div class="select-time-box"><span class="select-time-return"></span>选择出行时间</div>
        <div id="calendar"></div>
    </div>
    <script src="js/libs/jquery-1.8.3.min.js"></script>
    <script src="js/plugins/xcConfirm.js"></script>
    <script src="js/plugins/jquery-ui-datepicker.min.js"></script>
    <script src="js/views/userShoppingCart.js"></script>
</body>

</html>
