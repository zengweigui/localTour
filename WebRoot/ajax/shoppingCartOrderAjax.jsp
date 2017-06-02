<%@page import="BizImpl.OrdersBizImpl"%>
<%@page import="entitiy.Orders"%>
<%@page import="Biz.OrdersBiz"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
	String uphone = request.getParameter("uphone");
	String gphone = request.getParameter("gphone");
	int tid = Integer.valueOf(request.getParameter("tid"));
	String title = request.getParameter("title");
	int totalPrice = Integer.valueOf(request.getParameter("totalPrice"));
	int sum = Integer.valueOf(request.getParameter("sum"));
	String contactsName = request.getParameter("contactsName");
	String contactsPhone = request.getParameter("contactsPhone");
	String packageTimeValue = request.getParameter("packageTimeValue");
	
	OrdersBiz ob = new OrdersBizImpl();
	Orders o = new Orders();
	o.setUphone(uphone);
	o.setGphone(gphone);
	o.setTid(tid);
	o.setTitle(title);
	o.setMoney(totalPrice);
	o.setTourTime(packageTimeValue);
	o.setNum(sum);
	o.setContactsName(contactsName);
	o.setContactsPhone(contactsPhone);
	o.setRefund(1);
	o.setShip(0);
	o.setConfirm(0);
	
	String result = ob.addOrder(o);
	System.out.println(result);
	out.println(result);
%>
