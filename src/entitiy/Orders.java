package entitiy;

/**
 * Orders entity. @author MyEclipse Persistence Tools
 */
public class Orders extends AbstractOrders implements java.io.Serializable {

	// Constructors

	/** default constructor */
	public Orders() {
	}

	/** minimal constructor */
	public Orders(String uphone, String gphone, Integer tid, String title,
			Integer money, Integer refund, Integer ship, String contactsName,
			String contactsPhone, Integer confirm) {
		super(uphone, gphone, tid, title, money, refund, ship, contactsName,
				contactsPhone, confirm);
	}

	/** full constructor */
	public Orders(String uphone, String gphone, Integer tid, String title,
			Integer money, String tourTime, Integer num, Integer refund,
			Integer ship, String contactsName, String contactsPhone,
			Integer confirm) {
		super(uphone, gphone, tid, title, money, tourTime, num, refund, ship,
				contactsName, contactsPhone, confirm);
	}

}
