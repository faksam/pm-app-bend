import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import appRoutes from "./routes";
import * as dotenv from 'dotenv';

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(appRoutes)

dotenv.config();

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.mfhqd.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

const connection = mongoose.connect(uri, options);
  
if(connection){
  console.log("Database connected");
}

else{
  console.log("Database connection error");
}

// // request read as json
// app.use(bodyParser.urlencoded({ extended: false }))
// // parse application/json

app.listen(PORT,function(){
    console.log(`Server running on http://localhost:${PORT}`);

});

