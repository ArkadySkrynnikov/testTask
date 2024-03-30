const express = require("express");
const router = require("./routes/routes");
const db = require("./db/db");
const app = express();

app.use(express.json());
app.use("/user", router);

const PORT = 3000;

const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

process.on("SIGINT", function () {
    db.close((err) => {
        if (err) {
            console.error(
                "Ошибка при закрытии подключения к базе данных:",
                err
            );
            return;
        }
        console.log("Подключение к базе данных закрыто успешно.");
    });
});

start();
