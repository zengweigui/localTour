package Biz;

import java.util.List;

import entitiy.Orders;

public interface OrdersBiz {
	// 添加订单
	public String addOrder(Orders o);
	
	// 获取我的订单 -  游客
	public List<Orders> getUserOrders(String uphone);
	
	// 获取我的订单 -  导游
	public List<Orders> getGuideOrders(String gphone);
	
	// 设置订单发货状态
	public String setOrderShip(Orders o);
	
	// 设置订单发货状态
	public String setOrderState(Orders o);
	
	// 获取订单
	public List<Orders> getUserOrderShip(Orders o);
	
	// 根据订单id获取订单详细信息
	public Orders getOrderInfo(int id);
}
