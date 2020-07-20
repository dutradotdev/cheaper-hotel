class Hotel {
	constructor(obj) {
		this.id = obj.id;
		this.name = obj.name;
		this.classification = obj.classification;
	}

	get id() {
		return this._id;
	}

	set id(id) {
		this._id = id;
	}

	get name() {
		return this._name;
	}

	set name(name) {
		this._name = name;
	}

	get classification() {
		return this._classification;
	}

	set classification(classification) {
		this._classification = classification;
	}
}

module.exports = Hotel;
