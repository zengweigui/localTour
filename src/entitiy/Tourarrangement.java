package entitiy;

/**
 * Tourarrangement entity. @author MyEclipse Persistence Tools
 */
public class Tourarrangement extends AbstractTourarrangement implements
		java.io.Serializable {

	// Constructors

	/** default constructor */
	public Tourarrangement() {
	}

	/** minimal constructor */
	public Tourarrangement(String guidephone, Integer price, String title,
			String bimages, String province, String city, Integer buynum,
			String maximumNumber, String costIncludes, String drafts,
			String allTripJson) {
		super(guidephone, price, title, bimages, province, city, buynum,
				maximumNumber, costIncludes, drafts, allTripJson);
	}

	/** full constructor */
	public Tourarrangement(String guidephone, Integer price, String title,
			String state, String bimages, String province, String city,
			String remarks, Integer deleteState, Integer buynum,
			String maximumNumber, String costIncludes, String drafts,
			String allTripJson) {
		super(guidephone, price, title, state, bimages, province, city,
				remarks, deleteState, buynum, maximumNumber, costIncludes,
				drafts, allTripJson);
	}

}
