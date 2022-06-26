import express from "express";

const app = express();

//método get (leitura)
app.get("/get",(request,response)=>{
    response.send("Resposta enviada pelo método GET")
})

const PORT = 3333;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
