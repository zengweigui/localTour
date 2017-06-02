package BizImpl;

import java.util.List;

import entitiy.Users;
import Biz.UserBiz;
import Dao.UserDao;
import DaoImpl.UserDaoImpl;

public class UserBizImpl implements UserBiz {
	
	UserDao ud = new UserDaoImpl();
	
	// 登录
	public int login(Users user) {
		return ud.login(user);
	}

	// 注册
	public String registered(Users user) {
		return ud.registered(user);
	}

	// 获取游客信息
	public List<Users> getUserInfoList(String uphone) {
		return ud.getUserInfoList(uphone);
	}

	// 导游获取游客信息
	public Users getUserInfo(String uphone) {
		return ud.getUserInfo(uphone);
	}

	// 修改资料
	public String UserModify(Users u) {
		return ud.UserModify(u);
	}

	// 验证是否注册过
	public List<Users> jsRegistered(String phone) {
		return ud.jsRegistered(phone);
	}

	// 添加到购物车
	public String addShoppingCart(Users u) {
		return ud.addShoppingCart(u);
	}
}
