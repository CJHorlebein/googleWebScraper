# Google Web Scrapper for G+ Communities

### Author: CJ Horlebein

---

### Date: Dec 19, 2018

#### Requirements:

1. Project uses Axios for HTTP request
2. Additionally, Cross Resource Origin Sharing must be enabled on the browser. Alternatively, this code can be run using Node.js to avoid this.
3. All available post ID's you of the group you wish to scrap. The owner of the group can easily pull these from the [Google Takeout](https://takeout.google.com/settings/takeout?) page

#### Purpose:

Due to Google+ shutting down, all of the post information currently on a google communities page will also be removed. This project was an effort to save that information to a locally saved file.

---

## Usage

1. First you must pull add all post ID's as an array in the main.JS.
2. Change line 51 of main.js to target array of ID's.
3. Open index.html and wait for page to populate. Can take several minutes depending on number of posts.
4. Right click and save page to local storage.

---

## Current bugs / features to update

- Adding styling to page
- All comments do not get pulled
- Posts do not appear in correct order of date.
