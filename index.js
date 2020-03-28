const readline = require("readline"); // Import readline module
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
const todoList = [];
rl.on("close", function() {
	console.log("\nSee you soon! 😄");
	process.exit(0);
});
// Prompt for user input
const prompt = function(message = '') {
	rl.question(`${message}${getMenu()}`, command => {
		const completedIndexMath = /^c(\d+)$/g.exec(command); // regex to process completed command eg c0, c1
		const deleteIndexMath = /^d(\d+)$/g.exec(command); // regex to process delete command eg d0, d1
		if (completedIndexMath) {
			const index = parseInt(completedIndexMath[1]); // extacting the todo list item index
			if (todoList[index]) {
				todoList[index].done = true; // Mark a todo item completed
				console.log(`\nCompleted "${todoList[index].name}"\n`);
			}
			prompt();
		} else if (deleteIndexMath) {
			const index = parseInt(deleteIndexMath[1]); // extacting the todo list item index
			if (todoList[index]) {
				const deletedItems = todoList.splice(index, 1); // Delete a todo item
				console.log(`\nDeleted "${deletedItems[0].name}"\n`);
			}
			prompt();
		} else {
			switch (command.toLowerCase()) {
				case 'q': // Quit
					rl.close();
					break;
				case 'v': // View
					prompt(todoList.map((listItem, index) => `${index} [${listItem.done ? '✓' : ' '}] ${listItem.name}`).join('\n') + '\n');
					break;
				case 'n': // Create New todo item
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
				default: // Prompt again if command not recognized
					prompt();
			}
		}
	});
};
// Prompt menu
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
init(); // Initialize
