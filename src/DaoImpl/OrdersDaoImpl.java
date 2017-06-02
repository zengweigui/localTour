package DaoImpl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import entitiy.Guide;
import entitiy.HibernateSessionFactory;
import entitiy.Orders;
import entitiy.Tourarrangement;
import Dao.OrdersDao;

public class OrdersDaoImpl implements OrdersDao {
	private Session session;
	private Transaction transaction;
	private Query query;
	private String message = "";
	HibernateSessionFactory getSessionFactory;
	
	// 添加订单
	public String addOrder(Orders o) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		try {
			transaction = session.beginTransaction();
			session.save(o);
			transaction.commit();
			message = "success";
			session.close();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			session.close();
			message = "failed";
		}
		return message;
	}
	
	// 获取我的订单 -  游客
	public List<Orders> getUserOrders(String uphone) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		List<Orders> orderlist = new ArrayList<Orders>();
		try {
			String hql = "from Orders where Uphone = ?";
			query = session.createQuery(hql);
			query.setParameter(0, uphone);
			orderlist = query.list();
			
			transaction = session.beginTransaction();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return orderlist;
	}
	
	// 获取我的订单 -  导游
	public List<Orders> getGuideOrders(String gphone) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		List<Orders> orderlist = new ArrayList<Orders>();
		try {
			String hql = "from Orders where Gphone = ?";
			query = session.createQuery(hql);
			query.setParameter(0, gphone);
			orderlist = query.list();
			
			transaction = session.beginTransaction();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return orderlist;
	}
	
	// 设置订单发货状态
	public String setOrderShip(Orders o) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		transaction = session.beginTransaction();
		String hql="update Orders o set o.ship = ? where id = ?";
		query = session.createQuery(hql);
		query.setParameter(0, o.getShip());
		query.setParameter(1, o.getId());
		int ret = query.executeUpdate();
		transaction.commit();

		String result = "";
		if (ret == 1) {
			result = "success";
		} else {
			result = "failed";
		}
		return result;
	}
	
	// 游客设置订单状态
	public String setOrderState(Orders o) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		transaction = session.beginTransaction();
		String hql="update Orders o set o.ship = ?,o.refund = ? where id = ?";
		query = session.createQuery(hql);
		query.setParameter(0, o.getShip());
		query.setParameter(1, o.getRefund());
		query.setParameter(2, o.getId());
		int ret = query.executeUpdate();
		transaction.commit();

		String result = "";
		if (ret == 1) {
			result = "success";
		} else {
			result = "failed";
		}
		return result;
	}
	
	// 获取订单
	public List<Orders> getUserOrderShip(Orders o) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		List<Orders> orderlist = new ArrayList<Orders>();
		try {
			String hql = "from Orders o where Uphone = ? and o.refund = ? and o.ship = ?";
			query = session.createQuery(hql);
			query.setParameter(0, o.getUphone());
			query.setParameter(1, o.getRefund());
			query.setParameter(2, o.getShip());
			orderlist = query.list();

			transaction = session.beginTransaction();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		System.out.println(orderlist);
		return orderlist; 
	}
	
	// 根据订单id获取订单详细信息
	public Orders getOrderInfo(int id) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		Orders order = new Orders();
		try {
			String hql = "from Orders where id = ?";
			query = session.createQuery(hql);
			query.setParameter(0, id);
			List<Orders> list = query.list();
			
			for(Orders o : list){
				order.setTitle(o.getTitle());
				order.setMoney(o.getMoney());
				order.setNum(o.getNum());
				order.setContactsName(o.getContactsName());
				order.setContactsPhone(o.getContactsPhone());
				order.setTid(o.getTid());
				order.setTourTime(o.getTourTime());
	        }
			
			transaction = session.beginTransaction();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return order;
	}
}
