import { dirname, sep } from "path";
import { fileURLToPath } from "url";
import open from "open";
import { router } from "./router.js";
import { ensureAndGetTodos } from "../file-io/todo-yaml-ensure.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
import express from "express";

await ensureAndGetTodos();

const app = express();
const port = process.env.PORT || 3000;

app.set("etag", false);
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});
app.use(express.json());
app.use(express.static([__dirname, "..", "app", "dist"].join(sep)));

app.use("/api", router);
app.listen(port, async () => {
    const url = `http://0.0.0.0:${port}`;
    console.log(`App listening at ${url}`);
    if (process.env.THE_ENV !== "dev") {
        await open(url);
    }
});
