require('dotenv').config('')

const config = {
	server: {
		port: process.env.SERVER_PORT
	},
	database: {
		protocol: process.env.DATABASE_PROTOCOL,
		url: process.env.DATABASE_URL,
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD
	},
	pagination: {
		sort: { piso: 'asc', letra: 'asc' },
		page: 1,
		limit: 4
	}
}

module.exports = config