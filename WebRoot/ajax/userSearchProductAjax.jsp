<%@page import="entitiy.Tourarrangement"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="BizImpl.TourarrangementBizImpl"%>
<%@page import="Biz.TourarrangementBiz"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
	String city = request.getParameter("city");
	
	List<Tourarrangement> productAll = new ArrayList<Tourarrangement>();
	
	TourarrangementBiz tb = new TourarrangementBizImpl();
	Tourarrangement tour = new Tourarrangement();
	productAll = tb.SearchProduct(city);
	
	Map<String,Object> m = new HashMap<String,Object>();
	Map<String,String> m2 = new HashMap<String,String>();
	int num = 1;
	for(Tourarrangement t : productAll){
		m.put("id",t.getId());
		m.put("price",t.getPrice());
		m.put("title", t.getTitle());
		m.put("city", t.getCity());
		m.put("bimages", t.getBimages());
		JSONObject jsonObject = JSONObject.fromObject(m);
		m2.put(String.valueOf(num), jsonObject.toString());
		num++;
	}
	response.setContentType("text/html;charset=UTF-8");
	JSONObject jsonObject = JSONObject.fromObject(m2);
	System.out.println(jsonObject);
	
	out.println(jsonObject);
%>