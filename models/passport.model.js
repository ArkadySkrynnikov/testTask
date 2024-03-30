const UserModel = require("./user.model");
function PassportModel(series, number, issueDate) {
    this.series = series;
    this.number = number;
    this.issueDate = issueDate;
}

PassportModel.prototype = UserModel;

module.exports = PassportModel;
