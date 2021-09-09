<p align='center'>
<img src="https://image-cdn.neatoshop.com/styleimg/105300/none/iceblue/default/459678-20;1592408031x.jpg" alt="Vandelay Logo" width='50%'/>
</p>

<br />

# To Run this Project Locally:

First, run `npm install` to install all the dependencies. Then, you have to run these two commands, each in a separate terminal instances:

## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## `npm run start:server`

Launches the json-server with mock data in port `3001`). The available routes are:

- [http://localhost:3000/factories](http://localhost:3000/factories)
- [http://localhost:3000/factories/1/machines](http://localhost:3000/factories/1/machines)
- [http://localhost:3000/warehouses/1/inventory](http://localhost:3000/warehouses/1/inventory)

<br />

# Possible Enhancements:

## Form Validation:

I should be doing some form validation for Edit/Add inventory. Additionally, some fields should be marked as required. This was breaking, and it's out of the scope of what I wanted to deliver, it's a will-not-fix for now.

## Keeping DRY:

There's code duplication in Edit/Add -InventoryDialog.tsx, and I should find a way to get rid of it. As of now, it's a will-not-fix.

<br />

# Project takeaways:

## Advanced Types:

When designing the app, I wanted to tie together Factories and Warehouse somehow becuase they are very similar data objects. I knew that doing so would allow me to keep a DRY codebase. This wasn't possibly without learning about [advanced types](https://www.typescriptlang.org/docs/handbook/advanced-types.html).

## Material UI:

I chose to use Material UI since this is the company's preferred styling library. I took this opportunity to learn a few of its features. I previously used Material UI for a Miami-Dade County project a few years back.

## useReducer and Context:

I also took this opporunity to play with useReducer and useContext hooks and createContext. I haven't done so professionally yet. I kept the CapitalEquipmentPage as a class component on purpose to see how using the context there would differ than a function component.

## Heroku:

Initially, i had the app hosted on [https://vandelay-fine-latex.herokuapp.com](https://vandelay-fine-latex.herokuapp.com/), but json-server messes up. I am able to access the app at that address on my computer, but I have issues when testing on a different computer or in Safari (network errors). At this moment, I think the error might be related to CORs. I tried to fix it but I couldn't and don't want to waste more time on this.

<br />

# Changelog:

The commits for this code can be found [here](https://github.com/maxmueller7/terazo-int/commits/main).
