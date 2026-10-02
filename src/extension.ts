// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {exec} from 'child_process';
import { stat } from 'node:fs';
import { join } from 'node:path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Pystart" is now active!');

	// The command has been defined in the package.json file
	// yes so now this will try to actulaly form a envirnment 
	// The commandId parameter must match the command field in package.json
	const start = vscode.commands.registerCommand('Pystart.start', () => {
		const location = vscode.workspace.workspaceFolders;
		// The code you place here will be executed every time your command is executed
		// This If Else will identitfy if user is currently in a workspace or not 
		if (location == undefined){
			vscode.window.showInformationMessage("You are not in A worksapce");
			return;
		}
		else{
			vscode.window.showInformationMessage(`This is Your Location, ${location[0].uri.fsPath}`);
		}

		//This EXEC Runs a function and give results back
		//we actually dont need to check this function to see that python works oneces the logic of
		//python -m venv .venv is solid we can move remove this 
		exec('python --version', (error, stdout, stderr)=>{
			vscode.window.showInformationMessage(stdout)
			if(error){
				vscode.window.showInformationMessage(`ERROR: ${error.message}`);
				return;
			}
		});
 

		//try to findout if .venv already exist if yes then dont make it 
		stat(join(location[0].uri.fsPath, ".venv"), (err, stats) => {
			if(err == null){
				vscode.window.showInformationMessage("Something Went Wrong :)");
			}
			if(stats.isDirectory()) {
				//dont do anything but this is in the code instead of != so later we can add
				//functionally to check wether where .venv works or not
				vscode.window.showInformationMessage("Venv Aleardy Exist Let us Activate It For You.");
			}
			//else just create a .venv folder 
			else{
				exec('python -m venv .venv',
					{
						cwd : location[0].uri.fsPath
					},
					(error, stdout, stderr) => {
					if (error != null){
						vscode.window.showErrorMessage(`ERROR: ${error.message}`);
					}
					});
			}
			});

		});


	// this command will be used to terminate the virtual envirnments 
	const end = vscode.commands.registerCommand('Pystart.end', ()=> {
		vscode.window.showInformationMessage("PyStart Is Ending Here!!!");

	});
	context.subscriptions.push(start);
	context.subscriptions.push(end);
}

// This method is called when your extension is deactivated
export function deactivate() {}