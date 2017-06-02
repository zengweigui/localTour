package DaoImpl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import entitiy.HibernateSessionFactory;
import entitiy.Orders;
import entitiy.Tourarrangement;
import entitiy.Users;

public class TourarrangementDaoImpl implements Dao.TourarrangementDao {
	
	private Session session;
	private Transaction transaction;
	private Query query;
	private String message = "";
	HibernateSessionFactory getSessionFactory;
	
	// 设置产品上下架状态
	public String setTourState(Tourarrangement t) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		transaction = session.beginTransaction();
		String hql="update Tourarrangement t set t.state = ? where id = ?";
		query = session.createQuery(hql);
		query.setParameter(0, t.getState());
		query.setParameter(1, t.getId());
		int ret = query.executeUpdate();
		transaction.commit();
		session.close();
		
		String result = "";
		if (ret == 1) {
			result = "success";
		} else {
			result = "failed";
		}
		return result;
	}
	
	// 产品上传
	public String uploadProduct(Tourarrangement t) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		transaction = session.beginTransaction();
		
		try {
			transaction = session.beginTransaction();
			session.save(t);
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
	
	// 获取产品信息 - 导游
	public Tourarrangement getTourInfo(int tid) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();

		Tourarrangement tour = new Tourarrangement();
		try {
			String hql = "from Tourarrangement where id = ?";
			query = session.createQuery(hql);
			query.setParameter(0, tid);
			List<Tourarrangement> list = query.list();
			
	        for(Tourarrangement t : list){
	        	tour.setId(t.getId());
	        	tour.setGuidephone(t.getGuidephone());
	        	tour.setPrice(t.getPrice());
	        	tour.setTitle(t.getTitle());
	        	tour.setBimages(t.getBimages());
	        	tour.setProvince(t.getProvince());
	        	tour.setCity(t.getCity());
	        	tour.setRemarks(t.getRemarks());
	        	tour.setCostIncludes(t.getCostIncludes());
	        	tour.setMaximumNumber(t.getMaximumNumber());
	        	tour.setDrafts(t.getDrafts());
	        	tour.setAllTripJson(t.getAllTripJson());
	        	tour.setBuynum(t.getBuynum());
	        }
			
			transaction = session.beginTransaction();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			e.printStackTrace();
			session.close();
		}
		return tour;
	}
	
	// 再次保存草稿箱
	public String UploadDrafts(Tourarrangement t) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		transaction = session.beginTransaction();
		String hql="update Tourarrangement t set t.price = ?, t.title = ?, t.province = ?, t.city = ?, t.remarks = ?, t.costIncludes = ?, t.maximumNumber = ?, t.drafts = ?, t.allTripJson = ?, t.buynum = ?, t.deleteState = ?, t.state = ? where id = ?";
		query = session.createQuery(hql);
		query.setParameter(0, t.getPrice());
		query.setParameter(1, t.getTitle());
		query.setParameter(2, t.getProvince());
		query.setParameter(3, t.getCity());
		query.setParameter(4, t.getRemarks());
		query.setParameter(5, t.getCostIncludes());
		query.setParameter(6, t.getMaximumNumber());
		query.setParameter(7, t.getDrafts());
		query.setParameter(8, t.getAllTripJson());
		query.setParameter(9, t.getBuynum());
		query.setParameter(10, t.getDeleteState());
		query.setParameter(11, t.getState());
		query.setParameter(12, t.getId());
		int ret = query.executeUpdate();
		transaction.commit();
		session.close();
		
		String result = "";
		if (ret == 1) {
			result = "success";
		} else {
			result = "failed";
		}
		return result;
	}
	
	// 上传产品背景图
	public String UploadTripBg(Tourarrangement t) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		transaction = session.beginTransaction();
		String hql="update Tourarrangement t set t.bimages = ? where id = ?";
		query = session.createQuery(hql);
		query.setParameter(0, t.getBimages());
		query.setParameter(1, t.getId());
		int ret = query.executeUpdate();
		transaction.commit();
		session.close();
		
		String result = "";
		if (ret == 1) {
			result = "success";
		} else {
			result = "failed";
		}
		return result;
	}
	
	// 根据城市搜索产品
	public List<Tourarrangement> SearchProduct(String city) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		List<Tourarrangement> productlist = new ArrayList<Tourarrangement>();
		try {
			// 草稿箱不显示
			/*String hql = "from Tourarrangement t where  t.city = ? and t.drafts = 0";*/
			String hql = "select t from Tourarrangement t, Guide g where t.guidephone = g.phone and t.city = ? and t.drafts = 0 and t.state = 2 and g.state= '有空'";
			query = session.createQuery(hql);
			query.setParameter(0, city);
			productlist = query.list();
			
			transaction = session.beginTransaction();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		System.out.println(productlist);
		return productlist; 
	}
	
	// 搜索全部产品
	public List<Tourarrangement> SearchAllProduct() {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		List<Tourarrangement> productlist = new ArrayList<Tourarrangement>();
		try {
			String hql = "select t from Tourarrangement t, Guide g where t.guidephone = g.phone and t.drafts = 0 and t.state = 2 and g.state= '有空'";
			query = session.createQuery(hql);
			productlist = query.list();
			
			transaction = session.beginTransaction();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		System.out.println(productlist);
		return productlist; 
	}
	
	// 根据id搜索产品
	public Tourarrangement showTourById(int id) {
		getSessionFactory = new HibernateSessionFactory();
		session = getSessionFactory.getSession();
		
		Tourarrangement tour = new Tourarrangement();
		try {
			String hql = "from Tourarrangement where id = ?";
			query = session.createQuery(hql);
			query.setParameter(0, id);
			List<Tourarrangement> list = query.list();
			
			for(Tourarrangement t : list){
				tour.setTitle(t.getTitle());
				tour.setPrice(t.getPrice());
				tour.setCity(t.getCity());
				tour.setBimages(t.getBimages());
	        }
			
			transaction = session.beginTransaction();
			transaction.commit();
			session.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return tour;
	}
}
