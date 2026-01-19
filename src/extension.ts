import * as vscode from "vscode";

export function activate(fileContext: vscode.ExtensionContext) {
  console.log('Extension "copy-with-file" is active');

  const copyDisposable = vscode.commands.registerCommand(
    "copyWithFile.copy",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor");
        return;
      }

      const selection = editor.selection.isEmpty
        ? editor.document.lineAt(editor.selection.active.line).text
        : editor.document.getText(editor.selection);

      const file = editor.document.fileName;

      const line = editor.selection.start.line + 1;

      const tuple = `${selection},
"${file}",
line ${line}`;

      await vscode.env.clipboard.writeText(tuple);
      const showNotification = vscode.workspace
        .getConfiguration("copyWithFile")
        .get<boolean>("showNotification", true);
      if (showNotification) {
        vscode.window.showInformationMessage("Copied with file");
      }
    }
  );

  const reportIssueDisposable = vscode.commands.registerCommand(
    "copyWithFile.reportIssue",
    async () => {
      await vscode.commands.executeCommand("workbench.action.openIssueReporter", {
        extensionId: fileContext.extension.id,
      });
    }
  );

  fileContext.subscriptions.push(copyDisposable, reportIssueDisposable);
}

export function deactivate() {}
