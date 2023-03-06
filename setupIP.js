const fs = require('fs')
const os = require('os')

console.log("Setting up IP Address...")

var address,
	ifaces = os.networkInterfaces();
for (var dev in ifaces) {
	ifaces[dev].filter((details) => details.family === 'IPv4' && details.internal === false ? address = details.address : undefined);
}

function setENVValue(key, value) {
	//read file from hdd & split if from a linebreak to an array
	const ENV_VARS = fs.readFileSync("./.env", "utf8").split(os.EOL)
	const ENV_DEV_VARS = fs.readFileSync("./.env.development", "utf8").split(os.EOL)


	// find the env we want based on the key
	const target = ENV_VARS.indexOf(ENV_VARS.find((line) => { return line.match(new RegExp(key)) }))
	const Devtarget = ENV_VARS.indexOf(ENV_DEV_VARS.find((line) => { return line.match(new RegExp(key)) }))

	// replace the key/value with a new value
	ENV_VARS.splice(target, 1, `${key}=${value}`)
	ENV_DEV_VARS.splice(Devtarget, 1, `${key}=${value}`)


	//write everything back to the file system
	fs.writeFileSync("./.env", ENV_VARS.join(os.EOL))
	fs.writeFileSync("./.env.development", ENV_DEV_VARS.join(os.EOL))
}

setENVValue("VITE_LocalIP", address)

console.log("Local IP address set to", address)