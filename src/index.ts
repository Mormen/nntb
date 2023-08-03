import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import './models/associations'

import accountsRoute from './routes/accounts'
import reportsRoute from './routes/reports'

import errorMiddleware from './middlewares/error'


const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/accounts', accountsRoute)
app.use('/reports', reportsRoute)
app.use(errorMiddleware)

const startApp = async () => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`Listen on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
startApp()