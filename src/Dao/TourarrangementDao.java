package Dao;

import java.util.List;

import entitiy.Orders;
import entitiy.Tourarrangement;

public interface TourarrangementDao {
	// 产品上下架
	public String setTourState(Tourarrangement t);
	
	// 产品上传
	public String uploadProduct(Tourarrangement t);
	
	// 获取产品信息 - 导游
	public Tourarrangement getTourInfo(int tid);
	
	// 再次保存草稿箱
	public String UploadDrafts(Tourarrangement t);
	
	// 上传产品背景图
	public String UploadTripBg(Tourarrangement t);
	
	// 根据城市搜索产品
	public List<Tourarrangement> SearchProduct(String city);
	
	// 根据id搜索产品
	public Tourarrangement showTourById(int id);
	
	// 搜索全部产品
	public List<Tourarrangement> SearchAllProduct();
}
