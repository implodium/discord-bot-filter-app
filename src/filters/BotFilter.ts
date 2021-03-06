import {Filter} from "./Filter";
import {Message, TextChannel} from "eris";

const filterConf = require("../../config/ServerConfigs.json");
const config = require("../../config/config.json");

export class BotFilter extends Filter{

    constructor() {
        super(false);
    }

    protected filterCheck(msg: Message): boolean {
        if (msg.channel instanceof TextChannel) {
            const sessionFilterConf = filterConf[msg.channel.guild.id];
            const notInWhiteListChannel = !sessionFilterConf.botWhiteList.includes(
                sessionFilterConf.botWhiteList.filter(
                    (channel: string) => msg.channel.id === channel
                )[0]);

            const isBot = sessionFilterConf.bots.includes(
                sessionFilterConf.bots.filter(
                    (bot: any) => msg.author.id === bot.id
                )[0]);

            return isBot && notInWhiteListChannel;
        } else {
            msg.channel.createMessage(`This should not have happened. Please report to <@${config.maintainer}>`)
                .catch(console.log);
            return true;
        }
    }
}