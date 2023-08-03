import AccountModel from "./accounts"
import ReportModel from "./reports"


AccountModel.hasMany(ReportModel, { foreignKey: "lastEditBy", as: "editedReports" })
ReportModel.belongsTo(AccountModel, { foreignKey: "lastEditBy", as: "editedBy" })