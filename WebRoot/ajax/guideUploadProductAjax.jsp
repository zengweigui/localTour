<%@page import="entitiy.Tourarrangement"%>
<%@page import="BizImpl.TourarrangementBizImpl"%>
<%@page import="Biz.TourarrangementBiz"%>
<%@page import="java.io.File"%>
<%@page import="javax.imageio.stream.FileImageOutputStream"%>
<%@page import="sun.misc.BASE64Decoder"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
	String gphone = request.getParameter("gphone");
	String productBg = request.getParameter("productBg");
	String productTitle = request.getParameter("productTitle");
	int productPrice = Integer.valueOf(request.getParameter("productPrice"));
	String productStock = request.getParameter("productStock");
	String cityValue = request.getParameter("cityValue");
	String costIncludes = request.getParameter("costIncludes");
	String remarkInformation = request.getParameter("remarkInformation");
	String allTripJSON = request.getParameter("allTripJSON");
	String drafts = request.getParameter("drafts");
	
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
	String Path = "D:" + "/" + "JavaProject" + "/" + ".metadata" + "/" + ".me_tcat" + "/"
					+ "webapps" + "/" + "BYSJIMG" + "/" + "tripBg";
	int randomNum = (int) (Math.random() * 100 + 1); // 生成随机数
	bgName = System.currentTimeMillis() + randomNum + ".jpg";

	FileImageOutputStream imageOutput = new FileImageOutputStream(new File(Path,bgName));
	imageOutput.write(b, 0, b.length);
	imageOutput.close();
	// 产品背景图 end
	
	// 省市
	String[] array = cityValue.split("-");
	String province = "";
	String city = "";
	if (array.length == 1) {
		city = array[0].trim();
	} else if (array.length == 2) {
		province = array[0].trim();
		city = array[1].trim();
	}
	
	TourarrangementBiz tb = new TourarrangementBizImpl();
	Tourarrangement t = new Tourarrangement();
	t.setGuidephone(gphone);
	t.setPrice(productPrice);
	t.setTitle(productTitle);
	t.setBimages(bgName);
	t.setProvince(province);
	t.setCity(city);
	t.setRemarks(remarkInformation);
	t.setCostIncludes(costIncludes);
	t.setMaximumNumber(productStock);
	t.setDrafts(drafts);
	t.setAllTripJson(allTripJSON);
	t.setBuynum(0);
	t.setDeleteState(0);
	t.setState("1");
	
	String result = tb.uploadProduct(t);
	System.out.println(result);
	out.println(result);
%>