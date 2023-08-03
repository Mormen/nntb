import { validationResult } from 'express-validator'

import { Request, Response, NextFunction } from 'express'


const formError = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: "Invalid form",
            errors
        })
    } else {
        next()
    }
}

export default formError