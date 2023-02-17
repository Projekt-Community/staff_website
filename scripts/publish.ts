const path = require('path')
const { execSync } = require("child_process");
const yargs = require('yargs')

var argv

try {
	argv = yargs(process.argv.slice(2))
		.options({
			b: { alias: "branch", type: "string", demandOption: true },
			m: { alias: "message", type: "string", demandOption: true, coerce: parseMessage }
		})
		.help().argv
} catch (error) {
	console.log(error, "i.e. npm run publish -- -b [Branch] -m [Message]")
	process.exit(1)
}

const { branch, message } = argv;

process.chdir("pjkt_staff_website")
execute(`npm run publish -- -b ${branch} -m "${message}"`)

function execute(execution) {
	execSync(execution, { stdio: [0, 1, 2] })
}

function parseMessage(message) {
	// Remove quotes from the message string
	return message.replace(/^"(.*)"$/, '$1');
}