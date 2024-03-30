const UserModel = require("../models/user.model");
const WorkModel = require("../models/work.model");
const generateKey = require("../utils/authKey");
const PassportModel = require("../models/passport.model");
const db = require("../db/db");

class RouterController {
    async register(req, res) {
        try {
            const {
                login,
                fullName,
                birthDate,
                phone,
                password,
                series,
                number,
                issueDate,
                companyName,
                companyPhone,
                companyAddress,
            } = req.body;

            const authKey = generateKey(20);
            const user = new UserModel(
                login,
                fullName,
                birthDate,
                phone,
                password,
                authKey
            );
            const passport = new PassportModel(series, number, issueDate);
            const work = new WorkModel(
                companyName,
                companyPhone,
                companyAddress
            );

            let userInsert =
                "INSERT INTO users(login, fullName, birthDate, phone, authKey, password) VALUES(?, ?, ?, ?, ?, ?)";
            let passportInsert =
                "INSERT INTO passports(series, number, issueDate) VALUES(?, ?, ?)";
            let workInsert =
                "INSERT INTO works(companyName, companyPhone, companyAddress) VALUES(?, ?, ?)";

            db.run(
                userInsert,
                [
                    user.login,
                    user.fullName,
                    user.birthDate,
                    user.phone,
                    user.authKey,
                    user.password,
                ],
                (err) => {
                    if (err) return console.log(err);
                    console.log(`User inserted`);
                }
            );

            db.run(
                passportInsert,
                [passport.series, passport.number, passport.issueDate],
                (err) => {
                    if (err) return console.log(err);
                    console.log(`passport inserted`);
                }
            );

            db.run(
                workInsert,
                [work.companyName, work.companyPhone, work.address],
                (err) => {
                    if (err) return console.log(err);
                    console.log(`work inserted`);
                }
            );

            res.status(200).send({ message: "User created" });
        } catch (e) {
            console.log(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async login(req, res) {
        try {
            const { login, password } = req.body;
            db.get(
                "SELECT * FROM users WHERE login = ? AND password = ?",
                [login, password],
                (err, row) => {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    if (!row) {
                        return res.status(403).send("User not found");
                    }
                    res.status(200).send({
                        message: "User logged in successfully",
                        authKey: row.authKey,
                    });
                }
            );
        } catch (error) {
            res.status(500).json({ message: "Error logging in user", error });
        }
    }

    async test(req, res) {
        try {
            res.json("test work");
        } catch (e) {}
    }
}

module.exports = new RouterController();
