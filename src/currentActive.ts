import path from "path";
import vscode from "vscode";

export function getCurrentFilePath() {
  const activeEditor = vscode.window.activeTextEditor;

  if (activeEditor) {
    // 返回文件系统路径
    const filePath = activeEditor.document.uri.fsPath;
    return path.dirname(filePath);
  } else {
    // vscode.window.showErrorMessage("当前没有聚焦的文件");
    return null;
  }
}
