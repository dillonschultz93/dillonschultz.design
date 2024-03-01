# Personal Portfolio Website
This is a personal portfolio website that I have created using Remix for the frontend and Sanity as the headless CMS.

## How to run the frontend locally
1. Change directory to the `site` folder
```bash
cd site
```
2. Install the dependencies
```bash
npm install
```
3. Run the development server
```bash
npm run dev
```

## How to run the Sanity instance locally
1. Change directory to the `sanity` folder
```bash
cd sanity
```
2. Install the dependencies
```bash
npm install
```
3. Create a Sanity project (this will require a Sanity account)
```bash
npm create sanity@latest -- --create-project "<project name>" --dataset production
```
4. Run the development server
```bash
npm run dev
```