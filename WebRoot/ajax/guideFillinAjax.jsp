<%@page import="Biz.GuideBiz"%>
<%@page import="BizImpl.GuideBizImpl"%>
<%@page import="entitiy.Guide"%>
<%@page import="java.io.File"%>
<%@page import="javax.imageio.stream.FileImageOutputStream"%>
<%@page import="sun.misc.BASE64Decoder"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
	String phone = session.getAttribute("gphone").toString();
	String pwd = session.getAttribute("pwd").toString();
	
	String userName  = request.getParameter("userName");
	String storeName  = request.getParameter("storeName");
	String cityValue  = request.getParameter("cityValue");
	String AvatarImg  = request.getParameter("AvatarImg");
	
	String imageName = "";
	if (AvatarImg.equals("TX.png")) {
		imageName = AvatarImg;
	} else {
		String[] image = AvatarImg.split(",");
	
		String imageBase64 = "";
		
		if (image.length == 1) {
			imageBase64 = image[0];
		} else {
			imageBase64 = image[1];
		}
		
		BASE64Decoder decoder = new BASE64Decoder();
		byte[] b = decoder.decodeBuffer(imageBase64);
		for (int i = 0; i < b.length; ++i) {
			if (b[i] < 0){
				b[i] += 256;
			}
		}
		String Path = "D:" + "/" + "JavaProject" + "/" + ".metadata" + "/" + ".me_tcat" + "/" + "webapps" + "/" + "BYSJIMG" + "/" + "guideAvatarImg";
		imageName = phone.toString() + ".jpg";
		
		FileImageOutputStream imageOutput = new FileImageOutputStream(new File(Path,imageName));
		
		imageOutput.write(b, 0, b.length);
		
		imageOutput.close();
	}
	
	String[] array = cityValue.split("-");
	String province = "";
	String city = "";
	if (array.length == 1) {
		city = array[0].trim();
	} else if (array.length == 2) {
		province = array[0].trim();
		city = array[1].trim();
	}
	
	GuideBiz gb = new GuideBizImpl();
	Guide guide = new Guide();
	guide.setPhone(phone);
	guide.setPassword(pwd);
	guide.setUsername(userName);
	guide.setStorename(storeName);
	guide.setCity(city);
	guide.setHead(imageName);
	guide.setProvince(province);
	guide.setState("没空");
	guide.setAge("18");
	guide.setBimage("");
	guide.setWallet(0);
	
	String result = gb.registered(guide);
	System.out.println(result);
	out.println(result);
%>