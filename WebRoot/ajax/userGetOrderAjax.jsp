<%@page import="BizImpl.UserBizImpl"%>
<%@page import="Biz.UserBiz"%>
<%@page import="entitiy.Users"%>
<%@page import="entitiy.Orders"%>
<%@page import="BizImpl.OrdersBizImpl"%>
<%@page import="Biz.OrdersBiz"%>
<%@page import="net.sf.json.JSONObject"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
	String uphone = request.getParameter("uphone");
	int ship = Integer.valueOf(request.getParameter("ship"));
	int refund = Integer.valueOf(request.getParameter("refund"));
	
	OrdersBiz ob = new OrdersBizImpl();
	Orders orders = new Orders();
	
	UserBiz ub = new UserBizImpl();
	Users users = new Users();
	
	List<Orders> orderSort = new ArrayList<Orders>();
	List<Users> userList = new ArrayList<Users>();
	
	if (ship == 0 && refund == 1) { // 未发货，并且还未取消订单
		orders.setUphone(uphone);
		orders.setShip(0);
		orders.setRefund(1);

		orderSort = ob.getUserOrderShip(orders);
	} else if(ship == 1 && refund == 1) { // 已发货，并且还未确认订单
		orders.setUphone(uphone);
		orders.setShip(1);
		orders.setRefund(1);

		orderSort = ob.getUserOrderShip(orders);
	} else if(ship == 0 && refund == 0) { // 已取消订单
		orders.setUphone(uphone);
		orders.setShip(0);
		orders.setRefund(0);

		orderSort = ob.getUserOrderShip(orders);
	} else if(ship == 1 && refund == 0) { // 已确认订单
		orders.setUphone(uphone);
		orders.setShip(1);
		orders.setRefund(0);

		orderSort = ob.getUserOrderShip(orders);
	} else if(ship == 2) { // 全部	
		orderSort = ob.getUserOrders(uphone);
	}

	Map<String,Object> m = new HashMap<String,Object>();
	Map<String,String> m2 = new HashMap<String,String>();
	int num = 1;
	for(Orders o : orderSort){
		m.put("id",o.getId());
		m.put("title", o.getTitle());
		m.put("money", o.getMoney());
		m.put("num", o.getNum());
		m.put("tourTime", o.getTourTime());
		m.put("refund", o.getRefund());
		m.put("ship", o.getShip());
		JSONObject jsonObject = JSONObject.fromObject(m);
		m2.put(String.valueOf(num), jsonObject.toString());
		num++;
	}
	response.setContentType("text/html;charset=UTF-8");
	JSONObject jsonObject = JSONObject.fromObject(m2);
	
	// 用户信息
	userList = ub.getUserInfoList(uphone);
	Map<String,Object> m3 = new HashMap<String,Object>();
	Map<String,String> m4 = new HashMap<String,String>();
	int num1 = 1;
	for(Users u : userList){
		m3.put("id",u.getId());
		m3.put("username", u.getUsername());
		m3.put("head", u.getHead());
		JSONObject jsonObject1 = JSONObject.fromObject(m3);
		m4.put(String.valueOf(num1), jsonObject1.toString());
		num++;
	}
	response.setContentType("text/html;charset=UTF-8");
	JSONObject jsonObject1 = JSONObject.fromObject(m4);
	
	// 组合两个JSON
	JSONObject jsonThree = new JSONObject();
    jsonThree.put("0", jsonObject);
    jsonThree.put("1", jsonObject1);
	
	System.out.println(jsonObject);
	System.out.println(jsonObject1);
	System.out.println(jsonThree);
	
	out.println(jsonThree);
%>