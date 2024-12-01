import * as vscode from "vscode";
import ChildProcess from "child_process";

/** 最终执行命令行 */
export function executeCommand(command: string, cwd: string) {
  try {
    console.log(command);

    ChildProcess.exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        vscode.window.showErrorMessage(`创建失败：${stderr || error.message}`);
        return;
      }
      vscode.window.showInformationMessage(`创建成功：${stdout}`);
    });
  } catch (error: any) {
    vscode.window.showErrorMessage(`发生错误：${error.message}`);
    // TODO: handle error
  }
}
