// Author: Tomas Andriekus
// Description: Discord bot get Adeptio price from Crex24 and sets in Discord channel

const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client({disableEveryone: true});
const fetch = require('node-fetch');

bot.on("ready", async () => {
	let url = "https://l2-corona-api.adeptio.cc/apiv1/getCryptoPrices?";
	let settings = { method: "Get" };

	console.log(`${bot.user.username} is online!`)

	setInterval(function() {
		fetch(url, settings)
		    .then(res => res.json())
		    .then((json) => {
		    let ADE = Number(json.data[0]).toFixed(10).replace(/\.?0+$/,"")
		    let BTC = Number(json.data[1])
		    totalSum = (ADE * BTC)
		    result = Number(totalSum).toFixed(8).replace(/\.?0+$/,"")
		    console.log('ADE price: $' + result)
		    bot.user.setActivity('ADEprice: $' + result);
	    });
	}, 120000);
});

bot.login(config.token);