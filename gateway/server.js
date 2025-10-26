const express = require("express");
const app = express();
app.use(express.json());

const PORT = 5000;
const NODE_ADDR = "http://localhost:3000";

app.post("/update", async (req, res) => {
  const { appName, hash } = req.body;

  if (!appName) {
    return res.status(400).send("AppName manquant");
  }
  if (!hash) {
    return res.status(400).send("Hash manquant");
  }

  console.log(`[NODE] Reçu nouvelle app : ${appName}/${hash}`);
  try {
    const response = await fetch(`${NODE_ADDR}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appName, hash }),
    });

    if (!response.ok) {
      throw new Error(`[GATEWAY <-> NODE] ${response.statusText}`);
    }

    res.status(200).send("Application mis à jour");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/:appName", async (req, res) => {
  const { appName } = req.params;

  if (!appName) {
    return res.status(400).send("AppName manquant");
  }

  console.log(`[GATEWAY] Servir l'application : ${appName}`);

  try {
    const response = await fetch(`${NODE_ADDR}/${appName}`);

    if (!response.ok) {
      throw new Error(`[GATEWAY <-> NODE] ${response.statusText}`);
    }

    const html = await response.text();
    res.send(html);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`[GATEWAY] Gateway en écoute sur http://localhost:${PORT}`);
});
