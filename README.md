# Projekt Community Staff Website


## Commands:

### Setup
```
npm install - installs all required node modules to run the project
```

### Develoment Build
```
npm run dev - Grabs your local IP for the Firebase Emulator and then starts the Vite Develoment build
```

### Pushing to the repo
```
npm run publish -- (-l?) (-m: "YOUR STRING HERE")
	-l: Builds the production build of the vue project and pushes it to the live branch
	-m: [REQUIRED] the commit messaged used for your commit
 
This command will add and commit the dist folder (if -l is used) or the entire project (if -l is not used) and push it to the repository using your commit message
```
#
## FIREBASE commands

### Firebase install
```
npm install -g firebase-tools
```

### Firebase initialization
```
firebase init:emulators - Leave all defaults unless adding a new emulator and then download the emulators
```

### Start firebase emulators
```
firebase emulators:start --import firebase-export
```

### Export your current firebase emulator data
```
(While firebase emulator is running on a different terminal)
firebase emulators:export 'firebase-export'
```
Note: You will get an error but the export will go through. you will need to rename the folder back to firebase-export

#
### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).
