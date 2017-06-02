package entitiy;

/**
 * AbstractUsers entity provides the base persistence definition of the Users
 * entity. @author MyEclipse Persistence Tools
 */

public abstract class AbstractUsers implements java.io.Serializable {

	// Fields

	private Integer id;
	private String phone;
	private String password;
	private String username;
	private String sex;
	private Integer age;
	private String city;
	private String head;
	private String shoppingCartArr;

	// Constructors

	/** default constructor */
	public AbstractUsers() {
	}

	/** minimal constructor */
	public AbstractUsers(String phone, String password, String username,
			String sex, Integer age, String city, String head) {
		this.phone = phone;
		this.password = password;
		this.username = username;
		this.sex = sex;
		this.age = age;
		this.city = city;
		this.head = head;
	}

	/** full constructor */
	public AbstractUsers(String phone, String password, String username,
			String sex, Integer age, String city, String head,
			String shoppingCartArr) {
		this.phone = phone;
		this.password = password;
		this.username = username;
		this.sex = sex;
		this.age = age;
		this.city = city;
		this.head = head;
		this.shoppingCartArr = shoppingCartArr;
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

	public String getSex() {
		return this.sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public Integer getAge() {
		return this.age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getCity() {
		return this.city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getHead() {
		return this.head;
	}

	public void setHead(String head) {
		this.head = head;
	}

	public String getShoppingCartArr() {
		return this.shoppingCartArr;
	}

	public void setShoppingCartArr(String shoppingCartArr) {
		this.shoppingCartArr = shoppingCartArr;
	}

}