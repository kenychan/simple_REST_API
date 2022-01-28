# Programmierprojekt - Vorlage ServerAPI

## Server vorbereiten und starten
Installiere alle Dependencies:
```
npm install
```

### Server-Code Linten
```
npm run lint
```

### TypeScript bauen
```
npm run build
```

### Server starten
```
npm run start
```

## Entwicklungsserver mit nodemon
'nodemon' (global) auf Computer installieren:
```
npm i nodemon -g
```

### Entwicklungsserver starten
```
nodemon
```
oder
```
npm run dev
```


## Schritte, um diese Vorlage zu reproduzieren
- Projektordner erstellen
- 'npm init -y'
- 'npm install typescript ts-node @types/node @types/express @types/cors --save-dev' (typescript nur als Entwicklungs-Dependency installieren)
- Ordner 'src' und 'build' erstellen
- 'tsconfig.json' anpassen (src- und build-Ordner als RootDir und outDir festlegen)
- 'npx tsc' sollte nun alle TS-Dateien in src zu JS-Dateien kompilieren und in build ablegen
- Server mit 'node build/server.js' starten
- Optional: npm-Skripte in package.json anlegen; Config für nodemon anlegen


//testclient:
http://127.0.0.1:3000/test
