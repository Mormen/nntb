import express from 'express'

import authorizationMiddleware from '../middlewares/authorization'
import formErrorMiddleware from '../middlewares/formError'

import {
    create,
    update,
    _delete,
    createUpdateValidate,
} from '../controllers/reports'

import { Router } from 'express'


const route: Router = express.Router()

route.post("/", createUpdateValidate, formErrorMiddleware, create)
route.put("/:id", authorizationMiddleware, createUpdateValidate, formErrorMiddleware, update)
route.delete("/:id", authorizationMiddleware, _delete)

export default route
