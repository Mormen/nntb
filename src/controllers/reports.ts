import { body } from 'express-validator'

import ReportModel from '../models/reports'

import EntityNotExistError from '../errors/EntityNotExist'

import { Request, Response, NextFunction } from 'express'


export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, age, info } = req.body

        const report = await ReportModel.create({
            name,
            age,
            info
        })

        return res.json({
            message: "The report was successfully created",
            report
        })
    } catch (error) {
        return next(error)
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reportId = parseInt(req.params.id)
        const accountId = res.locals.token_data.accountId
        const { name, age, info } = req.body

        const report = await ReportModel.findOne({
            where: {
                id: reportId
            }
        })
        if (!report) return next(new EntityNotExistError("Report doesn't exists"))

        await ReportModel.update({
            lastEditBy: accountId,
            name,
            age,
            info
        }, {
            where: {
                id: reportId
            }
        })

        const _report = await ReportModel.findOne({
            where: {
                id: reportId
            }
        })

        return res.json({
            message: "The report was successfully edited",
            report: _report
        })
    } catch (error) {
        return next(error)
    }
}

export const _delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reportId = parseInt(req.params.id)

        const report = await ReportModel.findOne({
            where: {
                id: reportId
            }
        })
        if (!report) return next(new EntityNotExistError("Report doesn't exists"))

        await ReportModel.destroy({
            where: {
                id: reportId
            }
        })

        return res.json({
            message: "The report was successfully deleted"
        })
    } catch (error) {
        return next(error)
    }
}

export const createUpdateValidate = [
    body("name")
        .notEmpty()
        .withMessage("Required")
        .bail()
        .isLength({ max: 60 })
        .withMessage("Max length is 60 chars"),
    body("age")
        .notEmpty()
        .withMessage("Required")
        .bail()
        .isInt()
        .withMessage("Wrong format"),
    body("info")
        .notEmpty()
        .withMessage("Required")
        .bail()
        .isLength({ max: 2083 })
        .withMessage("Max length is 2083 chars")
]