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
	int tid = Integer.valueOf(request.getParameter("tid"));
	String productTitle = request.getParameter("productTitle");
	int productPrice = Integer.valueOf(request.getParameter("productPrice"));
	String productStock = request.getParameter("productStock");
	String cityValue = request.getParameter("cityValue");
	String costIncludes = request.getParameter("costIncludes");
	String remarkInformation = request.getParameter("remarkInformation");
	String allTripJSON = request.getParameter("allTripJSON");
	String drafts = request.getParameter("drafts");
	
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
	t.setId(tid);
	t.setPrice(productPrice);
	t.setTitle(productTitle);
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
	
	String result = tb.UploadDrafts(t);
	System.out.println(result);
	out.println(result);
%>