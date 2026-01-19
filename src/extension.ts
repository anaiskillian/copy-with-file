import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "copy-with-context" is active');

  const disposable = vscode.commands.registerCommand(
    "copyWithContext.copy",
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

      const tuple = `(
${selection},
"${file}",
line ${line}
)`;

      await vscode.env.clipboard.writeText(tuple);
      vscode.window.showInformationMessage("Copied with context");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
