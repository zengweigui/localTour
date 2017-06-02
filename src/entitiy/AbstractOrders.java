package entitiy;

/**
 * AbstractOrders entity provides the base persistence definition of the Orders
 * entity. @author MyEclipse Persistence Tools
 */

public abstract class AbstractOrders implements java.io.Serializable {

	// Fields

	private Integer id;
	private String uphone;
	private String gphone;
	private Integer tid;
	private String title;
	private Integer money;
	private String tourTime;
	private Integer num;
	private Integer refund;
	private Integer ship;
	private String contactsName;
	private String contactsPhone;
	private Integer confirm;

	// Constructors

	/** default constructor */
	public AbstractOrders() {
	}

	/** minimal constructor */
	public AbstractOrders(String uphone, String gphone, Integer tid,
			String title, Integer money, Integer refund, Integer ship,
			String contactsName, String contactsPhone, Integer confirm) {
		this.uphone = uphone;
		this.gphone = gphone;
		this.tid = tid;
		this.title = title;
		this.money = money;
		this.refund = refund;
		this.ship = ship;
		this.contactsName = contactsName;
		this.contactsPhone = contactsPhone;
		this.confirm = confirm;
	}

	/** full constructor */
	public AbstractOrders(String uphone, String gphone, Integer tid,
			String title, Integer money, String tourTime, Integer num,
			Integer refund, Integer ship, String contactsName,
			String contactsPhone, Integer confirm) {
		this.uphone = uphone;
		this.gphone = gphone;
		this.tid = tid;
		this.title = title;
		this.money = money;
		this.tourTime = tourTime;
		this.num = num;
		this.refund = refund;
		this.ship = ship;
		this.contactsName = contactsName;
		this.contactsPhone = contactsPhone;
		this.confirm = confirm;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUphone() {
		return this.uphone;
	}

	public void setUphone(String uphone) {
		this.uphone = uphone;
	}

	public String getGphone() {
		return this.gphone;
	}

	public void setGphone(String gphone) {
		this.gphone = gphone;
	}

	public Integer getTid() {
		return this.tid;
	}

	public void setTid(Integer tid) {
		this.tid = tid;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getMoney() {
		return this.money;
	}

	public void setMoney(Integer money) {
		this.money = money;
	}

	public String getTourTime() {
		return this.tourTime;
	}

	public void setTourTime(String tourTime) {
		this.tourTime = tourTime;
	}

	public Integer getNum() {
		return this.num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	public Integer getRefund() {
		return this.refund;
	}

	public void setRefund(Integer refund) {
		this.refund = refund;
	}

	public Integer getShip() {
		return this.ship;
	}

	public void setShip(Integer ship) {
		this.ship = ship;
	}

	public String getContactsName() {
		return this.contactsName;
	}

	public void setContactsName(String contactsName) {
		this.contactsName = contactsName;
	}

	public String getContactsPhone() {
		return this.contactsPhone;
	}

	public void setContactsPhone(String contactsPhone) {
		this.contactsPhone = contactsPhone;
	}

	public Integer getConfirm() {
		return this.confirm;
	}

	public void setConfirm(Integer confirm) {
		this.confirm = confirm;
	}

}