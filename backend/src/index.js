import 'dotenv/config'
import { app } from "./app.js";  
import connectDB from './db/index.js';  
const port = process.env.PORT || 5000;

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server running on port ${port}`);
    })
})
.catch((err) => {console.log("MONGODB CONNECTION ERROR: ",err);})