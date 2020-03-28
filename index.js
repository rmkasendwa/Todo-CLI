const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
const todoList = [];
rl.on("close", function() {
	console.log("\nSee you soon! 😄");
	process.exit(0);
});
const prompt = function(message = '') {
	rl.question(`${message}${getMenu()}`, command => {
		const completedIndexMath = /^c(\d+)$/g.exec(command);
		const deleteIndexMath = /^d(\d+)$/g.exec(command);
		if (completedIndexMath) {
			const index = parseInt(completedIndexMath[1]);
			if (todoList[index]) {
				todoList[index].done = true;
				console.log(`\nCompleted "${todoList[index].name}"\n`);
			}
			prompt();
		} else if (deleteIndexMath) {
			const index = parseInt(deleteIndexMath[1]);
			if (todoList[index]) {
				const deletedItems = todoList.splice(index, 1);
				console.log(`\nDeleted "${deletedItems[0].name}"\n`);
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
