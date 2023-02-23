import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import fs from "fs";
import crypto from "crypto";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
const API_KEY = process.env.API_KEY;
const URL = "https://api.openai.com/v1/images/generations";

// MIDDLEWARES
app.use(cors());

// para poder hacer  al ruteo de la informacion que nos llegue a traves del metodo post
// y poder tratar la informacion como un objeto literal
app.use(express.json());

// a partir de aqui se sirve el contenido de forma estatica
// tambien se guardaran las imagenes para que luego el usuario vuelva a cargarlas
app.use(express.static("public"));

app.get("/test", (req, res) => {
  res.send("Hola mundo");
});

app.post("/generate-image", async (req, res) => {
  const prompt = req.body.prompt;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };

  try {
    if (!!!prompt) {
      throw Error("No prompt found");
    }

    const response = await fetch(URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ prompt, size: "256x256" }),
    });

    const data = await response.json();
    console.log({ data });

    const imageURL = data.data[0].url;
    console.log({ imageURL });

    const imageResponse = await fetch(imageURL);
    const imageBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);

    const id = crypto.randomBytes(20).toString("hex");
    const filename = `${id}.jpg`;
    const pathname = "public/images/";

    fs.writeFileSync(`${pathname}${filename}`, buffer);
    console.log("Image saved locally");

    res.setHeader("Content-Type", "application/json");
    res.json({ filename });
  } catch (error) {
    console.error("Error generating image", error.message);
    res.sendStatus(500);
  }
});

app.get("/images", (req, res) => {
  const path = "public/images";
  fs.readdir(path, (err, files) => {
    if (err) {
      console.error("Error reading image directory", err);
      res.sendStatus(500);
    } else {
      // Filtrar solo los archivos con extensión .jpg
      // const jpgFiles = files.filter((file) => /\.jpg$/.test(file));
      const jpgFiles = files.sort(function (a, b) {
        return (
          fs.statSync(path + "/" + b).birthtime.getTime() -
          fs.statSync(path + "/" + a).birthtime.getTime()
        );
      });
      res.json(jpgFiles);
    }
  });
});

app.listen(port, () => {
  console.log("Server iniciando...");
});
