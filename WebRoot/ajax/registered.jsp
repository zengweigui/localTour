<%@page import="BizImpl.UserBizImpl"%>
<%@page import="Biz.UserBiz"%>
<%@page import="entitiy.Users"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
	String phone  = request.getParameter("phone");
	String pwd  = request.getParameter("pwd");
	String selectType = request.getParameter("selectType");

	Users user = new Users();
	user.setPhone(phone);
	user.setPassword(pwd);
	
	UserBiz ub = new UserBizImpl();
	String result = ub.registered(user);
	out.println(result);
%>
