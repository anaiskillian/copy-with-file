import * as vscode from "vscode";

export function activate(fileContext: vscode.ExtensionContext) {
  console.log('Extension "copy-with-file" is active');

  const disposable = vscode.commands.registerCommand(
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
      vscode.window.showInformationMessage("Copied with file");
    }
  );

  fileContext.subscriptions.push(disposable);
}

export function deactivate() {}
