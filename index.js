const express =require("express");
const app = express();
const mongoose=require("mongoose");
const ProductRoute=require("./Routes/ProductRoutes")



mongoose
.connect("mongodb://127.0.0.1:27017/Project")
.then(()=> console.log("Database connection successfull!"))
.catch((err)=> {console.log(err);})

app.use(express.json());
app.use("/products", ProductRoute);


app.listen(5000,() => {
    console.log("on port 5000")
})