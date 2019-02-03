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
  
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {

        if (this.readyState === 4) {
            var text = processJSON(this.responseText);
            return callback(null, [String(text)].join('\n'));
        }
    });

    xhr.open("POST", "https://afternoon-forest-51543.herokuapp.com/food");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(null);    
};


function processJSON(foodJSON) {  
    var text = JSON.parse(foodJSON);
   
    var calories = text.calories;
    var totalFat = text.total_fat;
    var chol = text.cholesterol;
    var sodium = text.sodium;
    var carb = text.carbohydrate;
    var fiber = text.fiber;
    var sugar = text.sugar;
    var protein = text.protein;
       
   
    var retval = [];
    retval.push("Your current breakdown for today: ");
    retval.push("Calories: " + calories + " grams");
    retval.push("Total Fat: " + totalFat + " grams");
    retval.push("Cholesterol: " + chol + " grams");
    retval.push("Sodium: " + sodium + " grams");
    retval.push("Carbohydrate: " + carb + " grams");
    retval.push("Fiber: " + fiber + " grams");
    retval.push("Sugar: " + sugar + " grams");
    retval.push("Protein: " + protein + " grams");
   
    return retval.join('\n');
}
