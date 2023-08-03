import express from 'express'

import formErrorMiddleware from '../middlewares/formError'

import { login, loginValidate } from '../controllers/accounts'

import { Router } from 'express'


const route: Router = express.Router()

route.post("/", loginValidate, formErrorMiddleware, login)

export default route
