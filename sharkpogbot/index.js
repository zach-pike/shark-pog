const Discord = require('discord.js');
const client = new Discord.Client();
const key = require("./client.json").key1;

var canUse = 3; //ammound ofg time you can use it a day

var used = 0;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author.bot == false) {
        if (msg.content.startsWith("!warn")) {
            let user = msg.author.id
            msg.channel.send("thats poggers <@" + user.toString() + ">");
        }

        //set status
        else if (msg.content.startsWith("*setstatus")) {
            var status = msg.content.split(" ");
            var string = "";
            //get the exact string
            for (let i=1; i < status.length; i++) {
                if (i == status-1) {
                    string += status[i];
                } else {
                    string += status[i] + " ";
                }
            }
            //set the activity of bot
            client.user.setActivity(string); 
            msg.channel.send("Ok, Setting Status to: " + string);
        } 

        //sharkpog
        else if (msg.content.toLowerCase().indexOf("cum") !=-1) {
            msg.react("<:sharkpog:778104366694924289>");
        }

        //shark pog
        else if (msg.content.toLowerCase().indexOf("shark pog") !=-1) {
            msg.channel.send("you have been pogged")

            if (msg.member.voice.channel != null && used < canUse) {
                msg.member.voice.channel.join().then(connection => {
                    used++;
                    const dispatcher = connection.play(require("path").join(__dirname, './sharkPog.mp3'));;
                    dispatcher.on('finish', () => msg.member.voice.channel.leave())
                    console.log(msg.author.username + "#" + msg.author.discriminator)
                })
                .catch(console.error);
            }
        }

        //leave command
        else if (msg.content.toLowerCase() == "*leave") {
            msg.member.voice.channel.leave();
        }

        //botsay
        else if (msg.content.startsWith("*botsay")) {
            var status = msg.content.split(" ");
            var string = "";
            //get the exact string
            for (let i=1; i < status.length; i++) {
                if (i == status-1) {
                    string += status[i];
                } else {
                    string += status[i] + " ";
                }
            }
            if (string != "") {
                //say
                msg.delete();
                msg.channel.send(string);
            }
        }

        else if (msg.content.toLowerCase().startsWith("*butsay")) {
            msg.channel.send("gay ass")
        }

        else if (msg.content == "*randomuser") {
            // Get the Guild and store it under the variable "list"
            /*
            const list = client.guilds.cache.get("777398956224282644"/msg.guild.id/)
            list.members.cache.keyArray().forEach((id) => {msg.channel.send("<@" + id + ">")})
            msg.channel.send(list.members.cache.keyArray().length + " total users")
            */

           const list = client.guilds.cache.get("777398956224282644");
           // Iterate through the collection of GuildMembers from the Guild getting the username property of each member
           list.members.cache.forEach(member => console.log(member.user.username));
        }   
    }
});

(async () => {
    setTimeout(function () {
        used = 0;
    }, 86400000)
})();

client.login(key);