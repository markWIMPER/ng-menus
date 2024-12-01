// 模块 'vscode' 包含了 VS Code 扩展性 API
// 在你的代码中导入该模块，并在下面使用别名 vscode 进行引用
import * as vscode from "vscode";
import { executeCommand } from "./executeCommand";
import { getCurrentFilePath } from "./currentActive";

// 当你的扩展程序被激活时，这个方法会被调用
// 你的扩展程序在第一次执行命令时就会被激活

export function activate(context: vscode.ExtensionContext) {
  // 使用控制台输出诊断信息（console.log）和错误（console.error）
  // 这行代码只会在你的扩展程序被激活时执行一次
  // console.log('Congratulations, your extension "ng-menus" is now active!');

  // 命令已经在 package.json 文件中定义
  // 现在通过 registerCommand 提供命令的实现
  // commandId 参数必须与 package.json 中的命令字段匹配
  //   const disposable = vscode.commands.registerCommand("ng-menus.test1", () => {
  //     // 你放置在这里的代码将在每次执行命令时被调用
  //     // 向用户显示一个消息框
  //     vscode.window.showInformationMessage("Hello World from ng-menus test#1!");
  //   });

  /** ng generate  */
  const ngGenerateCommand = vscode.commands.registerCommand(
    "ng-menus.ngmenutest",
    async (uri: vscode.Uri) => {
      const folderPath = getCurrentFilePath() || uri?.fsPath;

      if (!folderPath) {
        vscode.window.showErrorMessage("请选择一个文件！");
        return;
      }

      //

      console.log(folderPath);

      // 使用quickPick获取用户选择的选项
      vscode.window
        .showQuickPick(["component", "service", "directive", "module"], {
          placeHolder: "请选择生成的Angular文件类型",
        })
        .then((type) => {
          if (!type) {
            vscode.window.showErrorMessage("请先选择一个文件类型！");
            return;
          }

          vscode.window
            .showInputBox({
              prompt: `请输入${type}的名称`,
              placeHolder: `请输入${type}的名称`,
            })
            .then((fileName) => {
              if (!fileName) {
                vscode.window.showErrorMessage("文件名称不能为空！");
                return;
              }
              // 执行 ng generate 命令(项目内不需要额外的配置，这里先写死less、no test)
              const command = `ng generate ${type} ${fileName} --skip-tests --style=less`;
              executeCommand(command, folderPath);
            });
        });
    }
  );

  //   context.subscriptions.push(disposable);
  context.subscriptions.push(ngGenerateCommand);
}

// 当你的扩展程序被停用时，这个方法会被调用
export function deactivate() {}
