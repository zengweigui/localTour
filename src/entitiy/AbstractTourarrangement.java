package entitiy;

/**
 * AbstractTourarrangement entity provides the base persistence definition of
 * the Tourarrangement entity. @author MyEclipse Persistence Tools
 */

public abstract class AbstractTourarrangement implements java.io.Serializable {

	// Fields

	private Integer id;
	private String guidephone;
	private Integer price;
	private String title;
	private String state;
	private String bimages;
	private String province;
	private String city;
	private String remarks;
	private Integer deleteState;
	private Integer buynum;
	private String maximumNumber;
	private String costIncludes;
	private String drafts;
	private String allTripJson;

	// Constructors

	/** default constructor */
	public AbstractTourarrangement() {
	}

	/** minimal constructor */
	public AbstractTourarrangement(String guidephone, Integer price,
			String title, String bimages, String province, String city,
			Integer buynum, String maximumNumber, String costIncludes,
			String drafts, String allTripJson) {
		this.guidephone = guidephone;
		this.price = price;
		this.title = title;
		this.bimages = bimages;
		this.province = province;
		this.city = city;
		this.buynum = buynum;
		this.maximumNumber = maximumNumber;
		this.costIncludes = costIncludes;
		this.drafts = drafts;
		this.allTripJson = allTripJson;
	}

	/** full constructor */
	public AbstractTourarrangement(String guidephone, Integer price,
			String title, String state, String bimages, String province,
			String city, String remarks, Integer deleteState, Integer buynum,
			String maximumNumber, String costIncludes, String drafts,
			String allTripJson) {
		this.guidephone = guidephone;
		this.price = price;
		this.title = title;
		this.state = state;
		this.bimages = bimages;
		this.province = province;
		this.city = city;
		this.remarks = remarks;
		this.deleteState = deleteState;
		this.buynum = buynum;
		this.maximumNumber = maximumNumber;
		this.costIncludes = costIncludes;
		this.drafts = drafts;
		this.allTripJson = allTripJson;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getGuidephone() {
		return this.guidephone;
	}

	public void setGuidephone(String guidephone) {
		this.guidephone = guidephone;
	}

	public Integer getPrice() {
		return this.price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getState() {
		return this.state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getBimages() {
		return this.bimages;
	}

	public void setBimages(String bimages) {
		this.bimages = bimages;
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

	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Integer getDeleteState() {
		return this.deleteState;
	}

	public void setDeleteState(Integer deleteState) {
		this.deleteState = deleteState;
	}

	public Integer getBuynum() {
		return this.buynum;
	}

	public void setBuynum(Integer buynum) {
		this.buynum = buynum;
	}

	public String getMaximumNumber() {
		return this.maximumNumber;
	}

	public void setMaximumNumber(String maximumNumber) {
		this.maximumNumber = maximumNumber;
	}

	public String getCostIncludes() {
		return this.costIncludes;
	}

	public void setCostIncludes(String costIncludes) {
		this.costIncludes = costIncludes;
	}

	public String getDrafts() {
		return this.drafts;
	}

	public void setDrafts(String drafts) {
		this.drafts = drafts;
	}

	public String getAllTripJson() {
		return this.allTripJson;
	}

	public void setAllTripJson(String allTripJson) {
		this.allTripJson = allTripJson;
	}

}