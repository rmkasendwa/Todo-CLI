const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
rl.on("close", function() {
	console.log("\nBYE BYE !!!");
	process.exit(0);
});
const prompt = function() {
	rl.question(getMenu(), function(command) {
		switch (command.toLowerCase()) {
			case 'q':
				rl.close();
				break;
			default:
				prompt();
		}
	});
};
const getMenu = function() {
	return `
Welcome to Todo CLI!

--------------------

(v) View • ( n ) New • (cX) Complete • (dX) Delete • (q) Quit

>	`;
};
const init = function() {
	prompt();
};
init();