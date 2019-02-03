var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/**
 * MORE handler, responds if user texts "more"
 *    (or any uppercase variation like "MORE")
 * @param {string} tel The incoming telephone number
 * @param {string} body The (text) body of the message
 * @param {object} from Information about the incoming message: number, zip, city, state, country
 * @param {object} to Information about the receiver (your Twilio number): number, zip, city, state, country
 * @returns {string}
 */
module.exports = (tel = '', body = '', from = {}, to = {}, callback) => {

    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            //var schedule = processJSON(this.responseText, body);
            //callback(null, [schedule].join('\n'));
            
            console.log(this.responseText);
            
            callback(null, "some");
        }
    });

    xhr.open("GET", "https://maps.googleapis.com/maps/api/place/nearbysearch/json ?location=-33.8670522,151.1957362 &radius=10 &types=gas_station &key=AIzaSyCQ6aR3NFC1ysa1TO16PpYeCPmjrpw4JIE");
    //xhr.setRequestHeader("Authorization", "Basic ZDM3M2VlMTQxZGIxNDUwZWI2MDc2NTBhZWU0ZDZjY2U6"); 
    //xhr.setRequestHeader("cache-control", "no-cache");
    //xhr.setRequestHeader("Postman-Token", "48571e3b-75c0-4f26-ba92-d297c90bb3cd");

    xhr.send(data);
};

function processJSON(json, body) {
    var option;
    var text = JSON.parse(json);

    var date = new Date();
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var estDate = new Date(date.getTime() + -300 * 60 * 1000);
    var currentDay = estDate.getDay();
    var JSONDay;

    if (currentDay == 0) {
        JSONDay = text.Sunday;
    } else if (currentDay == 1) {
        JSONDay = text.Monday;
    } else if (currentDay == 2) {
        JSONDay = text.Tuesday;
    } else if (currentDay == 3) {
        JSONDay = text.Wednesday;
    } else if (currentDay == 4) {
        JSONDay = text.Thursday;
    } else if (currentDay == 5) {
        JSONDay = text.Friday;
    } else {
        JSONDay = text.Saturday;
    }



    var retval = [];
    retval.push("Here are the current library times for today: ");

    for (var key in JSONDay) {
        retval.push(key + " : " + JSONDay[key]);
    }

    return retval.join('\n'); 

}
