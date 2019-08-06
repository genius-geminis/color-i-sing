![](https://media.giphy.com/media/143qWPF33HtSTK/giphy.gif)

# _Color I Sing_ :notes:

> http://colorising.herokuapp.com/

Color I Sing is a digital coloring book that lets your voice be the paint brush. Using the Web Audio and Canvas APIs, this program analyses your voice and colors in the page based on the notes you sing. Users can share their creations via social media or save them to their account.

## Features

Choose from an list of coloring templates and color palettes.
Stop coloring at any time by clicking the STOP button.
Download finished images, save them to your account, or share them on social media.
Clear image and start over.

## Upcoming Features

Choose your vocal range (Alto or Soprano)
Upload a custom coloring template or color palette
Color in the template section-by-section via mouse click

## Tech Stack:

* Front End: React, Redux, CSS, Java Script, Canvas API, Web Audio API, image-js
* Back End: Node, Express, PostgreSQL, Google Oath 


## Getting Started :computer:

1.  Clone this repo to your desktop

2.  After cloning, go to its root directory and install the dependencies:

```
npm install
```
3. Create a Postgres Database: ``` colorising ```

4. Create a file called secrets.js in the project root

* This file is .gitignore'd, and will only be required in your development environment
* Its purpose is to attach the secret env variables that you'll use while developing
* However, it's very important that you not push it to Github! Otherwise, prying eyes will find your secret API keys!
* It might look like this:

```
  process.env.GOOGLE_CLIENT_ID = 'hush hush'
  process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
  process.env.GOOGLE_CALLBACK = '/auth/google/callback'  
```

5. To use OAuth with Google, complete the step above with a real client ID and client secret from Google
   
* You can get them here: https://console.developers.google.com/apis/credentials

6.  Once the dependencies are installed, start to start the application:

```
npm run start-dev
```

7.  You will then be able to access it at _localhost:8080_

8.  Enjoy!

## Credits :star:

* [Colleen Higgins](https://github.com/colleen-higgins-designs) :heart:
* [Alena Loffe](https://github.com/alena-ioffe) :heart:
* [Kistina Gurung](https://github.com/Kistinagrg) :heart:
