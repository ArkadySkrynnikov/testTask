const UserModel = require('./user.model')

function WorkModel(companyName, companyPhone, address) {
    this.companyName = companyName;
    this.companyPhone = companyPhone;
    this.address = address;
}

WorkModel.prototype = UserModel

module.exports = WorkModel;