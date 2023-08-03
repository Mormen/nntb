const jwt = require('jsonwebtoken')

import { Request, Response, NextFunction } from 'express'


const authorization = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationhHeader = req.headers.authorization
        if (!authorizationhHeader) {
            return res.status(403).json({
                message: "Missing token"
            })
        }

        const token = (<string>authorizationhHeader).split(" ")[1]
        if (!token) {
            return res.status(403).json({
                message: "Missing token"
            })
        }

        try {
            const tokenData = await new Promise((resolve, reject) => {
                jwt.verify(token, process.env.TOKEN_SECRET, (error: any, data: any) => {
                    if (error) reject(error)
                    resolve(data)
                })
            })
            res.locals.token_data = tokenData

            next()
        } catch (error) {
            return res.status(403).json({
                message: "Access denied"
            })
        }
    } catch (error) {
        next(error)
    }
}

export default authorization