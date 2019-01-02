const development = {
  	ekantin: `http://developmentapi.kotakmakan.id/`,
  	wallet: `https://55l4uxpxj9.execute-api.ap-southeast-1.amazonaws.com/development/developmentWallet`
  }
const staging = {
  	ekantin: `http://stagingapi.kotakmakan.id/`,
  	wallet: `https://9d9qxj0926.execute-api.ap-southeast-1.amazonaws.com/staging/stagingWallet`
  }
const production = {
  	ekantin: `http://productionapi.kotakmakan.id/`,
  	wallet: `https://tip6rwuhc0.execute-api.ap-southeast-1.amazonaws.com/production/productionWallet`
	}
const donkeyCamp = {
	ekantin: 'http://52.221.241.60/',
	wallet: 'https://cxiqztehib.execute-api.ap-southeast-1.amazonaws.com/default/donkeyCampWallet',
}

const apiKeyStag = 'vrU48MqHgf2nD3qIC2ASl8AOvkrCBDeO1tx5cYrM'
const apiKeyDev = 'fqUTw6CY3k9Gzq8nmnoxN3QzZG4Ncrm57lZUUO3E'
const apiKeyDonkey =  'rnMbQmepF13DZefJSEp4Za6xJ8I6sUGH4tt9uUcA'

let connection = {
	server: development,
	apiKey: apiKeyDev
}
export { connection }

