<%@page import="BizImpl.GuideBizImpl"%>
<%@page import="Biz.GuideBiz"%>
<%@page import="entitiy.Guide"%>
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
	String selectType = request.getParameter("selectType");
	List<Users> userList = new ArrayList<Users>();
	
	if (selectType.equals("游客")) {
		Users user = new Users();

		UserBiz ub = new UserBizImpl();
		userList = ub.jsRegistered(phone);
	} else if (selectType.equals("导游")) {
		Guide guide = new Guide();

		GuideBiz gb = new GuideBizImpl();
		userList = gb.jsRegistered(phone);
	}
	
	System.out.println(userList);
	out.println(userList);
%>
