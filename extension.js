// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var spawn = require('child_process');
var path = require('path');
var userdir = require('userdir');
var fs = require('fs');

var sdkFolderName = "/CC-EXT-SDK/";
var isWin = true;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    console.log('The CC Extension Builder Extension has been activated.');

    isWin = (process.platform != "darwin");

    var disposable = vscode.commands.registerCommand('extension.enableDebugMode', function () {

        var cmd = "";
        if (isWin) {
            console.log('Enabling Debug Mode on Windows')
            cmd = spawn.spawn('cmd.exe', path.join(__dirname, sdkFolderName, "setdebugmode.bat"));
        } else {
            console.log('Enabling Debug Mode on Mac')
            cmd = spawn.execFile(path.join(__dirname, sdkFolderName, "setdebugmode.sh"));
        }

        cmd.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        cmd.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        cmd.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });

        vscode.window.showInformationMessage('CEP Debug Mode Enabled');
    });

    var disposable = vscode.commands.registerCommand('extension.disableDebugMode', function () {

        var cmd = "";
        if (isWin) {
            console.log('Disabling Debug Mode on Windows')
            cmd = spawn.spawn('cmd.exe', path.join(__dirname, sdkFolderName, "disabledebugmode.bat"));
        } else {
            console.log('Disabling Debug Mode on Mac')
            cmd = spawn.execFile(path.join(__dirname, sdkFolderName, "disabledebugmode.sh"));
        }

        cmd.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        cmd.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        cmd.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });

        vscode.window.showInformationMessage('CEP Debug Mode Disabled');
    });

    var disposable = vscode.commands.registerCommand('extension.createExtension', function () {

        var extId = "";
        var extName = "";
        var cmd;

        getExtensionID();

        function getExtensionID() {

            vscode.window.showInputBox({
                prompt: 'Extension ID, for example: com.example.helloworld',
                value: 'com.example.helloworld'
            }).then(function (value) {
                extId = value;
                getExtensionName();
            })
        }

        function getExtensionName() {

            vscode.window.showInputBox({
                prompt: 'Extension Name',
                value: 'Extension Name'
            }).then(function (value) {
                extName = value;
                getExtensionTemplateType();
            })
        }

        function getExtensionTemplateType() {
            vscode.window.showQuickPick([{
                label: "topcoat",
                description: "An advanced Hello World extension, with extendscript examples and topcoat css included."
            },
            {
                label: "spectrum",
                description: "Identical to the default template, except for for Adobe's spectrum UI instead of topcoat."
            },
            {
                label: "theme",
                description: "Same as topcoat, just without topcoat."
            },
            {
                label: "basic",
                description: "A barebones Hello World extension (NB No longer recommended)"
            }], {
                    matchOnDescription: true,
                    placeHolder: "Choose a template to use for the extension."
                }).then(function (choice) {
                    if (isWin) {
                        console.log('Creating a new CC Extension at ' + userdir + '/AppData/Roaming/Adobe/CEP/extensions/' + extId)
                        cmd = spawn.execFile(path.join(__dirname, sdkFolderName, "createext.bat"), [choice.label, extId]);
                    } else {
                        console.log('Creating a new CC Extension at' + userdir + '/Library/Application\ Support/Adobe/CEP/extensions/' + extId)
                        cmd = spawn.execFile(path.join(__dirname, sdkFolderName, "createext.sh"), [choice.label, extId]);
                    }

                    cmd.stdout.on('data', (data) => {
                        console.log(`stdout: ${data}`);
                    });

                    cmd.stderr.on('data', (data) => {
                        console.log(`stderr: ${data}`);
                    });

                    cmd.on('close', (code) => {
                        console.log(`child process exited with code ${code}`);
                        createExtension();
                    });
                })
        }

        function createExtension() {
            if (isWin) {
                var manifestFile = path.join(userdir, '/AppData/Roaming/Adobe/CEP/extensions/', extId, '/CSXS/manifest.xml');
                var debugFile = path.join(userdir, '/AppData/Roaming/Adobe/CEP/extensions/', extId, '/.debug');
                editTemplate();
            } else {
                var manifestFile = path.join(userdir, '/Library/Application\ Support/Adobe/CEP/extensions/', extId, '/CSXS/manifest.xml');
                var debugFile = path.join(userdir, '/Library/Application\ Support/Adobe/CEP/extensions/', extId, '/.debug');
                editTemplate();
            }
            console.log('Processing Template...')

            function editTemplate() {
                editTemplate(manifestFile);
                editTemplate(debugFile);

                function editTemplate(srcFile) {
                    var rawText = fs.readFileSync(srcFile, 'utf8', 'r+')
                    var newText = processTemplate(rawText);
                    fs.writeFileSync(srcFile, newText)
                }

                function processTemplate(manifestString) {
                    var str = manifestString;
                    var reg1 = new RegExp("com.example.ext", "g");
                    str = str.replace(reg1, extId);
                    var reg2 = new RegExp("Extension-Name", "g");
                    str = str.replace(reg2, extName);
                    openExt();
                    return str;
                }
            }
        }

        function openExt() {
            if (isWin) {
                vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(userdir + '/AppData/Roaming/Adobe/CEP/extensions/' + extId + '/'), true)
            } else {
                vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(userdir + '/Library/Application\ Support/Adobe/CEP/extensions/' + extId), true);
            }
            vscode.window.showInformationMessage('Extension Created');
        }
    });
    context.subscriptions.push(disposable);
};

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;