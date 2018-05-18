const WAE = require('web-auto-extractor').default
const fetch = require('node-fetch')

const extract = (event, context, callback) => (
	fetch(decodeURIComponent(event.pathParameters['url']))
		.then(res => res.text())
		.then(res => WAE().parse(res))
		.then(res => {
			callback(null, {
				statusCode: 200,
				body: JSON.stringify(res)
			})
		})
		.catch(e => {
			callback(e)
		})
)

module.exports = {extract}