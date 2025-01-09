# React create project guide

```bash
# clono la cartella da github

npm create vite@latest

# alla domanda project-name inserisco . (dot)

npm install

# testo
npm run dev

# apro il .gitignore e aggiungo package-lock.json

 # installo gli altri pacchetti che mi servono
 #Esempio:
 npm install bootstrap
 npm install axios
# installo anche la libreria React Router che ci permette di mappare le rotte:
 npm install react-router-dom

 # cancello il contenuto di App.jsx e rimuovo gli import che non mi servono
 # cancello i file che non mi servono

 #se voglio importo bootstrap in main.jsx prima del mio css custom 
 import "bootstrap/dist/css/bootstrap.min.css";

 # comincio ad editare App.jsx


# add to rules in eslint
rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ..reactHooks.configs.recommended.rules,
      "react/prop-types": 0, 👈
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
```



```bash
Esercizio del 9/01/2024: React Blog Pages
repo: react-router 
Consegna
Creiamo il frontend del nostro Blog e le sue pagine!
- Partiamo installando React Router DOM: npm install react-router-dom
- Definiamo almeno 3 pagine: una homepage, una pagina “chi siamo” e una pagina con la lista dei post
- Implementiamo una navbar in comune a tutte le pagine per poter navigare tra loro
Bonus
- Centralizzare la Navbar grazie a un Componente  Layout
- Gestire la classe active
-aggiungere una rotta con id dinamico e recuperare dal componente l'id del post
```