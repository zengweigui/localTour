<%@page import="entitiy.Orders"%>
<%@page import="BizImpl.OrdersBizImpl"%>
<%@page import="Biz.OrdersBiz"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
	int id = Integer.valueOf(request.getParameter("id"));
	int ship = Integer.valueOf(request.getParameter("ship"));
	int refund = Integer.valueOf(request.getParameter("refund"));
	
	System.out.println(id);
	System.out.println(ship);
	System.out.println(refund);
	
	OrdersBiz ob = new OrdersBizImpl();
	Orders o = new Orders();
	
	o.setId(id);
	o.setShip(ship);
	o.setRefund(refund);
	
	String result = ob.setOrderState(o);
	System.out.println(result);
	out.println(result);
%>