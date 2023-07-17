import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
const __dirname = path.resolve();
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


import postRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);


app.use(express.static(path.join(__dirname, './client/build')))






app.get('*' , function(req,res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
});


const CONNECTION_URL = "mongodb+srv://fulldoggebaazi:FFGJLMTFFCXtQ190@cluster0.wbfpgmw.mongodb.net/?retryWrites=true&w=majority"; 
const PORT = process.env.PORT|| 5000;
dotenv.config();
  
mongoose.connect(CONNECTION_URL ,   { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

// mongoose
//   .connect(CONNECTION_URL)  
//   .then(() => {
//     console.log("Connected to the Database");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

mongoose.set('useFindAndModify', false);