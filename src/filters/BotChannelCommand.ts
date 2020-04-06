import {Filter} from "./Filter";
import {Message, TextChannel} from "eris";

const filterConf = require("../../config/ServerConfigs.json");
const config = require("../../config/config.json");

export class BotChannelCommand extends Filter{

    constructor() {
        super(true);
    }

    protected check(msg: Message): boolean {
        if (msg.channel instanceof TextChannel) {
            const sessionFilterConf = filterConf[msg.channel.guild.id];

            return msg.channel.id !== sessionFilterConf.botChannelID
                && sessionFilterConf.bots.includes(
                    sessionFilterConf.bots.filter(
                        bot => msg.author.id === bot.id
                    )[0]
                );
        } else {
            msg.channel.createMessage(`This should not have happened. Please report to <@${config.maintainer}>`)
                .catch(console.log);
            return true;
        }
    }

    protected sendRespond(msg: Message) {
        if (msg.channel instanceof TextChannel) {
            msg.channel.createMessage(
                `Bot Commands belong in the <#${filterConf[msg.channel.guild.id].botChannelID}>`
            ).catch(console.log);
        }
    }
}