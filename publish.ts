const path = require('path')
const { execSync } = require("child_process");
const yargs = require('yargs')

console.log("process.argv: ", process.argv)
const argv = yargs(process.argv.slice(2))
	.options({
		b: { alias: "branch", type: "string", demandOption: true },
		m: { alias: "message", type: "string", demandOption: true, coerce: parseMessage }
	})
	.help().argv

console.log("argv: ", argv)
const { branch, message } = argv;

const validBranches = ["Live", "main"]
const isLive = branch == "Live"
const isMain = branch == "main"

if (!validBranches.includes(branch)) {
	console.error("Invalid branch provided. Branch must be either 'main' or 'Live'")
	process.exit(1)
}

if (isLive) { // Build the dist folder and copy the 404 code
	execute("npm run build")
	execute(`@powershell copy dist/index.html dist/404.html`)
}

if (isLive) {
	execute(`git add dist`)
} else {
	execute(`git add .`)
}

execute(`git commit -m "${message}"`)

if (isLive) execute(`git subtree push --prefix dist origin ${branch}`)

execute(`git push`)


function execute(execution) {
	execSync(execution, { stdio: [0, 1, 2] })
}
function parseMessage(message) {
	// Remove quotes from the message string
	return message.replace(/^"(.*)"$/, '$1');
}