![DevCupid Logo](client/dist/public/logo.svg)

What is DevCupid?
-----------------
DevCupid is a place for developers to find and match with one another to assemble the perfect teams for any passion project, startup venture, open source library, or even a full-time job.

We believe that there is more to assembling a great team than resumes and portfolios - there has to be chemistry and a common goal that every contributor is passionate about.

We hope you’re just as excited as we are.

What runs DevCupid?
-----------------
* [MongoDB](https://www.mongodb.com/) - A NoSQL (document) database
* [Express](http://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
* [Node.js](https://nodejs.org/en/) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows developers to easily build scalable network applications
* [React](https://facebook.github.io/react/) - A JavaScript frontend library for creating and building user interfaces
* [Firechat](https://firechat.firebaseapp.com/) - Real time chat with no server code build from Firebase

Getting started
-----------------
Want to help contribute or run this on your own local machine? Clone our repo and try us out!

```
# Clone the most recent update
git clone https://github.com/thinkful-c11/devcupid.git

# Open our repo on your local machine!
cd devcupid

# Install all of our dependencies, this does require a pre-req of having Node.js installed
npm install

# We have our .env and firebaseConfig.js files in our .gitignore, you'll need to create your own. For your .env file do the following setup entering in your own database URL (we recommend mLab), GitHub Client ID and Secret:
export TEST_DATABASE_URL=''
export GITHUB_CLIENT_ID=''
export GITHUB_CLIENT_SECRET=''
export PORT=8080

# For your firebaseConfig.js file do the following:
export const FIREBASE_API_KEY='';
export const FIREBASE_AUTH_DOMAIN='';
export const FIREBASE_DATABASE_URL='';
export const FIREBASE_PROJECT_ID='';
export const FIREBASE_STORAGE_BUCKET='';
export const FIREBASE_MESSAGING_SENDER_ID='';

# Got that all done? Now lets get ready to run the server! We need to first specify our source in the terminal before we start:
source ./config/.env

# Huzzah now lets run this cuteness!
npm start
# You can also do this instead:
npm run dev
```

Useful links
-----------------
[Demo](http://devcupid.herokuapp.com/)

[Contributing Guide](https://github.com/thinkful-c11/devcupid/blob/master/docs/contributing.md)