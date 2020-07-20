class Period {
	constructor(obj) {
		this.id = obj.id;
		this.description = obj.description;
	}

	get id() {
		return this._id;
	}

	set id(id) {
		this._id = id;
	}

	get description() {
		return this._description;
	}

	set description(description) {
		this._description = description;
	}
}

module.exports = Period;
