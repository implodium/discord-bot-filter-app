const Command = require("./Command");

class CommandController {

    constructor() {
        this.echo = {
            parameter: {
                min: 1,
                max: 'n'
            },
            command: (msg, parameter) => {
                let text = "";

                parameter.forEach(parameter => {
                    text += parameter + " ";
                });

                msg.channel.send(text);
            }
        }
    }

    convertToCommand(msg, commandString) {
        return new Command(msg, commandString);
    }

    validate(command) {
        try {
            if (
                this[command.baseCommand].parameter.max === 'n' &&
                command.parameter.length >= this[command.baseCommand].parameter.min
            ) {
                command.commandFunc = this[command.baseCommand].command;
                command.valid = true;
            }else if (
                command.parameter.length >= this[command.baseCommand].parameter.min &&
                command.parameter.length <= this[command.baseCommand].parameter.max
            ) {
                command.commandFunc = this[command.baseCommand].command;
                command.valid = true;
            } else {
                throw "invalid parameters";
            }
        } catch (e) {
            console.log(e)
        }
    }
}

CommandController.instance = new CommandController();

module.exports = CommandController;