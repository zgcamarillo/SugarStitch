const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const path = require('path')

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/patterns', require('./routes/patternRoutes'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/journal', require('./routes/journalRoutes'))

app.get('/', (req, res) => {
    res.send('Sugar Stitch API is running')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})