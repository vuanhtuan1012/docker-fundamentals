# Introduction to React App  <!-- omit in toc -->

[React](https://react.dev/) is a **JavaScript library for** building user interface (UI). It was developed by Meta. A [React](https://react.dev/) app is an application whose **user interface is built** using [React](https://react.dev/) components.

- [Components and JSX](#components-and-jsx)
  - [Components](#components)
  - [JSX](#jsx)
  - [Create Your First React App](#create-your-first-react-app)
  - [Build Your First Interactive Component](#build-your-first-interactive-component)

## Components and JSX

### Components
- A [React](https://react.dev/) app is typically **built from reusable pieces** called components. Each **component** has a **specific responsibility** and **can be reused** in multiple places.
- [React](https://react.dev/) components are **ordinary JavaScript functions** that return [React](https://react.dev/)**-renderable content.** Their names **conventionally start with a capital letter.** *For example:*

  ```ts
  function Welcome() {
    return <h1>Hello, world!</h1>;
  }

  export default Welcome;
  ```
  - `function Welcome()` defines a JavaScript function.
  - `return` returns the UI that React should display.
  - `<h1>Hello, world!</h1>` looks like HTML, but in React code it's called **JSX.**
  - `export default Welcome` allows another file to import this component.

### JSX
- JSX is a **syntax extension** for JavaScript that lets us **write HTML-like markup** inside JavaScript or TypeScript files.
- JSX is **not HTML** itself. A build tool transforms JSX into JavaScript instructions that React can use.
- We normally write JSX in `.jsx` or `.tsx` files.
- JSX **looks like** HTML, but there are **some differences.**

  | HTML                    | JSX                        |
  |-------------------------|----------------------------|
  | `class="container"`     | `className="container"`    |
  | `onclick="..."`         | `onClick={...}`            |
  | `<img src="photo.png">` | `<img strc="photo.png" />` |
  | `<label for="name">`    | `<label htmlFor="name">`   |
- We **can** also insert JavaScript expression **inside** curly braces `{}`.

  ```ts
  const name = "Alex";
  return <p>Hello, {name}!</h1>;
  ```
- We **can** use expressions **for** calculation, conditional content, and values from variables.

  ```ts
  const isLoggedIn = true;
  return (
    <div>
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in first.</p>}
    </div>
  )
  ```

### Create Your First React App
- It's **recommended** to use [Vite](https://vite.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/).
- [Vite](https://vite.dev/) is a **development and build tool.** It **creates** the project structure, **runs** a local development server, and **prepares** our app for production.

  The traditional Create [React](https://react.dev/) App `npx create-react-app` tool **is deprecated** for new projects.

1. **Create** the project

   ```bash
   npm create vite@latest react-app -- --template react-ts
   ```
   - `react-app` is the **project directory.** It'll be created by the command.
   - the first `--` tells `npm` to **stop interpreting** command-line options and **pass the remaining** arguments **to** the program being executed.
   - the second argument `--template react-ts` **tells** [Vite](https://vite.dev/) **to generate** a [React](https://react.dev/) + TypeScript project.
2. **Understand** the project structure

   The **generated project** will contain files **similar to** these:

    ```text
    react-app/
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── node_modules/
    ├── package-lock.json
    ├── package.json
    ├── public/
    ├── src/
    │   ├── App.css
    │   ├── App.tsx
    │   ├── assets/
    │   ├── index.css
    │   └── main.tsx
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
    ```
    The **most important files** to understand first are:
    - `index.html`: the HTML page **containing** the element where [React](https://react.dev/) mounts.
    - `src/App.css`: **styles** for the app.
    - `src/App.tsx`: the **main** UI component.
    - `src/main.tsx`: the **entry point** that mounts [React](https://react.dev/) into the HTML page.
3. **Understand how** the app starts
   - The **HTML file** `index.html` typically contains:

      ```html
      <div id="root"></div>
      ```
      Initially, this element is empty. [React](https://react.dev/) **uses** it as the **container for** the app.
   - **The generated** `src/main.tsx` looks roughly like this:

      ```ts
      import { StrictMode } from 'react'
      import { createRoot } from 'react-dom/client'
      import './index.css'
      import App from './App.tsx'

      createRoot(document.getElementById('root')!).render(
        <StrictMode>
          <App />
        </StrictMode>,
      )
      ```
      - `createRoot(...)` **creates** a [React](https://react.dev/) root attached to the HTML element.
      - `!` after `getElementById('root')` is a TypeScript **non-null assertation.** It tells TypeScript to assume that **the element exists.**
      - `.render(...)` tells [React](https://react.dev/) **what to display** in that root.
      - `<App />` **uses** the `App` component.
      - `<StrictMode>` **helps identify** certain problems during development, it **does not create** a visible UI element.
    - The **overall process** is:

      ```mermaid
      block
        classDef default fill:#ECECFF, stroke:#9370DB;
        columns 1

        index["index.html\nContains the root element"]
        space
        main["src/main.tsx\nMounts the React app"]
        space
        App["src/App.tsx\nRenders the component tree"]
        space
        Browser["Browser\nDisplays the user interface"]

        index --> main
        main --> App
        App --> Browser
      ```

### Build Your First Interactive Component

**Replace** the contents of `src/App.tsx`  with this **example:**

```ts
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(10);

  return (
    <>
      <section id="center">
        <div>
          <h1>The First React App</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
    </>
  )
}

export default App
```
This **introduces** one of [React](https://react.dev/)'s most important **concepts: state.**

```ts
const [count, setCount] = useState(10);
```
This line **creates a state** variable:
- `count`: the current **value.**
- `setCount`: the **function** used **to update** that value.
- `useState(10)`: **initializes** the value to `10`.

When the counter **button is clicked,** the [React](https://react.dev/) **runs** the function `setCount((count) => count + 1)`, **updates** the state and **renders** the component again **to reflect** the new value.