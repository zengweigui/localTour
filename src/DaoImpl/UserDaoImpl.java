package DaoImpl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import entitiy.HibernateSessionFactory;
import entitiy.Orders;
import entitiy.Users;
import Dao.UserDao;

public class UserDaoImpl implements UserDao {

	private Session session;
	private Transaction transaction;
	private Query query;
	private String message = "error";
	HibernateSessionFactory getSessionFactory;

	// 登录
	public int login(Users user) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		int num = 0;
		try {
			String hql = "from Users where phone = ? and password = ? ";
			query = session.createQuery(hql);
			query.setParameter(0, user.getPhone());
			query.setParameter(1, user.getPassword());
			List<Users> list = query.list();
	        for(Users u : list){
	            num = u.getId();
	        }
			transaction = session.beginTransaction();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			e.printStackTrace();
			session.close();
		}
		return num;
	}

	// 注册
	public String registered(Users user) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		try {
			transaction = session.beginTransaction();
			session.save(user);
			transaction.commit();
			message = "success";
			session.close();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			session.close();
			message = "error";
		}
		return message;
	}

	// 获取游客信息
	public List<Users> getUserInfoList(String uphone) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();

		List<Users> userlist = new ArrayList<Users>();
		try {
			String hql = "from Users where phone = ?";
			query = session.createQuery(hql);
			query.setParameter(0, uphone);
			userlist = query.list();

			transaction = session.beginTransaction();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			e.printStackTrace();
			session.close();
		}
		return userlist;
	}

	// 获取游客信息
	public Users getUserInfo(String uphone) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();

		Users user = new Users();
		try {
			String hql = "from Users where phone = ?";
			query = session.createQuery(hql);
			query.setParameter(0, uphone);
			List<Users> list = query.list();

	        for(Users u : list){
	        	user.setUsername(u.getUsername());
	        	user.setHead(u.getHead());
	        	user.setShoppingCartArr(u.getShoppingCartArr());
	        }

			transaction = session.beginTransaction();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			e.printStackTrace();
			session.close();
		}
		return user;
	}

	// 修改资料
	public String UserModify(Users u) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();

		transaction = session.beginTransaction();
		String hql="update Users u set u.head = ?, u.username = ? where phone = ?";
		query = session.createQuery(hql);
		query.setParameter(0, u.getHead());
		query.setParameter(1, u.getUsername());
		query.setParameter(2, u.getPhone());
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

	// 验证是否注册过
	public List<Users> jsRegistered(String phone) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();

		List<Users> userlist = new ArrayList<Users>();

		try {
			String hql="from Users u where phone = ?";
			query = session.createQuery(hql);
			query.setParameter(0, phone);
			userlist = query.list();

			transaction = session.beginTransaction();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			e.printStackTrace();
			session.close();
		}
		return userlist;
	}
	
	// 添加到购物车
	public String addShoppingCart(Users u) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();

		transaction = session.beginTransaction();
		String hql="update Users u set u.shoppingCartArr = ? where phone = ?";
		query = session.createQuery(hql);
		query.setParameter(0, u.getShoppingCartArr());
		query.setParameter(1, u.getPhone());
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
}
