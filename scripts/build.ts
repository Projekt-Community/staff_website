const {execSync} = require('child_process')

process.chdir("pjkt_staff_website")
execute("npm run build")

function execute(execution) {
	execSync(execution, { stdio: [0, 1, 2] })
}