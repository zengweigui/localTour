package DaoImpl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import entitiy.Guide;
import entitiy.HibernateSessionFactory;
import entitiy.Tourarrangement;
import entitiy.Users;
import Dao.GuideDao;

public class GuideDaoImpl implements GuideDao {
	
	private Session session;
	private Transaction transaction;
	private Query query;
	private String message = "error";
	HibernateSessionFactory getSessionFactory;
	
	// 注册
	public String registered(Guide guide) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		try {
			transaction = session.beginTransaction();
			session.save(guide);
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
	
	// 登录
	public int login(Guide guide) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		int num = 0;
		try {
			String hql = "from Guide where phone = ? and password = ?";
			query = session.createQuery(hql);
			query.setParameter(0, guide.getPhone());
			query.setParameter(1, guide.getPassword());
			List<Guide> list = query.list();
	        for(Guide g : list){
	            num = g.getId();
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
	
	// 获取店铺信息
	public Guide getShopInfo(String gphone) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();

		Guide guide = new Guide();
		try {
			String hql = "from Guide where phone = ?";
			query = session.createQuery(hql);
			query.setParameter(0, gphone);
			List<Guide> list = query.list();
			
	        for(Guide g : list){
	            guide.setStorename(g.getStorename());
	            guide.setBimage(g.getBimage());
	            guide.setState(g.getState());
	            guide.setProvince(g.getProvince());
	            guide.setCity(g.getCity());
	        }
			
			transaction = session.beginTransaction();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			e.printStackTrace();
			session.close();
		}
		return guide;
	}
	
	// 设置营业状态
	public String setGuideState(Guide g) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		transaction = session.beginTransaction();
		String hql="update Guide g set g.state = ? where phone = ?";
		query = session.createQuery(hql);
		query.setParameter(0, g.getState());
		query.setParameter(1, g.getPhone());
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
	
	// 获取我的产品
	public List<Tourarrangement> ShowAllProduct(String gphone) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		List<Tourarrangement> tourlist = new ArrayList<Tourarrangement>();
		try {
			// 草稿箱不显示
			String hql = "from Tourarrangement where guidephone = ? and drafts = 0";
			query = session.createQuery(hql);
			query.setParameter(0, gphone);
			tourlist = query.list();
			
			transaction = session.beginTransaction();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return tourlist;
	}
	
	// 获取草稿箱产品
	public List<Tourarrangement> ShowDraftsProduct(String gphone) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		List<Tourarrangement> toulist = new ArrayList<Tourarrangement>();
		try {
			// 草稿箱不显示
			String hql = "from Tourarrangement where guidephone = ? and drafts = 1";
			query = session.createQuery(hql);
			query.setParameter(0, gphone);
			toulist = query.list();
			
			transaction = session.beginTransaction();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return toulist;
	}
	
	// 上传店铺背景图
	public String UploadStoreBg(Guide g) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		transaction = session.beginTransaction();
		String hql="update Guide g set g.bimage = ? where phone = ?";
		query = session.createQuery(hql);
		query.setParameter(0, g.getBimage());
		query.setParameter(1, g.getPhone());
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

	// 获取导游信息
	public Guide getGuideInfo(String gphone) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();

		Guide guide = new Guide();
		try {
			String hql = "from Guide where phone = ?";
			query = session.createQuery(hql);
			query.setParameter(0, gphone);
			List<Guide> list = query.list();
			
	        for(Guide g : list){
	            guide.setUsername(g.getUsername());
	            guide.setHead(g.getHead());
	        }
			
			transaction = session.beginTransaction();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			e.printStackTrace();
			session.close();
		}
		return guide;
	}
	
	// 修改资料
	public String GuideModify(Guide g) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		transaction = session.beginTransaction();
		String hql="update Guide g set g.head = ?, g.username = ?, g.storename = ?, g.province = ?, g.city = ? where phone = ?";
		query = session.createQuery(hql);
		query.setParameter(0, g.getHead());
		query.setParameter(1, g.getUsername());
		query.setParameter(2, g.getStorename());
		query.setParameter(3, g.getProvince());
		query.setParameter(4, g.getCity());
		query.setParameter(5, g.getPhone());
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
			String hql="from Guide where phone = ?";
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
}
