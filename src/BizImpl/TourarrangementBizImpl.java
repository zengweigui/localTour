package BizImpl;

import java.util.List;

import Biz.TourarrangementBiz;
import Dao.TourarrangementDao;
import DaoImpl.TourarrangementDaoImpl;
import entitiy.Orders;
import entitiy.Tourarrangement;

public class TourarrangementBizImpl implements TourarrangementBiz {

	TourarrangementDao td = new TourarrangementDaoImpl();
	
	public String setTourState(Tourarrangement t) {
		// TODO Auto-generated method stub
		return td.setTourState(t);
	}
	
	// 产品上传
	public String uploadProduct(Tourarrangement t) {
		// TODO Auto-generated method stub
		return td.uploadProduct(t);
	}
	
	// 获取产品信息 - 导游
	public Tourarrangement getTourInfo(int tid) {
		// TODO Auto-generated method stub
		return td.getTourInfo(tid);
	}
	
	// 再次保存草稿箱
	public String UploadDrafts(Tourarrangement t) {
		return td.UploadDrafts(t);
	}
	
	// 上传产品背景图
	public String UploadTripBg(Tourarrangement t) {
		return td.UploadTripBg(t);
	}
	
	// 根据城市搜索产品
	public List<Tourarrangement> SearchProduct(String city) {
		return td.SearchProduct(city);
	}
	
	// 搜索全部产品
	public List<Tourarrangement> SearchAllProduct() {
		return td.SearchAllProduct();
	}

	// 根据id搜索产品
	public Tourarrangement showTourById(int id) {
		return td.showTourById(id);
	}
}
