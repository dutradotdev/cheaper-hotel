const onlyFirstLetters = /^[A-Za-z]+/
const onlyWordsInsideParenthesis = /\([a-zA-Z]+\)/g;
const allParenthesis = /\(|\)/g;
const getDates = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g;

module.exports = {
	onlyFirstLetters,
	onlyWordsInsideParenthesis,
	allParenthesis,
	getDates
};
