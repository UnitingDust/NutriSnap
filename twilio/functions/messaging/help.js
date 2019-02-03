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

  var retval =[];
  retval.push("Welcome to NutriSnap!");
  retval.push("Here are the following options: \n");
  
  retval.push("Send a photo of a food item you want to have the nutritional facts about\n")
  retval.push("Type in the food item you want to have the nutritional facts about");
  
  retval.push("Type in 'record (food item)' the food that you just ate");
  retval.push("Type in 'check' for update of foods consumed'\n");
  
  retval.push("Type in '?' for this help menu'\n");

  var text = retval.join('\n');

  callback(null, [text].join('\n'));
};