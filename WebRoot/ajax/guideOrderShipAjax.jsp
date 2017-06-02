<%@page import="entitiy.Orders"%>
<%@page import="BizImpl.OrdersBizImpl"%>
<%@page import="Biz.OrdersBiz"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
	int orderId = Integer.valueOf(request.getParameter("orderId"));
	int ship = Integer.valueOf(request.getParameter("ship"));
	System.out.println(ship);
	
	OrdersBiz ob = new OrdersBizImpl();
	Orders orders = new Orders();
	orders.setId(orderId);
	orders.setShip(ship);
	
	String result = ob.setOrderShip(orders);

	out.println(result);
%>
