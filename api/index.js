#!/usr/bin/env node
import { dirname, sep } from 'path';
import { fileURLToPath } from 'url';
import { router } from "./router.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
import express from 'express';
const app = express();
const port = 3000;

app.use(express.static([__dirname,"..", "app", "dist"].join(sep)));

app.use("/api", router);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
