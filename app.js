const express = require('express')
const morgan = require('morgan')
const blogRoutes = require('./routes/blogRoutes')

const mongoose = require('mongoose')



const app = express()


const dbUrl = "mongodb://127.0.0.1:27017/Node"
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3000)
        console.log('connected to db')
    })
    .catch(err => console.log(err))


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))


app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About" })
})

app.use('/blogs', blogRoutes)

app.use((req, res) => {
    res.status(404).render('404', { title: "404" })
})


