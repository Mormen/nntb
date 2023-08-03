import BadRequestError from '../errors/BadRequest'
import EntityNotExistError from '../errors/EntityNotExist'
import InvalidFormError from '../errors/InvalidForm'

import { Request, Response, NextFunction } from 'express'


const error = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error)
    
    if (error instanceof BadRequestError) {
        return res.status(400).json({
            message: error.message
        })
    }

    if (error instanceof EntityNotExistError) {
        return res.status(404).json({
            message: error.message
        })
    }

    if (error instanceof InvalidFormError) {
        return res.status(422).json({
            message: error.message,
            errors: error.errors
        })
    }

    return res.status(500).send()
}

export default error