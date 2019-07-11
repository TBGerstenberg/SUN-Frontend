# SUN-Frontend

Frontend für das "Siegener Uni Netzwerk" (SUN) - ein System für die Lehrveranstaltung "Implementierung von Anwendungssystemen" der Universität Siegen. Erstellt in der Entwicklungssprache Javascript unter Verwendung der React.Js Library im Viewlayer, Redux als State-Management Lösung und Semantic-UI-React als CSS Framework.
Bootstrapped mit der Create-React-App.

Abhängigkeiten des Projektes samt Versionsnummern sind in src/package.json notiert. Die Komponenten sind nach Brad Frost's philosophie zur Strukturierung von Design-Systemen "Atomic Design" strukturiert.

http://bradfrost.com/blog/post/atomic-web-design/

## Ausführen

Falls notwendig - git kommandozeilentool herunterladen

> > https://git-scm.com/downloads
> > Windows: https://gitforwindows.org/

Repository klonen mit

`git clone https://github.com/TobiGe/SUN-Frontend.git`

Node.js in Version 10.15.0 für die eigene Plattform herunterladen und installieren

https://nodejs.org/download/release/v10.15.0/  
Node kommt mit dem node-package-manager (NPM).

Dann:

1. In das Projektverzeichnis wechseln ( auf Kommandozeile (git bash) mit cd ~/<BENUTZERNAME>/<PFAD_ZUM_PROJEKT> )
2. Abhängigkeiten installieren `npm install`
3. Development Server starten `npm run start`

## Globale Styles verändern

Falls globale Styleinformationen des verwendeten CSS Frameworks Semantic UI verändert werden sollen, kann dies über die ./semantic.json geschehen. Die Befehle `npm build semantic` erzeugen dann optimierte css-files mit den neuen Einstellungen.

# Original Create-React-App README

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
