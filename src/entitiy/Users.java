package entitiy;

/**
 * Users entity. @author MyEclipse Persistence Tools
 */
public class Users extends AbstractUsers implements java.io.Serializable {

	// Constructors

	/** default constructor */
	public Users() {
	}

	/** minimal constructor */
	public Users(String phone, String password, String username, String sex,
			Integer age, String city, String head) {
		super(phone, password, username, sex, age, city, head);
	}

	/** full constructor */
	public Users(String phone, String password, String username, String sex,
			Integer age, String city, String head, String shoppingCartArr) {
		super(phone, password, username, sex, age, city, head, shoppingCartArr);
	}

}
