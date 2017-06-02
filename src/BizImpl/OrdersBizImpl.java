package BizImpl;

import java.util.List;

import entitiy.Orders;
import Biz.OrdersBiz;
import Dao.OrdersDao;
import DaoImpl.OrdersDaoImpl;

public class OrdersBizImpl implements OrdersBiz {
	OrdersDao od = new OrdersDaoImpl();
	
	// 添加订单
	public String addOrder(Orders o) {
		return od.addOrder(o);
	}
	
	// 获取我的订单 -  游客
	public List<Orders> getUserOrders(String uphone) {
		return od.getUserOrders(uphone);
	}
	
	// 获取我的订单 -  导游
	public List<Orders> getGuideOrders(String gphone) {
		return od.getGuideOrders(gphone);
	}
	
	// 设置订单发货状态
	public String setOrderShip(Orders o) {
		return od.setOrderShip(o);
	}
	
	// 游客设置订单状态
	public String setOrderState(Orders o) {
		return od.setOrderState(o);
	}
	
	// 获取订单
	public List<Orders> getUserOrderShip(Orders o) {
		return od.getUserOrderShip(o);
	}
	
	// 根据订单id获取订单详细信息
	public Orders getOrderInfo(int id) {
		return od.getOrderInfo(id);
	}
}
