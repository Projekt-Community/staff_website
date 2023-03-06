const path = require('path')
const cp = require('child_process')
const { exec, execSync } = cp;
const yargs = require('yargs')

const argv = yargs(process.argv.slice(2))
	.options({
		b: { alias: "live", type: "boolean" },
		m: { alias: "message", type: "string", demandOption: true, coerce: parseMessage }
	})
	.help()
	.argv

console.log("argv: ", argv)
const { l, message } = argv;

const validBranches = ["Live", "main"]
const isLive = l || false

if (isLive) { // Build the dist folder and copy the 404 code
	execute("npm run build")
	execute(`@powershell copy dist/index.html dist/404.html`)
}

if (isLive) {
	try {
		execute(`git add dist`)
	} catch (error) {
		console.log(error)
	}
} else {
	try {
		execute(`git add .`)
	} catch (error) {
		console.log(error)
	}
}

execute(`git commit -m "${message}"`)

if (isLive) {
	execute(`git subtree split --prefix dist -b Live`)
	execute(`git push -f origin Live:Live`)
	execute(`git branch -D Live`)
}

execute(`git push`)


function execute(execution) {
	execSync(execution, { stdio: [0, 1, 2] })
}
function parseMessage(message) {
	// Remove quotes from the message string
	return message.replace(/^"(.*)"$/, '$1');
}