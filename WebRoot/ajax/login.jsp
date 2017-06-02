<%@page import="BizImpl.GuideBizImpl"%>
<%@page import="Biz.GuideBiz"%>
<%@page import="entitiy.Guide"%>
<%@page import="entitiy.Users"%>
<%@page import="BizImpl.UserBizImpl"%>
<%@page import="Biz.UserBiz"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
	String phone  = request.getParameter("phone");
	String pwd  = request.getParameter("pwd");
	String selectType = request.getParameter("selectType");
	int jurisdiction = 0;
	
	if (selectType.equals("游客")) {
		Users user = new Users();
		user.setPhone(phone);
		user.setPassword(pwd);
		
		UserBiz ub = new UserBizImpl();
		jurisdiction = ub.login(user);
	} else if (selectType.equals("导游")) {
		Guide guide = new Guide();
		guide.setPhone(phone);
		guide.setPassword(pwd);
		
		GuideBiz ub = new GuideBizImpl();
		jurisdiction = ub.login(guide);
	}
	
	String result = "";
	
	if(jurisdiction == 0){
		result = "failed";	
	} else {
		result ="success";
	}
	out.println(result);
%>