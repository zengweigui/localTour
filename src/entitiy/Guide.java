package entitiy;

import java.util.Set;

/**
 * Guide entity. @author MyEclipse Persistence Tools
 */
public class Guide extends AbstractGuide implements java.io.Serializable {

	// Constructors

	/** default constructor */
	public Guide() {
	}

	/** minimal constructor */
	public Guide(String phone, String password, String state, String age,
			String province, String city, String head) {
		super(phone, password, state, age, province, city, head);
	}

	/** full constructor */
	public Guide(String phone, String password, String username, String state,
			String age, String province, String city, String bimage,
			String head, Integer wallet, String storename, Set tourarrangements) {
		super(phone, password, username, state, age, province, city, bimage,
				head, wallet, storename, tourarrangements);
	}

}
