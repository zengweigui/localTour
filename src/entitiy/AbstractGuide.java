package entitiy;

import java.util.HashSet;
import java.util.Set;

/**
 * AbstractGuide entity provides the base persistence definition of the Guide
 * entity. @author MyEclipse Persistence Tools
 */

public abstract class AbstractGuide implements java.io.Serializable {

	// Fields

	private Integer id;
	private String phone;
	private String password;
	private String username;
	private String state;
	private String age;
	private String province;
	private String city;
	private String bimage;
	private String head;
	private Integer wallet;
	private String storename;
	private Set tourarrangements = new HashSet(0);

	// Constructors

	/** default constructor */
	public AbstractGuide() {
	}

	/** minimal constructor */
	public AbstractGuide(String phone, String password, String state,
			String age, String province, String city, String head) {
		this.phone = phone;
		this.password = password;
		this.state = state;
		this.age = age;
		this.province = province;
		this.city = city;
		this.head = head;
	}

	/** full constructor */
	public AbstractGuide(String phone, String password, String username,
			String state, String age, String province, String city,
			String bimage, String head, Integer wallet, String storename,
			Set tourarrangements) {
		this.phone = phone;
		this.password = password;
		this.username = username;
		this.state = state;
		this.age = age;
		this.province = province;
		this.city = city;
		this.bimage = bimage;
		this.head = head;
		this.wallet = wallet;
		this.storename = storename;
		this.tourarrangements = tourarrangements;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getState() {
		return this.state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getAge() {
		return this.age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getProvince() {
		return this.province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return this.city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getBimage() {
		return this.bimage;
	}

	public void setBimage(String bimage) {
		this.bimage = bimage;
	}

	public String getHead() {
		return this.head;
	}

	public void setHead(String head) {
		this.head = head;
	}

	public Integer getWallet() {
		return this.wallet;
	}

	public void setWallet(Integer wallet) {
		this.wallet = wallet;
	}

	public String getStorename() {
		return this.storename;
	}

	public void setStorename(String storename) {
		this.storename = storename;
	}

	public Set getTourarrangements() {
		return this.tourarrangements;
	}

	public void setTourarrangements(Set tourarrangements) {
		this.tourarrangements = tourarrangements;
	}

}