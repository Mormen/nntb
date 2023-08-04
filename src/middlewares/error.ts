import EntityNotExistError from '../errors/EntityNotExist'

import { Request, Response, NextFunction } from 'express'


const error = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error)

    if (error instanceof EntityNotExistError) {
        return res.status(404).json({
            message: error.message
        })
    }

    return res.status(500).send()
}

export default error