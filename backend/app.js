import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/mongo.js";

import authRoute from "./routes/auth.js";
import imageRoute from "./routes/image.js";



dotenv.config();



connectDB();



const app = express();




// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);




// JSON Middleware
app.use(express.json());





// Test Route
app.get("/", (req, res) => {

  res.send(
    "🚀 AI Image Generator API Running..."
  );

});





// Health Check
app.get("/health", (req,res)=>{

  res.json({

    status:"ok",

    message:"Server Running"

  });

});






// Routes

// Authentication Routes
app.use(
  "/auth",
  authRoute
);
app.use(
  "/api/auth",
  authRoute
);



// Image Generation Routes
app.use(
  "/generate",
  imageRoute
);
app.use(
  "/api/generate",
  imageRoute
);








// Error Handler
app.use(
  (err,req,res,next)=>{

    console.error(err);

    res.status(500).json({

      success:false,

      message:"Server Error"

    });

  }
);






const PORT =
process.env.PORT || 5000;





if(!process.env.VERCEL){

  app.listen(
    PORT,
    ()=>{

      console.log(
        `🚀 Server Running On Port ${PORT}`
      );

    }
  );

}





export default app;