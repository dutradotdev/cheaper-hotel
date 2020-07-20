class Plan {
	constructor(obj) {
		this.id = obj.id;
		this.hotel = obj.hotel;
		this.client = obj.client;
		this.period = obj.period;
		this.price = obj.price;
	}

	get id() {
		return this._id;
	}

	set id(id) {
		this._id = id;
	}

	get hotel() {
		return this._hotel;
	}

	set hotel(hotel) {
		this._hotel = hotel;
	}

	get client() {
		return this._client;
	}

	set client(client) {
		this._client = client;
	}

	get period() {
		return this._period;
	}

	set period(period) {
		this._period = period;
	}

	get price() {
		return this._price;
	}

	set price(price) {
		this._price = price;
	}
}

module.exports = Plan;
