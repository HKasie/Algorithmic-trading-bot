global.fetch = require("node-fetch");
const indicators = require("./indicators.js");
const exchange = require("./exchange.js");

var hasPosition = false;
var strategy = function(){
  // if BTC < MA ==> Buy (if we have no position)
  // if BTC > MA ==> Sell (if we have a position)

  console.log("     ");
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
  console.log("Executing strategy");

  indicators.hourlyMovingAverage("btc", "usd", 100, function(ma){
    exchange.bitcoinPrice()
    .then(res => {

      var price =res.last;

      console.log("MA: ", ma);
      console.log("Price: ", price);

      if(price < ma && !hasPosition){

        console.log("BUY!");
        exchange.marketBuyBitcoin()
        .then(res=>{
          console.log("Buy successful");
          hasPosition = true;
          setTimeout(strategy, 1000);
        })
        .catch(error => console.error)
      }
      else if(price > ma && hasPosition){
        console.log("SELL!");
        exchange.marketSellBitcoin()
        .then(res=>{
          console.log("Sell successful");
          hasPosition = false;
          setTimeout(strategy, 1000);
        })
        .catch(error => console.error)
      }

      else{

        console.log("HOLD!")
        setTimeout(strategy, 1000);
      }

    })

  });

}

strategy()

/* for calling the indicators funtion
indicators.hourlyMovingAverage("btc", "usd", 100, function(result){
  console.log("MA: ", result)
})
*/

/* for calling exchange function
exchange.marketSellBitcoin()
.then(res => console.log(res))
.catch(error => console.error(error));
*/
