# SKIR - Starter Kit 4 Ionic React

- A minimal Ionic React App
- Sufficient enough to be used as a starter kit for you new app
- Very easy to get started with
- Includes most of basic features usually required in any app

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
- Copying changes to android directory & further - `ionic capacitor copy android && npx cap open android`

# Screenshots

![SKIR-Facts](https://user-images.githubusercontent.com/2748973/95900967-451f0c80-0db0-11eb-9747-90bf400166a9.png)
![SKIR-Component](https://user-images.githubusercontent.com/2748973/95900965-43eddf80-0db0-11eb-9b9a-e397107ff7fe.png)
![SKIR-About](https://user-images.githubusercontent.com/2748973/95900960-42241c00-0db0-11eb-87ee-d5dc1987d562.png)
![SKIR-Header](https://user-images.githubusercontent.com/2748973/95900972-4819fd00-0db0-11eb-8bd3-5b7d43b6a776.png)
