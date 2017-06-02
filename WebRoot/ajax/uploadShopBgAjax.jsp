<%@page import="java.io.File"%>
<%@page import="javax.imageio.stream.FileImageOutputStream"%>
<%@page import="sun.misc.BASE64Decoder"%>
<%@page import="entitiy.Guide"%>
<%@page import="BizImpl.GuideBizImpl"%>
<%@page import="Biz.GuideBiz"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
	String gphone  = request.getParameter("gphone");
	String storeBgUrl  = request.getParameter("storeBgUrl");
	
	String imageName = "";
	
	String[] image = storeBgUrl.split(",");

	if (image.length == 1) {
		storeBgUrl = image[0];
	} else {
		storeBgUrl = image[1];
	}
	
	System.out.println(storeBgUrl);
	BASE64Decoder decoder = new BASE64Decoder();
	byte[] b = decoder.decodeBuffer(storeBgUrl);
	for (int i = 0; i < b.length; ++i) {
		if (b[i] < 0) {
			b[i] += 256;
		}
	}
	String Path = "D:" + "/" + "JavaProject" + "/" + ".metadata" + "/" + ".me_tcat" + "/" + "webapps" + "/" + "BYSJIMG" + "/" + "guideShopBgImg";
	imageName = gphone.toString() + ".jpg";
	
	FileImageOutputStream imageOutput = new FileImageOutputStream(new File(Path,imageName));
	
	imageOutput.write(b, 0, b.length);
	
	imageOutput.close();
	
	GuideBiz gb = new GuideBizImpl();
	Guide guide = new Guide();
	guide.setPhone(gphone);
	guide.setBimage(imageName);
	
	String result = gb.UploadStoreBg(guide);
	System.out.println(result);
	out.println(result);
%>
