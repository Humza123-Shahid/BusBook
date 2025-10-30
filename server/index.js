const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

app.use(cors())
//Available Routes
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(express.json())
app.use('/api/auth',require('./Routes/common/auth'))
app.use('/api/buses',require('./Routes/admin/buses'))
app.use('/api/destination',require('./Routes/admin/destination'))
app.use('/api/driver',require('./Routes/admin/driver'))
app.use('/api/routes',require('./Routes/admin/routes'))
app.use('/api/services',require('./Routes/admin/services'))
app.use('/api/faqs',require('./Routes/admin/faqs'))
app.use('/api/bookings',require('./Routes/user/bookings'))
app.use('/api/seats',require('./Routes/user/seats'))
app.use('/api/expences',require('./Routes/admin/expences'))
app.use('/api/expencecategory',require('./Routes/admin/expencecategory'))
app.use('/api/contacts',require('./Routes/user/contacts'))

app.listen(port, () => {
  console.log(`busbook backend listening at http://localhost:${port}`)
})