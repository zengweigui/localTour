<%@page import="entitiy.Users"%>
<%@page import="BizImpl.UserBizImpl"%>
<%@page import="Biz.UserBiz"%>
<%@page import="java.io.File"%>
<%@page import="javax.imageio.stream.FileImageOutputStream"%>
<%@page import="sun.misc.BASE64Decoder"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
	String uphone = request.getParameter("uphone");
	String userName  = request.getParameter("userName");
	String AvatarImg  = request.getParameter("AvatarImg");
	
	String imageName = "";

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
	String Path = "D:" + "/" + "JavaProject" + "/" + ".metadata" + "/" + ".me_tcat" + "/" + "webapps" + "/" + "BYSJIMG" + "/" + "userAvatarImg";
	imageName = uphone.toString() + ".jpg";
	
	FileImageOutputStream imageOutput = new FileImageOutputStream(new File(Path,imageName));
	
	imageOutput.write(b, 0, b.length);
	
	imageOutput.close();
	
	UserBiz ub = new UserBizImpl();
	Users user = new Users();
	user.setPhone(uphone);
	user.setHead(imageName);
	user.setUsername(userName);
	
	String result = ub.UserModify(user);
	System.out.println(result);
	out.println(result);
%>