<%@page import="sun.misc.BASE64Decoder"%>
<%@page import="java.io.File"%>
<%@page import="javax.imageio.stream.FileImageOutputStream"%>
<%@page import="entitiy.Tourarrangement"%>
<%@page import="BizImpl.TourarrangementBizImpl"%>
<%@page import="Biz.TourarrangementBiz"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
	int tid  = Integer.valueOf(request.getParameter("tid"));
	String gphone  = request.getParameter("gphone");
	String productBg  = request.getParameter("productBg");
	
	// 产品背景图
	String bgName = "";
	String[] image = productBg.split(",");
	if (image.length == 1) {
		productBg = image[0];
	} else {
		productBg = image[1];
	}
	BASE64Decoder decoder = new BASE64Decoder();
	byte[] b = decoder.decodeBuffer(productBg);
	for (int i = 0; i < b.length; ++i) {
		if (b[i] < 0) {
			b[i] += 256;
		}
	}
	String Path = "D:" + "/" + "JavaProject" + "/" + ".metadata" + "/" + ".me_tcat" + "/" + "webapps" + "/" + "BYSJIMG" + "/" + "tripBg";
	int randomNum = (int) (Math.random() * 100 + 1); // 生成随机数
	bgName = System.currentTimeMillis() + randomNum + ".jpg";

	FileImageOutputStream imageOutput = new FileImageOutputStream(new File(Path,bgName));
	imageOutput.write(b, 0, b.length);
	imageOutput.close();
	// 产品背景图 end
	
	TourarrangementBiz tb = new TourarrangementBizImpl();
	Tourarrangement tour = new Tourarrangement();
	tour.setId(tid);
	tour.setBimages(bgName);
	
	String result = tb.UploadTripBg(tour);
	System.out.println(result);
	out.println(bgName);
%>