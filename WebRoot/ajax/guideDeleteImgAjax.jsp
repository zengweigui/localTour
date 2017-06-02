<%@page import="java.io.File"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
	String category  = request.getParameter("category"); // 判断是背景图还是行程图片
	String imgNameString  = request.getParameter("imgNameArr"); // 图片名称数组，传过来是字符串，用逗号分隔了
	
	System.out.println(imgNameString);
	
	String result = "success";
	
	String[] imgNameStringArr = imgNameString.split(",");
	
	if (category.equals("0")) {
		// 删除背景图
		try {
			for (int i = 0; i < imgNameStringArr.length; i++) {
				System.out.println("D:/JavaProject/.metadata/.me_tcat/webapps/BYSJIMG/tripBg/" + imgNameStringArr[i]);
				File file = new File("D:/JavaProject/.metadata/.me_tcat/webapps/BYSJIMG/tripBg/" + imgNameStringArr[i]);
				file.delete();
			}
		} catch (Exception e) {
			e.printStackTrace();
			result = "failed";
		}
	} else if (category.equals("1")) {
		// 删除行程图
		try {
			for (int i = 0; i < imgNameStringArr.length; i++) {
				System.out.println("D:/JavaProject/.metadata/.me_tcat/webapps/BYSJIMG/tripImg/" + imgNameStringArr[i]);
				File file = new File("D:/JavaProject/.metadata/.me_tcat/webapps/BYSJIMG/tripImg/" + imgNameStringArr[i]);
				file.delete();
			}
		} catch (Exception e) {
			e.printStackTrace();
			result = "failed";
		}
		
	}
	
	out.println(result);
%>