const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
const todoList = [];
rl.on("close", function() {
	console.log("\nGood bye!");
	process.exit(0);
});
const prompt = function(message = '') {
	rl.question(`${message}${getMenu()}`, command => {
		const indexMath = /^c(\d+)$/g.exec(command);
		if (indexMath) {
			const index = parseInt(indexMath[1]);
			if (todoList[index]) {
				todoList[index].done = true;
				console.log(`Completed "${todoList[index].name}"\n`);
			}
			prompt();
		} else {
			switch (command.toLowerCase()) {
				case 'q':
					rl.close();
					break;
				case 'v':
					prompt(todoList.map((listItem, index) => `${index} [${listItem.done ? '✓' : ' '}] ${listItem.name}`).join('\n') + '\n');
					break;
				case 'n':
					rl.question(`
What?

>					`, todoName => {
						todoList.push({
							done: false,
							name: todoName
						});
						prompt();
					});
					break;
				default:
					prompt();
			}
		}
	});
};
const getMenu = function() {
	return `
(v) View • ( n ) New • (cX) Complete • (dX) Delete • (q) Quit

>	`;
};
const init = function() {
	console.log(`
Welcome to Todo CLI!

--------------------
	`);
	prompt();
};
init();
