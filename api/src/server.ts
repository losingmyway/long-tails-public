import * as express from "express";
import app from "./app";
import { getJsonItems } from "./handlers/jsonData";

const PORT = process.env?.PORT || 3333;

app.post("/json-data", (req: express.Request, res: express.Response) => {
  try {
    return res.json(getJsonItems());
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});
