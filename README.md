# DH2321-Spotify-Project

---

### Setup
To get started, run (sudo if needed) the command below.
```
npm install -g @vue/cli @vue/cli-service-global
```
This will allow you to use Vue from the command line, specifically run the `vue serve` and `vue ui` commands. They let
you instantly see code changes you make in your browser and view the project with a UI. The `vue serve` command will host the html file in `/public`
and automatically inject all the components included in `/src/App.vue`. You can find the hosted website at
localhost:8080.

Before you can start though, you need to install the node\_modules listed in the file `package.json` since the directory
is in our .gitignore file, to prevent unnecessary data on github. This is easily done by running the following command.
```
cd viral50
npm install 
```

Now, you can edit the code by adding components with a .vue extension and include them in the application as shown in
App.vue. To get a live update of the application as you code at localhost:8080, just run
```
cd viral50
npm run serve
```

---

### Deployment
By committing and pushing on the branch ``gh-pages``, the latest version is deployed to the website. To bundle and
minify the code before pushing it to deployment, make sure to run (in /viral50/) `npm run build` first.
