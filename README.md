# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In this first  you can download and install dependecies npm i

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.




Deployement


AWS App Runner Deployment Guide
1. Create an App Runner Service:
Navigate to the AWS Management Console.
Select "Create service."
Choose your source repository (GitHub, GitLab, or Bitbucket).
Configure build settings based on your project type (e.g., Node.js, Python).
2. Configure Environment Variables:
In the App Runner service settings, find the environment variables section.
Set essential environment variables, including sensitive information like the MongoDB Atlas connection URL.
Ensure the MongoDB Atlas connection URL is securely stored as an environmental variable.
3. Define Service Settings:
Specify service settings such as the number of instances, CPU, and memory.
Adjust these settings according to your application's requirements for optimal performance.
4. Connect MongoDB Atlas URL and Add to Environmental Variables:
Retrieve the MongoDB Atlas connection URL from your MongoDB Atlas dashboard.
In the App Runner settings, set up an environmental variable to store the MongoDB Atlas URL securely.
5. Deploy:
Initiate the deployment process from the AWS App Runner console.
Monitor the deployment status to ensure a successful deployment.
AWS App Runner will automatically handle the build and deployment process based on your configuration.















## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
