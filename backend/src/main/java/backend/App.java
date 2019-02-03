package backend;

import static spark.Spark.*; //Import Spark Framework
import com.google.gson.*; // Import Google's JSON library
import java.util.HashMap;
import spark.Route;
import java.util.Map;
import java.io.StringWriter;
import org.json.*;
import com.google.gson.stream.JsonWriter;
import java.io.Writer;
import java.text.NumberFormat;
import java.text.DecimalFormat;

public class App {

    private static final Gson gson = new Gson();
    static InMemoryObject obj = new InMemoryObject();
    public static void main(String[] args) {
        

        port(getIntFromEnv("PORT", 4567));

        final Gson gson = new Gson(); 
        Map<String, String> env = System.getenv();

/*
        String cors_enabled = env.get("CORS_ENABLED");
        if (cors_enabled == null) {
            cors_enabled = "false";
        } */
      //  if (cors_enabled.equals("True")) {
            final String acceptCrossOriginRequestsFrom = "*";
            final String acceptedCrossOriginRoutes = "GET,PUT,POST,DELETE,OPTIONS";
            final String supportedRequestHeaders = "Content-Type,Authorization,X-Requested-With,Content-Length,Accept,Origin";
            enableCORS(acceptCrossOriginRequestsFrom, acceptedCrossOriginRoutes, supportedRequestHeaders);
       // }

            //Getting info from twilio
            post("/food", getAndStoreInfo, gson::toJson);  

        }

        public static Route getAndStoreInfo = (request, response) -> {
            //Getting info from twilio
            Request req = gson.fromJson(request.body(), Request.class);
            response.status(200);
            response.type("application/json");


            NumberFormat formatter = new DecimalFormat("#0.00");

           // System.out.println(formatter.format(amount));

            if (req == null) {
                return gson.toJsonTree(obj);
            }

            obj.calories = Double.parseDouble(formatter.format(obj.calories + req.calories));
            obj.total_fat = Double.parseDouble(formatter.format(obj.total_fat + req.total_fat));
            obj.cholesterol = Double.parseDouble(formatter.format(obj.cholesterol + req.cholesterol));
            obj.sodium = Double.parseDouble(formatter.format(obj.sodium + req.sodium));
            obj.carbohydrate = Double.parseDouble(formatter.format(obj.carbohydrate + req.carbohydrate));
            obj.fiber = Double.parseDouble(formatter.format(obj.fiber + req.fiber));
            obj.sugar = Double.parseDouble(formatter.format(obj.sugar + req.sugar));
            obj.protein = Double.parseDouble(formatter.format(obj.protein + req.protein));
            obj.name.add(req.name);            

            if (obj == null) {
                return new StructuredResponse("error", "error getting info", null);
            } else {
               return (gson.toJsonTree(obj));
            }

        };




/** 
        public static Route sendBackData = (request, response) -> {

            //int idx = Integer.parseInt(request.params(""));
            response.status(200);
            response.type("application/json");
            
            if ((map) == null) {
                return new StructuredResponse("error", " not found", null);
            } else {
                return new StructuredResponse("ok", null, map);
            }
        };  */
        
        static int getIntFromEnv(String envar, int defaultVal) {
            ProcessBuilder processBuilder = new ProcessBuilder();
            if (processBuilder.environment().get(envar) != null) {
                return Integer.parseInt(processBuilder.environment().get(envar));
            }
            return defaultVal;
        }
 
        public static void enableCORS(String origin, String methods, String headers) {
            // Create an OPTIONS route that reports the allowed CORS headers and methods
            options("/*", (request, response) -> {
                String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
                if (accessControlRequestHeaders != null) {
                    response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
                }
                String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
                if (accessControlRequestMethod != null) {
                    response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
                }
                return "OK";
            }); 
            before((request, response) -> {
                response.header("Access-Control-Allow-Origin", origin);
                response.header("Access-Control-Request-Method", methods);
                response.header("Access-Control-Allow-Headers", headers);
            });
            
}
}