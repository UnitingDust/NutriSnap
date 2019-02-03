var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/**
 * MORE handler, responds if user texts "more"
 *    (or any uppercase variation like "MORE")
 * @param {string} tel The incoming telephone number
 * @param {string} body The (text) body of the message
 * @param {string} food The food the user is searching for
 * @param {object} from Information about the incoming message: number, zip, city, state, country
 * @param {object} to Information about the receiver (your Twilio number): number, zip, city, state, country
 * @returns {string}
 */
module.exports = (tel = '', body = '', food = '', from = {}, to = {}, callback) => {
  
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {

        if (this.readyState === 4) {    
            return callback(null, "Succesfully recorded " + food + "\n");
        }
    });

    xhr.open("POST", "https://afternoon-forest-51543.herokuapp.com/food");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(processJSON(body, food));   
};

function processJSON(json, food) {
  
    var text = JSON.parse(json);
    text = text.foods[0];
    
    var calories = text.nf_calories;
    var totalFat = text.nf_total_fat;
    var chol = text.nf_cholesterol;
    var sodium = text.nf_sodium;
    var carb = text.nf_total_carbohydrate;
    var fiber = text.nf_dietary_fiber;
    var sugar = text.nf_sugars;
    var protein = text.nf_protein;
        
    var retval = {
      "name":food,
      "calories": calories,
      "total_fat":totalFat,
      "cholesterol":chol,
      "sodium":sodium,
      "carbohydrate":carb,
      "fiber":fiber,
      "sugar":sugar,
      "protein":protein
    };

    return JSON.stringify(retval);
}

function processJSON2(foodJSON) {
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
