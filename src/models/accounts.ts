import { DataTypes } from 'sequelize'

import sequelizeConn from '../services/sequelize'

import { Model, CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize'
import { ReportI } from './reports'


export interface AccountI extends Model<InferAttributes<AccountI>, InferCreationAttributes<AccountI>> {
    id: CreationOptional<number>
    email: string
    username: string
    password: string
    editedReports: NonAttribute<ReportI[]>
    createdAt?: Date
    updatedAt?: Date
}

const AccountModel = sequelizeConn.define<AccountI>("account", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
})

export default AccountModel