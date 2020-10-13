# SKIR - Starter Kit 4 Ionic React

- This is a minimal Ionic React App project very useful as starter kit.

## Key features

- Router setup with Login page & Logout button in header
- Local storage setup for persistent (offline) JSON objects storage
- AppContext setup for state management
- Ability to enable auditing in state management
- Tested well on Android & IOS

### Components:

- SKIRHeader: /components/SKIRHeader (sample usage in /pages/mainPage)
- AlertMessage: /components/AlertMessage (sample usage in /pages/mainPage)
- ToastMessage: /components/ToastMessage (sample usage in /pages/mainPage)

# Dev Docs

## Start Server

- `npm i`
- `npm run start`

## Ionic Docs

- Run `ionic serve` within the app directory to see your app in the browser
- Run `ionic capacitor add` to add a native iOS or Android project using Capacitor
- Generate your app icon and splash screens using `cordova-res --skip-config --copy`
- Explore the Ionic docs for components, tutorials, and more: https://ion.link/docs
- Building an enterprise app? Ionic has Enterprise Support and Features: https://ion.link/enterprise-edition

- Other useful commands:

* `ionic build`
* `ionic capacitor add android`
* `npx cap open android`
* `ionic cordova resources android --icon`
* `ionic capacitor copy android`
* sync = copy + update
* APK location: `\android\app\debug`
* After new android folder: retain res & ic_launcher-playstore.png in /app/src/main/
  `ionic capacitor copy android && npx cap open android`
