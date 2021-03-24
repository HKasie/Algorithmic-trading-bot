const CCAPIkey = "1f8780eb55a082c0788bf7ddf0f66bb955d81baa201b4d31a7a921bab901d9a8";
const CryptoCompareAPI = require("cryptocompare");
CryptoCompareAPI.setApiKey(CCAPIkey);


module.exports = {

  hourlyMovingAverage:function movingAverage(cryptoAsset, fiatCurrency, hours, callback){

    if(hours>169){
      console.error();("only up to 169 hours allowed")
      return
    }

    CryptoCompareAPI.histoHour(cryptoAsset, fiatCurrency)
    .then(data => {

      // 2. calculate MA from past 100 hours
      data = data.reverse()
      var sum = 0;
      for(var i = 0;i<hours;i++){
        sum+=data[i].close;
      }

      var movingAverage = Math.floor(sum/hours);
      callback(movingAverage);

    })
      .catch(console.error)
  }


}
