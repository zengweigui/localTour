<%@page import="entitiy.Guide"%>
<%@page import="BizImpl.GuideBizImpl"%>
<%@page import="Biz.GuideBiz"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
	String gphone = request.getParameter("gphone");
	String state = request.getParameter("state");
	System.out.println(state);
	if (state.equals("没空")) {
		state = "有空";
	} else {
		state = "没空";
	}
	
	System.out.println(gphone);
	System.out.println(state);
	
	GuideBiz gb = new GuideBizImpl();
	Guide guide = new Guide();
	guide.setPhone(gphone);
	guide.setState(state);
	
	String result = gb.setGuideState(guide);
	System.out.println(result);
	out.println(result);
%>
