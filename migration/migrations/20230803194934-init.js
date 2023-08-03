'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.transaction(t => {
			return Promise.all([
				queryInterface.createTable("accounts", {
					id: {
						type: Sequelize.INTEGER,
						autoIncrement: true,
						primaryKey: true
					},
					email: {
						type: Sequelize.STRING(255),
						allowNull: false
					},
					username: {
						type: Sequelize.STRING(255),
						allowNull: false
					},
					password: {
						type: Sequelize.STRING(255),
						allowNull: false
					},
					createdAt: Sequelize.DATE,
					updatedAt: Sequelize.DATE
				}, { transaction: t }),
				queryInterface.createTable("reports", {
					id: {
						type: Sequelize.INTEGER,
						autoIncrement: true,
						primaryKey: true
					},
					lastEditBy: {
						type: Sequelize.INTEGER,
						references: { model: "accounts", key: "id" }
					},
					name: {
						type: Sequelize.STRING(60),
						allowNull: false
					},
					age: {
						type: Sequelize.INTEGER,
						allowNull: false
					},
					info: {
						type: Sequelize.STRING(2083),
						allowNull: false
					},
					createdAt: Sequelize.DATE,
					updatedAt: Sequelize.DATE
				}, { transaction: t })
			])
		})
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.transaction(t => {
			return Promise.all([
				queryInterface.dropTable("reports"),
				queryInterface.dropTable("accounts")
			])
		})
	}
}