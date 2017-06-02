package Biz;

import java.util.List;

import entitiy.Guide;
import entitiy.Tourarrangement;
import entitiy.Users;

public interface GuideBiz {

	public String registered(Guide guide);
	
	public int login(Guide guide);

	// 获取店铺信息
	public Guide getShopInfo(String gphone);
	
	// 设置营业状态
	public String setGuideState(Guide g);
	
	// 获取我的产品
	public List<Tourarrangement> ShowAllProduct(String gphone);
	
	// 获取草稿箱产品
	public List<Tourarrangement> ShowDraftsProduct(String gphone);
	
	// 上传店铺背景图
	public String UploadStoreBg(Guide g);
	
	// 获取导游信息
	public Guide getGuideInfo(String gphone);
	
	// 修改资料
	public String GuideModify(Guide g);
	
	// 验证是否注册过
	public List<Users> jsRegistered(String phone);
}
