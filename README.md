# KeystonCloud PoC
This repository contains a Proof of Concept (PoC) for test basic concept pf KeystonCloud, an open-source cloud computing platform. The PoC demonstrates basic functionalities such as IPFS storage and IPFS gateway.

## Prerequisites
- Node.js (v24.x or later) installed
- IPFS installed

## Installation
**1. Clone the repository:**
```bash
git clone git@github.com:KeystonCloud/poc.git
```

**2. Navigate to the project directory:**
```bash
cd poc
```

**3. Install all npm dependencies:**
- NODE dependencies
```bash
cd node
npm install
```

- GATEWAY dependencies
```bash
cd gateway
npm install
```

**4. Prepare Gateway local repo:**
```bash
cd gateway/site.git
git init --bare
cp ../post-receive.example hooks/post-receive
chmod +x hooks/post-receive
```

**5. Configure repository on app example:**
```bash
cd mon-site
git remote add origin <LOCAL_PATH_TO_THIS_POC_FOLDER>/gateway/site.git
```

## Usage
**1. Start the IPFS daemon:**
```bash
ipfs daemon
```

**2. Start the Node application:**
```bash
cd node
npm start
```

**3. Start the Gateway application:**
```bash
cd gateway
npm start
```

**4. Commit change on app example:**
```bash
cd mon-site
git add .
git commit -m "Lanch v1 of my site"
git push origin master
```

**5. Access to app example via Gateway:**
Open your web browser and navigate to `http://localhost:5000/mon-site`
