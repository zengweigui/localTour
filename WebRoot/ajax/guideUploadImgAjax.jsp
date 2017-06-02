<%@page import="sun.misc.BASE64Decoder"%>
<%@page import="java.io.File"%>
<%@page import="javax.imageio.stream.FileImageOutputStream"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
	String imgItemBase64 = request.getParameter("imgItemBase64");
	
	String imageName = "";
	
	String[] image = imgItemBase64.split(",");

	if (image.length == 1) {
		imgItemBase64 = image[0];
	} else {
		imgItemBase64 = image[1];
	}
	
	BASE64Decoder decoder = new BASE64Decoder();
	byte[] b = decoder.decodeBuffer(imgItemBase64);
	for (int i = 0; i < b.length; ++i) {
		if (b[i] < 0) {
			b[i] += 256; //字节数组
		}
	}
	String Path = "D:" + "/" + "JavaProject" + "/" + ".metadata" + "/" + ".me_tcat" + "/" + "webapps" + "/" + "BYSJIMG" + "/" + "tripImg";
	int randomNum = (int) (Math.random() * 100 + 1); // 生成随机数
	imageName = System.currentTimeMillis() + randomNum + ".jpg";
	
	System.out.println(imageName);
	//创建字节输出流对象
	FileImageOutputStream imageOutput = new FileImageOutputStream(new File(Path,imageName));
	
	imageOutput.write(b, 0, b.length);
	
	imageOutput.close();

	out.println(imageName);
%>