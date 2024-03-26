const express = require('express');
const app = express();
const port = 3001;
const router = require('./src/routers/router');

app.use(express.json());
app.use(express.static("public"));
app.use("/", router);

app.listen(port, () => {
    console.log(`Servidor iniciado! http://localhost:${port}`);
});