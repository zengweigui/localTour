<%@page import="entitiy.Tourarrangement"%>
<%@page import="BizImpl.TourarrangementBizImpl"%>
<%@page import="Biz.TourarrangementBiz"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
	/*上下架产品*/
	String gphone = request.getParameter("gphone");
	int tid = Integer.valueOf(request.getParameter("tid"));
	String state = request.getParameter("state");
	
	TourarrangementBiz tb = new TourarrangementBizImpl();
	Tourarrangement t = new Tourarrangement();
	t.setGuidephone(gphone);
	t.setId(tid);
	t.setState(state);
	System.out.println("state:" + state + ",tid:" + tid);
	
	String result = tb.setTourState(t);
	System.out.println(result);
	out.println(result);
%>
