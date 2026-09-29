// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec } from 'child_process';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Pystart" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const start = vscode.commands.registerCommand('Pystart.start', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		if (vscode.workspace.workspaceFolders == undefined){
			vscode.window.showInformationMessage("You are not in A worksapce");
			return;
		}
		else{
			let location = vscode.workspace.workspaceFolders;
			vscode.window.showInformationMessage(`This is Your Location, ${location[0].uri.fsPath}`);
		}

		exec('python --version', (error, stdout, stderr)=>{

			vscode.window.showInformationMessage(stdout);
		});


	});

	const end = vscode.commands.registerCommand('Pystart.end', ()=> {
		vscode.window.showInformationMessage("PyStart Is Ending Here!!!");

	});
	context.subscriptions.push(start);
	context.subscriptions.push(end);
}

// This method is called when your extension is deactivated
export function deactivate() {}