const GeminiAPI = require("gemini-api").default;
const secret = "";
const key = "";
const restClient = new GeminiAPI({key, secret, sandbox:true});

module.exports = {

  marketBuyBitcoin:function(){

    return restClient.newOrder({amount:1,
                       price:40000,
                       side:"sell",
                       symbol:"btcusd",
                       options:["immediate-or-cancel"]
  })
},

marketSellBitcoin:function(){

  return restClient.newOrder({amount:1,
                     price:50000,
                     side:"buy",
                     symbol:"btcusd",
                     options:["immediate-or-cancel"]
})

},

  bitcoinPrice:function(){
    return restClient.getTicker("btcusd");

  }

}
