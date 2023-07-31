import express, { Request, Response } from "express";
import mongoose from "mongoose"; /*mongoose is a library used to connect to the mongoDB*/
import DeckModel from "./models/Deck";

const app = express();
/*
To run a .ts (typeScript) file you need a CLI (command-line tool)

npm i --save-dev ts-node

in the package.json, change the script to:
"dev": "ts-node src/index.ts"

You may face some error so just read through it. If it says to add @types/express, run the command accordingly

npm i --save-dev @types/express

Now, whenever you need to run the .ts file, in the terminal: npm run dev
this will trigger the dev in the script and run the ts-node and it will execute the index.ts present in the source folder

This is for the convenience

But you need to write this everytime you need to execute the file.
SO a solution is to install nodemon, which help restart the server whenever changes are made to the index.ts file.

npm install --save-dev nodemon

Go to the package.json and change the script to:
"dev": "nodemon --watch \"src/**\" --ext \"ts,json\" --exec \"ts-node src/index.ts\""

Once you run the script: npm run dev,
the nodemon will start the server and watch for any changes to the .ts or .json files in the src folder, and if any changes are there it will execute the ts-node to restart the server again and display the new changes

*/

app.use(express.json());

app.post("/decks", async (req: Request, res: Response) => {
  console.log(req.body);

  const newDeck = new DeckModel({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose
  .connect(
    "mongodb+srv://redmiremote07:R7lY46ASyEVNpD5V@cluster0.6url4gm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("server started at port: 3000");
    });
  });

/*
We can separately run the mongoose.connect(url) and the app.listen()
But here we want to load the server only when we are successfully connected to our database
*/

// server created at port:3000

// R7lY46ASyEVNpD5V
