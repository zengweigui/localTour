package Biz;

import java.util.List;

import entitiy.Guide;
import entitiy.Users;

public interface UserBiz {
	// 注册
	public String registered(Users user);
	
	// 登录
	public int login(Users user);
	
	// 获取游客信息
	public List<Users> getUserInfoList(String uphone);
	
	// 导游获取游客信息
	public Users getUserInfo(String uphone);
	
	// 修改资料
	public String UserModify(Users u);
	
	// 验证是否注册过
	public List<Users> jsRegistered(String phone);

	// 添加到购物车
	public String addShoppingCart(Users u);
}
