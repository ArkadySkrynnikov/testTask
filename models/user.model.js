function UserModel(login, fullName, birthDate, phone, password, authKey) {
    this.fullName = fullName;
    this.birthDate = birthDate;
    this.phone = phone;
    this.login = login;
    this.password = password;
    this.authKey = authKey;
}

module.exports = UserModel;
