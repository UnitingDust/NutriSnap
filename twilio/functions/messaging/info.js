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
    var params = {
        "query": body.toLowerCase()
    };

    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {

        if (this.readyState === 4) {
            var text = processJSON(this.responseText, body);
            return callback(null, [String(text)].join('\n'));
        }
    });

    xhr.open("POST", "https://trackapi.nutritionix.com/v2/natural/nutrients");
    xhr.setRequestHeader("x-app-id", "51f859b2");
    xhr.setRequestHeader("x-app-key", "48b3662e9596e10e293ad2bfac0436eb");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(params));
};

function processJSON(foodJSON, body)
{
    var text;

    try {
        text = JSON.parse(foodJSON);
        text = text.foods[0];
    } catch (e) {
        return "Invalid food search";
    }
    
    var calories = text.nf_calories;
    var totalFat = text.nf_total_fat;
    var chol = text.nf_cholesterol;
    var sodium = text.nf_sodium;
    var carb = text.nf_total_carbohydrate;
    var fiber = text.nf_dietary_fiber;
    var sugar = text.nf_sugars;
    var protein = text.nf_protein;


    var retval = [];
    retval.push("Nutritional Value for " + body.toLowerCase());
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