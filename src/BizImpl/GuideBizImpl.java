package BizImpl;

import java.util.List;

import entitiy.Guide;
import entitiy.Tourarrangement;
import entitiy.Users;
import Biz.GuideBiz;
import Dao.GuideDao;
import DaoImpl.GuideDaoImpl;

public class GuideBizImpl implements GuideBiz {
	
	GuideDao gd = new GuideDaoImpl();
	
	// 注册
	public String registered(Guide guide) {
		return gd.registered(guide);
	}
	
	// 登录
	public int login(Guide guide) {
		return gd.login(guide);
	}
	
	// 获取店铺信息
	public Guide getShopInfo(String gphone) {
		return gd.getShopInfo(gphone);
	}
	
	// 设置营业状态
	public String setGuideState(Guide g) {
		// TODO Auto-generated method stub
		return gd.setGuideState(g);
	}
	
	// 获取我的产品
	public List<Tourarrangement> ShowAllProduct(String gphone) {
		// TODO Auto-generated method stub
		return gd.ShowAllProduct(gphone);
	}
	
	// 获取草稿箱产品
	public List<Tourarrangement> ShowDraftsProduct(String gphone) {
		// TODO Auto-generated method stub
		return gd.ShowDraftsProduct(gphone);
	}
	
	// 上传店铺背景图
	public String UploadStoreBg(Guide g) {
		// TODO Auto-generated method stub
		return gd.UploadStoreBg(g);
	}
	
	// 获取导游信息
	public Guide getGuideInfo(String gphone) {
		return gd.getGuideInfo(gphone);
	}
	
	// 修改资料
	public String GuideModify(Guide g) {
		// TODO Auto-generated method stub
		return gd.GuideModify(g);
	}
	
	// 验证是否注册过
	public List<Users> jsRegistered(String phone) {
		return gd.jsRegistered(phone);
	}
}
