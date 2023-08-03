import { DataTypes } from 'sequelize'

import sequelizeConn from '../services/sequelize'

import { Model, CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize'
import { AccountI } from './accounts'


export interface ReportI extends Model<InferAttributes<ReportI>, InferCreationAttributes<ReportI>> {
    id: CreationOptional<number>
    lastEditBy?: number
    name: string
    age: number
    info: string,
    editedBy: NonAttribute<AccountI>
    createdAt?: Date
    updatedAt?: Date
}

const ReportModel = sequelizeConn.define<ReportI>("report", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lastEditBy: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    info: {
        type: DataTypes.STRING(2083),
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE 
})

export default ReportModel