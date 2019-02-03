const LIKE_REGEX = /^\s*i\s*like\s*([^\s]*)\s*.*$/gi;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
 
/**
* Not found handler - handles all SMS / MMS that don't match a command
*   (i.e. "more" = functions/messaging/more.js)
* @param {string} tel The incoming telephone number
* @param {string} body The (text) body of the message
* @param {buffer} media The media content of the message, if any
* @param {object} from Information about the incoming message: number, zip, city, state, country
* @param {object} to Information about the receiver (your Twilio number): number, zip, city, state, country
* @returns {string}
*/
module.exports = (tel = '', body = '', media = null, from = {}, to = {}, callback) => {
 
    if (media) {
 
        var xhr = new XMLHttpRequest();
        var params = {
            "requests": [{
                "image": {
                    "content": media.toString('base64')
                },
                "features": [{
                    "type": "LABEL_DETECTION",
                    "maxResults": 10
                }]
            }]
        };
 
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
 
            if (this.readyState === 4) {
                var text = processJSON(this.responseText);
                return callback(null, [String(text)].join('\n'));
            }
        });
 
        xhr.open("POST", "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCQ6aR3NFC1ysa1TO16PpYeCPmjrpw4JIE");
        xhr.send(JSON.stringify(params));
 
 
    } else if (body.match(LIKE_REGEX)) {
 
        // We matched some regex
        let matches = new RegExp(LIKE_REGEX).exec(body);
        let item = matches[1].toLowerCase();
        if (item === 'cookies') {
            return callback(null, 'I like cookies, too. Chocolate chip are my favorite.');
        } else {
            return callback(null, `I told you to say cookies, not ${item}!`);
        }
 
    } else {
 
        // We didn't find a command or match anything
        return callback(
            null,
            `This is the default "not found" handler for SMS. Basically, if the ` +
            `message does not match a function name in /functions/messaging/, it ` +
            `will go here instead - where you can do regex matching or NLP, if you want.` +
            `\n\n` +
            'This is also the default handler for MMS (image, video) messages.' +
            `\n\n` +
            `Try saying, "I like cookies" to see a regex-handled response, or try sending an image of food`
        );
 
    }
   
};
 
 
function processJSON(json) {
 
    var text = JSON.parse(json);
    var labels = text.responses[0].labelAnnotations;
 
    var set = new Set(["apple", "fried chicken", "banana", "chicken", "water", "bagel", "granola"]);
    var bool = false;
    var food = "";
 
    for (var i = 0; i < labels.length; i++) {
        var currentLabel = labels[i];
        var description = currentLabel.description.toLowerCase();
 
        if (set.has(description)) {
            bool = true;
            food = description.toLowerCase();
        }
    }
 
    if (bool) {
        var dict = {};
    
        dict["ice cream"] = "Nutritional Value for ice cream\nCalories: 273.24 grams\nTotal Fat: 14.52 grams\nCholesterol: 58.08 grams\nSodium: 105.6 grams\nCarbohydrate: 31.15 grams\nFiber: 0.92 grams\nSugar: 28.01 grams\nProtein: 4.62 grams";
        dict["apple"] = "Nutritional Value for apple\nCalories: 94.64 grams\nTotal Fat: 0.31 grams\nCholesterol: 0 grams\nSodium: 1.82 grams\nCarbohydrate: 25.13 grams\nFiber: 4.37 grams\nSugar: 18.91 grams\nProtein: 0.47 grams";
        dict["bagel"] = "Nutritional Value for bagel\nCalories: 277.2 grams\nTotal Fat: 1.39 grams\nCholesterol: 0 grams\nSodium: 443.1 grams\nCarbohydrate: 55 grams\nFiber: 1.68 grams\nSugar: 8.85 grams\nProtein: 11.09 grams";
        dict['banana'] = "Nutritional Value for banana\nCalories: 105.02 grams\nTotal Fat: 0.39 grams\nCholesterol: 0 grams\nSodium: 1.18 grams\nCarbohydrate: 26.95 grams\nFiber: 3.07 grams\nSugar: 14.43 grams\nProtein: 1.29 grams";
        dict['granola'] = "Nutritional Value for granola bar\nCalories: 117.04 grams\nTotal Fat: 4.64 grams\nCholesterol: 0 grams\nSodium: 70.28 grams\nCarbohydrate: 19.66 grams\nFiber: 1.06 grams\nSugar: 8.1 grams\nProtein: 1.58 grams";
        
        return dict[String(food)];
    
    }
    else {
        return "Couldn't detect the food";
    }
}
 
function processJSON2(foodJSON) {
    var text = JSON.parse(foodJSON);
    text = text.foods[0];
   
    var calories = text.nf_calories;
    var totalFat = text.nf_total_fat;
    var chol = text.nf_cholesterol;
    var sodium = text.nf_sodium;
    var carb = text.nf_total_carbohydrate;
    var fiber = text.nf_dietary_fiber;
    var sugar = text.nf_sugars;
    var protein = text.nf_protein;
       
   
    var retval = [];
    retval.push("Calories: " + calories);
    retval.push("Total Fat: " + totalFat);
    retval.push("Cholesterol: " + chol);
    retval.push("Sodium: " + sodium);
    retval.push("Carbohydrate: " + carb);
    retval.push("Fiber: " + fiber);
    retval.push("Sugar: " + sugar);
    retval.push("Protein: " + protein);
   
    return retval.join('\n');
}