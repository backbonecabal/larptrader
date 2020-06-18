
const LiveFeed      = require('./src/feed/Live');

// Settings for your backtest/trading
const RESOLUTION = '1m';               // '1m', '5m', '1h', '1d'
const RUN_LIVE = true;                 // enable live trading or not (system waits for each new bar)
const HISTORICAL_BARS = 10;            // how many bars to download before running live/backtest (max 1000)

const feed = new LiveFeed();

console.log(`Pulling the last ${HISTORICAL_BARS} bars and then waiting for new data. Press CTRL+C to terminate.`);



function onclose( bar )
{

    /* 
    *
    *   Your bags-to-riches strategy code goes here 
    *
    */
    
    console.log( `${ bar.live ? 'LIVE => ' :'' }${bar.opentimestamp} open=${bar.open} high=${bar.high} low=${bar.low} close=${bar.close}`);

}






// Required system bootup boilerplate code 
(async()=>{

    feed.on('bar', b => {

        // Call the user strategy code
        onclose( b );

    } );

    // `resolution`:    (optional, default='5m' ) bar length; '1m', '5m', '1h', '1d'
    // `warmup`:        (optional) request N bars of historical data to get our system started or just backtest
    // `offline`:       (optional) just terminate after sending the historical bars ( no live processing )
    await feed.start({ resolution: RESOLUTION, warmup: HISTORICAL_BARS, offline: !RUN_LIVE });

    
})();
