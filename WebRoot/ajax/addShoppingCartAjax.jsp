<%@page import="entitiy.Users"%>
<%@page import="BizImpl.UserBizImpl"%>
<%@page import="Biz.UserBiz"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
	String uphone = request.getParameter("uphone");
	String shoppingCartArr = request.getParameter("shoppingCartArr");
	System.out.println(shoppingCartArr);

	UserBiz ub = new UserBizImpl();
	Users user = new Users();
	user.setPhone(uphone);
	user.setShoppingCartArr(shoppingCartArr);

	String result = ub.addShoppingCart(user);

	out.println(result);
%>