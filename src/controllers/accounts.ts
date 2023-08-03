import { body } from 'express-validator'

import jsonwebtoken from "jsonwebtoken"

import AccountModel from '../models/accounts'

import { Request, Response, NextFunction } from 'express'


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body

        const account = await AccountModel.findOne({
            where: {
                username,
                password // in the case of extension, the password in the db should be stored as hash
            }
        })

        if (!account) {
            return res.status(403).json({
                message: "Access denied"
            })
        }

        return res.json({
            token: jsonwebtoken.sign({ accountId: account.id }, process.env.TOKEN_SECRET)
        })
    } catch (error) {
        return next(error)
    }
}

export const loginValidate = [
    body("username")
        .notEmpty()
        .withMessage("Required"),
    body("password")
        .notEmpty()
        .withMessage("Required")
]