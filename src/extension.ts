
import * as vscode from 'vscode';

import { updateClasspath } from './classpath'; 

// called once per VSCode session when the plugin is launched
export function activate(context: vscode.ExtensionContext) {

	console.log('"javafx-support" now active');

	// add command to VSCode
	let disposable = vscode.commands.registerCommand('javafx-support.updateClasspath', () => updateClasspath(true));
	context.subscriptions.push(disposable);

	// create file system watcher for .classpath file in project workspace
	const fileWatcher = vscode.workspace.createFileSystemWatcher("**/.classpath", false, false, false);

	// update config if .classpath file is created
	fileWatcher.onDidCreate(() => {
		console.log(".classpath file created.");
		updateClasspath();
	});

	// update config if .classpath file changes
	fileWatcher.onDidChange(() => {
		console.log(".classpath file changed.");
		updateClasspath();
	});

	

	// run extension logic
	updateClasspath();
}

// this method is called when your extension is deactivated
export function deactivate() {}