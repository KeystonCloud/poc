const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3000;
const IPFS_ADDR = "http://127.0.0.1:8080";

// Fake BDD
let fakeDb = {};

app.post("/update", (req, res) => {
  const { appName, hash } = req.body;

  if (!appName) {
    return res.status(400).send("AppName manquant");
  }
  if (!hash) {
    return res.status(400).send("Hash manquant");
  }

  console.log(`[NODE] Reçu nouvelle app : ${appName}/${hash}`);
  fakeDb[appName] = hash;
  res.status(200).send("Application mis à jour");
});

app.get("/:appName", async (req, res) => {
  const { appName } = req.params;

  if (!appName) {
    return res.status(400).send("AppName manquant");
  }

  const currentSiteHash = fakeDb[appName];

  if (!currentSiteHash) {
    return res
      .status(404)
      .send("Application non trouvée (pas encore déployée)");
  }

  console.log(`[NODE] Servir l'application : ${appName}/${currentSiteHash}`);

  try {
    const response = await fetch(`${IPFS_ADDR}/ipfs/${currentSiteHash}`);

    if (!response.ok) {
      throw new Error(`Erreur IPFS: ${response.statusText}`);
    }

    const html = await response.text();
    res.send(html);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Erreur lors de la récupération de l'application depuis IPFS");
  }
});

app.listen(PORT, () => {
  console.log(`[NODE] Node en écoute sur http://localhost:${PORT}`);
});
