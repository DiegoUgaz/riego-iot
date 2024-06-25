const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;
let sensorData = { tiempo: "00:00:00", distancia: 0 };

// Configuración para procesar datos JSON
app.use(bodyParser.json());

// Ruta para recibir datos POST en formato JSON
app.post("/actualizar", (req, res) => {
  const temperatura = req.body.temperatura;
  const humedad = req.body.humedad;
  const humedadPorcentaje = req.body.humedadPorcentaje;
  const status = req.body.status;

  console.log(`Datos recibidos - Temperatura: ${temperatura}, Humedad: ${humedad}, Humedad del suelo: ${humedadPorcentaje}, Status: ${status}`);
  
  
  const now = new Date();
  const hora = now.getHours().toString().padStart(2, '0');
  const minuto = now.getMinutes().toString().padStart(2, '0');
  const segundo = now.getSeconds().toString().padStart(2, '0');
  const dataHora = `${hora}:${minuto}:${segundo}`;

  // Imprime los datos recibidos en la consola del servidor
  console.log(`Datos recibidos - Hora: ${dataHora}, Temperatura: ${temperatura} °C, Humedad: ${humedad}%, Humedad del suelo: ${humedadPorcentaje}%, status: ${status}`);

  sensorData = {
    tiempo: dataHora,
    distancia: 0, // Esto debería ser actualizado si tienes un sensor de distancia
    temperatura: temperatura,
    humedad: humedad,
    humedadPorcentaje: humedadPorcentaje, // Cambiado a humedadPorcentaje
    status: status
  };

  // Puedes hacer lo que quieras con los datos aquí

  // Responde con una respuesta simple
  res.send("Datos recibidos correctamente");
});

// Ruta para mostrar una página HTML simple
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/datos", (req, res) => {
  // Devuelve los datos del sensor en formato JSON
  res.json(sensorData);
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor web iniciado en http://localhost:${port}`);
});
