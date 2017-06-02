<%@page import="BizImpl.GuideBizImpl"%>
<%@page import="Biz.GuideBiz"%>
<%@page import="entitiy.Guide"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
	String gphone = request.getParameter("gphone");
	
	GuideBiz gb = new GuideBizImpl();
	Guide guide = gb.getShopInfo(gphone);
	
	String result = guide.getStorename() + "," + guide.getBimage() + "," + guide.getState();
	out.println(result);
%>
