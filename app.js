const express = require('express')
const router = require('./routes/routes')

const app = express()

app.use(express.json())
app.use('/user', router)

const PORT = 3000

const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
