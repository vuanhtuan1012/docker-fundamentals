# Introduction to React App  <!-- omit in toc -->

[React](https://react.dev/) is a **JavaScript library for** building user interface (UI). It was developed by Meta. A [React](https://react.dev/) app is an application whose **user interface is built** using [React](https://react.dev/) components.

- [Components and JSX](#components-and-jsx)
  - [Components](#components)
  - [JSX](#jsx)
  - [Create Your First React App](#create-your-first-react-app)
  - [Build Your First Interactive Component](#build-your-first-interactive-component)
- [Props and State](#props-and-state)
  - [Props: Passing Data to a Component](#props-passing-data-to-a-component)
  - [State: Data That Changes](#state-data-that-changes)
  - [Props vs. State](#props-vs-state)
- [Lists and Events](#lists-and-events)
  - [Handling Events](#handling-events)
  - [Rendering a List](#rendering-a-list)
- [Building an Interactive User List](#building-an-interactive-user-list)
  - [Removing Existing Users](#removing-existing-users)
  - [Adding New Users](#adding-new-users)
  - [Organizing Components into Files](#organizing-components-into-files)
- [`useEffect` and API Calls](#useeffect-and-api-calls)
  - [Fetch Data from API](#fetch-data-from-api)
  - [Refetch Data on Endpoint Changes](#refetch-data-on-endpoint-changes)

## Components and JSX

### Components
- A [React](https://react.dev/) app is typically **built from reusable pieces** called components. Each **component** has a **specific responsibility** and **can be reused** in multiple places.
- [React](https://react.dev/) **components** are ordinary JavaScript **functions that** return [React](https://react.dev/)**-renderable content.** Their names **conventionally start with a capital letter.** *For example:*

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

First, **replace the styles** for the app in `src/App.css`  by the contents of [this file](react-app/src/App.css).

**Replace** the contents of `src/App.tsx`  with this **example:**

```ts
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(10);

  return (
    <main className="app">
      <section className="counter-section">
        <h1 className="app-title">The First React App</h1>
        <div className="counter-widget">
          <button
            type="button"
            onClick={() => setCount(count => count + 1)}
          >
            Counter is <span>{count}</span>
          </button>
        </div>
      </section>
    </main>
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


## Props and State

### Props: Passing Data to a Component
- **Props** are inputs **passed from** a parent [component](#components) **to** a child [component](#components). *For example,* **rather than** creating separate components **for each** individual user in the [`App` component](#build-your-first-interactive-component), we **pass dynamic** user data using props.

  ```ts
  function App() {
    return (
      <main className="app">
        <section className="cards-section">
          <h2 className="section-title">User Cards</h2>

          <div className="user-card-grid">
            <UserCard name='John Doe' age={30} isActive />
            <UserCard name='Jane Smith' age={25} isActive={false} />
            <UserCard name='Alex Martin' age={35} isActive />
          </div>
        </section>
      </main>
    )
  }
  ```
  `UserCard` is a **child component** of `App`, defined as follow:

  ```ts
  type UserCardProps = {
    name: string;
    age?: number;
    isActive: boolean;
  }

  function UserCard({ name, age, isActive }: UserCardProps) {
    return (
      <article className="user-card">
        <h3>{name}</h3>

        {age !== undefined && (
          <p><span className="field-label">Age:</span> {age}</p>
        )}

        <p>
          <span className="field-label">Status:</span>
          <span className={isActive ? 'status-active' : 'status-inactive'}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </p>
      </article>
    );
  }
  ```
  - `age !== undefined` **checks whether** the `age` property is defined.
  - The `&&` (logical `AND`) operator **renders** the right-hand expression **only when** the lef-hand condition evaluates to `true`. This pattern is known as **conditional rendering** in [React](https://react.dev/).
- In the `UserCard` function defintion, the `{ name, age, isActive}` **syntax** uses **JavaScript destructuring** to **unpack** properties directly **from** the`UserCardProps` props object.

  We can write the **equivalent code without destructing** as follow:
  ```ts
  function UserCard(user: UserCardProps) {
    return (
      <article className="user-card">
        <h3>{user.name}</h3>

        {user.age !== undefined && (
          <p><span className="field-label">Age:</span> {user.age}</p>
        )}

        <p>
          <span className="field-label">Status:</span>
          <span className={user.isActive ? 'status-active' : 'status-inactive'}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        </p>
      </article>
    );
  }
  ```
  Both approaches are valid. **Destructuring is common** in [React](https://react.dev/) code.
- Finally, props are **passed via JSX tags** as follow:
  ```ts
  <UserCard name='Jane Smith' age={25} isActive={false} />
  ```
  **Notice that** we use tags **rather than** function calling directly, like `UserCard()`. [React](https://react.dev/) **manages** component rendering.
  - `name='Jane Smith'` passes a string.
  - `age={25}` passes a number.
  - `isActive={false}` passes a boolean.

### State: Data That Changes
- While **props** allow a component receive data, **state allows** a component to **manage data** that changes over time.
- [React](https://react.dev/) provides a **Hook** called `useState` for **managing state** in a function component.
- The `useState` Hook **return an array** containing the current state and a setter function. *For example,*

  ```ts
  const [count, setCount] = useState(10);
  ```
  Calling `setCount` tells [React](https://react.dev/) that the state has changed and that the component needs to render again.
- **Pass a direct value** when the new state is **independent of** the previous state, but **use an updater function** when the next state **depends on** the current state: *For example,*

  ```ts
  <button
    type="button"
    className="btn-reset"
    onClick={() => setCount(initVal)}
  >
    Reset
  </button>

  <button
    type="button"
    className="btn-primary"
    onClick={() => setCount(count => count + 1)}
  >
    + Increase
  </button>
  ```
- **Important:** do **not** modify state **directly,** always use the setter function.

### Props vs. State
- This is **one of the most** important distinctions in [React](https://react.dev/).

  | Props                                                    | State                                                       |
  |----------------------------------------------------------|-------------------------------------------------------------|
  | **Passed into** a component                              | **Managed by** the component using a Hook such as `useState`    |
  | Used to **configure a component**                        | Used to **store changing data**                                 |
  | **Read-only** from the receiving component's perspective | **Updated** using a state setter                                |
  | Can **be passed** from parent to child                   | Can **change in response** to user interactions or other events |
- *For example,* consider the following `Counter` **component** and **its parent** `App`.

  ```ts
  type CounterProps = {
    initVal: number;
  }

  function Counter({ initVal }: CounterProps) {
    const [count, setCount] = useState(initVal);

    return (
      <div className="counter-widget">
        <p className="counter">
          Counter is <span>{count}</span>
        </p>

        <div className="button-group">
          <button
            type="button"
            className="btn-primary"
            onClick={() => setCount(count => count - 1)}
          >
            - Decrease
          </button>

          <button
            type="button"
            className="btn-reset"
            onClick={() => setCount(initVal)}
          >
            Reset
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={() => setCount(count => count + 1)}
          >
            + Increase
          </button>
        </div>
      </div>
    )
  }

  function App() {
    return (
      <main className="app">
        <section className="counter-section">
          <h1 className="app-title">The First React App</h1>
          <Counter initVal={5} />
        </section>
      </main>
    )
  }
  ```
  - `initVal` in `<Counter initVal={5} />` is a **prop** supplied by the `App` component to its child `Counter`.
  - `count` in `const [count, setCount] = useState(initVal);` is **state** managed by the `Counter` component.
  - Clicking on buttons **updates** the `count` state, **not** the `initVal` prop.


## Lists and Events

### Handling Events
- `onClick` is a [React](https://react.dev/) **event handler.** It tells [React](https://react.dev/) what **function to execute when** the user clicks the button. *For example:*

  ```ts
  <button
    type="button"
    className="btn-primary"
    onClick={() => setCount(count => count + 1)}
  >
    + Increase
  </button>
  ```
- **Important:**
  - The **event name** is written in **camelCase:** `onClick`.
  - Pass a **function reference** rather than a function call or string: `onClick={increase}`, **not** `onClick="increase"` or `onClick={increase()}`.
  - **Use arrow function** to pass an argument. The arrow function **delays the call** until the click happens.

    ```ts
    onClick={() => setCount(count => count + 1)}
    ```

### Rendering a List
- In **ordinary JavaScript,** we could interate over the array using a `for` loop or `.map()`. **In React,** `.map()` is a **common way** to transform each item into a UI element.

  ```ts
  function App() {
    const users = [
      { id: 1, name: 'John Doe', isActive: true },
      { id: 2, name: 'Jane Smith', age: 25, isActive: false },
      { id: 3, name: 'Alex Martin', age: 35, isActive: true },
    ];

    return (
      <main className="app">
        <section className="users-section">
          <h2 className="section-title">User List</h2>

          <ul className="users-list">
            {users.map(user => (
              <li key={user.id} className="user-row">
                <span className="user-name">{user.name}</span>
                {user.age !== undefined
                  ? <span className="user-age">Age: {user.age}</span>
                  : <span />
                }
                <span
                  className={ user.isActive ? 'status-active' : 'status-inactive' }
                >
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    )
  }
  ```
  - `users.map(...)` iterates over the array **and returns** a new array.
  - `user => (...)` is an **arrow function** that returns a JSX element for each user.
  - `key={user.id}` gives [React](https://react.dev/) a **stable identifier for** each list item.
- The `key` prop helps [React](https://react.dev/) **identify which item** has been added, removed, or moved **when** a list changes.
- The `key` **is special** [React](https://react.dev/) metatdata. Components **don't** receive it as ordinary prop. **If** the child needs the ID, **pass it separately.**
- **Rules** for keys:
  - **Use** a stable, unique ID **whenever** possible.
  - **Don't use** random values that change on every render.
  - **Avoid using** the array index as a key when items can be added, removed, or reordered.

## Building an Interactive User List

In this section, we'll **combine** state management, event handlers, and Array `.map()` **to build** an interactive user management feature:
- **removing** existing users from the user list and
- **adding** new users to it.

Define the `User` type and initialize the `users` state as follow:

```ts
type User = {
  id: number;
  name: string;
  age?: number;
  isActive: boolean;
}

const [users, setUsers] = useState<User[]>([
  { id: 1, name: 'John Doe', age: 30, isActive: true },
  { id: 2, name: 'Jane Smith', age: 25, isActive: false },
  { id: 3, name: 'Alex Martin', age: 35, isActive: true },
]);
```

### Removing Existing Users
- Create a `UserItem` component **to represent** each entry in the user list. It accepts **two props:**
  - `user`: A `User` object **containing** the user's detail.
  - `onDelete`: A callback function **triggered to delete** the current user.

  ```ts
  type UserItemProps = {
    user: User;
    onDelete: (id: number) => void;
  };

  function UserItem({ user, onDelete }: UserItemProps) {
    return (
      <li className="user-row">
        <span className="user-name">{user.name}</span>
        <span className="user-age">
          {user.age !== undefined
            ? <span className="user-age">Age: {user.age}</span>
            : <span />
          }
        </span>
        <span
          className={user.isActive ? 'status-active' : 'status-inactive'}
        >
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
        <button
          type="button"
          className="btn-delete"
          onClick={() => onDelete(user.id)}
          aria-label={`Delete ${user.name}`}
        >
          Delete
        </button>
      </li>
    )
  };
  ```
- Then, create a `UserList` component **to render** the collection of users. It accepts **two props:**
  - `users`: An array of `User` objects (`User[]`) **representing** the user list.
  - `onDelete`: A callback function **triggered to delete** a user by ID.

  ```ts
  type UserListProps = {
    users: User[];
    onDelete: (id: number) => void;
  }

  function UserList({ users, onDelete }: UserListProps) {
    return (
      <ul className="users-list">
        {users.map(
          user => <UserItem key={user.id} user={user} onDelete={onDelete} />
        )}
      </ul>
    )
  };
  ```
- Finally, **define** the `handleDeleteUser` handler to remove a user by ID and **render** the `UserList` component **inside** the main application view.

  ```ts
  function handleDeleteUser(id: number) {
    setUsers(users.filter(user => user.id !== id));
  }

  <section className="users-section">
    <h2 className="section-title">User List</h2>
    <p className="users-total">
      Total users: <span>{users.length}</span>
    </p>
    <UserList users={users} onDelete={handleDeleteUser} />
  </section>
  ```
  The `Array.prototype.filter()` method returns a **new array containing** every user whose ID does not match the target ID, leaving the original array unmutated.

### Adding New Users
- Create an `AddUserForm` component **to render** the **user creation form** in the main application view. It **accepts** an `onAdd` callback prop **to capture input** and **submit** new user details to `App`.

  ```ts
  type UserDataRequest = Omit<User, 'id'>;

  type AddUserFormProps = {
    onAdd: (userData: UserDataRequest) => void;
  }

  function AddUserForm({ onAdd }: AddUserFormProps) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [isActive, setIsActive] = useState(true);

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
      // handle submit new user details
    }

    return (
      <form className="add-user-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="user-name">Name</label>
          <input
            id="user-name"
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={event => setName(event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="user-age">Age (optional)</label>
          <input
            id="user-age"
            type="number"
            min="0"
            step="1"
            placeholder="Enter age (optional)"
            value={age}
            onChange={event => setAge(event.target.value)}
          />
        </div>

        <div className="form-field status-field">
          <label htmlFor="user-status">Status</label>
          <div className="status-options">
            <label className="status-option">
              <input
                type="radio"
                name="user-status"
                value="active"
                checked={isActive}
                onChange={() => setIsActive(true)}
              />
              Active
            </label>

            <label className="status-option">
              <input
                type="radio"
                name="user-status"
                value="inactive"
                checked={!isActive}
                onChange={() => setIsActive(false)}
              />
              Inactive
            </label>
          </div>
        </div>

        <button type="submit" className="btn-add">
          + Add User
        </button>
      </form>
    )
  }
  ```
  - The `onAdd` callback prop is a function that **accepts** a `UserDataRequest` object to create a new user.
  - The `onChange={event => setName(event.target.value)}` **handle updates** the `name` state on every keystroke, **ensuring** React remains the single source of truth for the input's displayed value.
- The `handleSubmit` function **validates** user input **before passing** it to the `onAdd` callback. It executes the following **five steps:**
  - **Prevents** default submission: calls `event.preventDefault()` to stop full page reloads.
  - **Extracts** input values: retrieves user details from component state or form field.
  - **Validates** user data: ensures required fields are present and correctly formatted.
  - **Invokes** callback: constructs a `UserDataRequest` payload and forwards it to `onAdd`.
  - **Resets** form state: clears input fields back to their initial values.

  ```ts
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    // retrieves user details
    const trimmedName = name.trim();
    const parsedAge = age.trim() === '' ? undefined : Number(age);

    // validates user data
    if (!trimmedName) {
      alert('Error: Name cannot be empty!');
      setName('');
      return;
    }
    if (
      parsedAge !== undefined &&
      (!Number.isInteger(parsedAge) || parsedAge < 0)
    ) {
      alert('Error: Age must be a non-negative number!')
      setAge('');
      return;
    }

    // constructs a payload and forwards it
    const userData = {
      name: trimmedName,
      ...(parsedAge !== undefined && { age: parsedAge }),
      isActive
    }
    onAdd(userData);

    // resets form state
    setName('');
    setAge('');
    setIsActive(true);
  }
  ```
- **Implement** the `handleAddUser` handler **to append** a new user to the `users` state array.
  ```ts
  const [nextId, setNextId] = useState(users.length + 1);

  function handleAddUser(userData: UserDataRequest) {
    const newUser = { id: nextId, ...userData };
    setUsers(users => [...users, newUser]);
    setNextId(nextId => nextId + 1);
  };
  ```
  The spread syntax `...users` copies the existing elements into a new array, and we append the new user.
- **Render** the user creation form in the main application view.
  ```ts
  <section className="add-user-section">
    <h2 className="section-title">Add User</h2>
    <AddUserForm onAdd={handleAddUser} />
  </section>
  ```

### Organizing Components into Files
- As an application grows, keeping **all components in** `App.tsx` becomes **unmaintainable.**
- To **improve readability** and code organization, **extract types and components** into dedicated files and import them into `App.tsx` as needed. The project might look like this.

  ```text
  src/
  ├── App.css
  ├── App.tsx
  ├── assets/
  ├── components/
  │   ├── AddUserForm.tsx
  │   ├── Counter.tsx
  │   ├── UserCard.tsx
  │   └── UserList.tsx
  ├── index.css
  ├── main.tsx
  └── types/
      └── user.ts
  ```
  - `types/user.ts` **exports** shared domain types (`User`, `UserDataRequest`).
  - `components/AddUserForm.tsx` **defines** `AddUserFormProps` and **exports** the `AddUserForm` component.
  - `components/Counter.tsx` **defines** `CounterProps` and **exports** the `Counter` component.
  - `components/UserCard.tsx` **defines** `UserCardProps`, `UserCardGridProps`, and the internal `UserCardProps` subcomponent; **exports** only the`UserCardGrid` component.
  - `components/UserList.tsx` **defines** `UserItemProps`, `UserListProps` and the internal `UserItem` subcomponent; **exports** only the `UserList` component.

## `useEffect` and API Calls
- Applications often need to interact with external systems to:
  - fetch data from a backend API.
  - subscribe to updates from a server.
  - start or clean up a timer.
  - synchronize with a browser API.
- [React](https://react.dev/) provides the `useEffect` hook to synchronize a component with an external system. The basic syntax as follow:

  ```ts
  useEffect(effectFunction, [dependencies]);
  ```
  - The **effect function** contains the synchronization logic and may **optionally** return a **cleanup function** to *realse resources*, *unsubscribe* from listeners, or *abort pending requests*.
  - The **dependency array** is an optional array of **reactive values** that determines when [React](https://react.dev/) re-executes the effect again.
- The dependency array **controls** when an effect runs:
  - **no dependency array** `useEffect(effectFunction)`: runs **after** the initial mount **and after every** subsequent render.
  - **empty dependency array** `useEffect(effectFunction, []);`: runs **only once** after the component mounts.
  - **with reactive values** `useEffect(effectFunction, [dep_1, dep_2]);`: runs **after** the initial mount and **re-runs whenever any** specified dependency changes between renders.
- **Important:** when a specified dependency changes, [React](https://react.dev/) runs the **previous** render's **cleanup function** (*if defined*) **before** executing the effect again.

### Fetch Data from API

In this section, we will use `useEffect` hook to **fetch data** from the `https://jsonplaceholder.typicode.com/users` endpoint **and populate** an API User Cards component.

- **Define** the `ApiUser` type in `types/user.tsx`.

  ```ts
  export type ApiUser = {
    id: number;
    name: string;
    email: string;
    city: string;
    company: string;
  }
  ```
- **Create** an `ApiUserCard` component **inside** `components/ApiUserCard.tsx` to **render an individual** user card.

  ```ts
  type ApiUserCardProps = Omit<ApiUser, 'id'>;

  function ApiUserCard({ name, email, city, company }: ApiUserCardProps) {
    return (
      <article className="user-card">
        <h3>{name}</h3>
        <p className="user-email">{email}</p>
        <p>
          <span className="field-label">City:</span> {city}
        </p>
        <p>
          <span className="field-label">Company:</span> {company}
        </p>
      </article>
    );
  }
  ```
- **Implement** `ApiUserCardGrid` component inside `components/ApiUserCard.tsx` to **render user card grid.**

  **Define** a `useEffect` hook **within** this component **to fetch** users on mount **and populate** child `ApiUserCard` components.

  ```ts
  export function ApiUserCardGrid() {
    const [users, setUsers] = useState<ApiUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    function effectCallback() {
      // fetch user data and update the user state
    }

    useEffect(effectCallback, []); // run only once when the component mounts

    if (loading) {
      return (
        <div className="user-card-grid">
          <div className="loading-message">
            <span className="spinner" aria-hidden="true"></span>
            <p>Loading users...</p>
          </div>
        </div>
      );
    }

    if (error !== null) {
      return (
        <div className="user-card-grid">
          <p className="error-message">Error: {error}</p>
        </div>
      );
    }

    return (
      <div className="user-card-grid">
        {users.map((user) => (
          <ApiUserCard
            key={user.id}
            name={user.name}
            email={user.email}
            city={user.city}
            company={user.company}
          />
        ))}
      </div>
    );
  }
  ```
  - `users` **holds** the list of `ApiUser` records fetched from the API.
  - `loading`: a boolean **flag** indicating whether the network request is currently pending.
  - `error`: **stores** an error message if the request fails, or `null` when there are no errors.
- **Implement** the `useEffect` setup function `effectCallback`.

  Inside, **declare and invoke** an asynchronous `loadUsers` function to **fetch** user data from the API endpoint **and update** the `users` state.

  An internal `async` function **is required** because `useEffect` callbacks **must remain synchronous** and cannot return a `Promise`.

  ```ts
  function effectCallback() {
    const apiURL = 'https://jsonplaceholder.typicode.com/users';

    async function loadUsers() {
      try {
        setUsers(await fetchUsers(apiURL));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }
  ```
- **Outside** the `ApiUserCardGrid` component definition, **implement** the `fetchUsers` utility to **handle** the network request, **returning** the parsed user data records from the API endpoint **or throwing** an error if the request fails.

  ```ts
  type UserApiResponse = {
    id: number;
    name: string;
    email: string;
    address: {
      city: string;
    };
    company: {
      name: string;
    };
  };


  function delay(second: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, second * 1000));
  }

  async function fetchUsers(apiURL: string): Promise<ApiUser[]> {
    const latency = 3; // seconds
    await delay(latency); // simulate network latency
    const response = await fetch(apiURL, { signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}, API URL: ${response.url}`);
    }

    const responseUsers: UserApiResponse[] = await response.json();
    return responseUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email.toLowerCase(),
      city: user.address.city,
      company: user.company.name,
    }));
  }
  ```
- Finally, **import and render** the `ApiUserCardGrid` component **inside** `App.tsx`.

  ```ts
  const apiURL = 'https://jsonplaceholder.typicode.com/users';

  <section className="cards-section">
    <h2 className="section-title">API User Cards</h2>
    <p className="api-url">
      <a href={apiURL} target="_blank" rel="noopener noreferrer">
        {apiURL}
      </a>
    </p>
    <ApiUserCardGrid />
  </section>
  ```
- The complete **sequence of events** is as follow:
  1. Mount: `ApiUserCardGrid` **mounts and renders** initial loading markup: `users=[], loading=true, error=null`.
  2. Effect execution: [React](https://react.dev/) **triggers** the `useEffect` hook **and invokes** the internal `loadUsers` helper.
  3. API request: `fetchUsers` **executes** the HTTP request against the API endpoint.
  4. State commit: returned data **populates** the `users` state array, **or sets** `error` on failure.
  5. Final render: `loading` **toggles** to `false`, and [React](https://react.dev/) **renders** the populated `ApiUserCard` components.

  ```mermaid
  block
    classDef default fill:#ECECFF, stroke:#9370DB;
    columns 1

    Mount
    space
    EffectExecution["Effect Execution"]
    space
    APIRequest["API Request"]
    space
    StateCommit["State Commit"]
    space
    FinalRender["Final Render"]

    Mount --> EffectExecution
    EffectExecution --> APIRequest
    APIRequest --> StateCommit
    StateCommit --> FinalRender
  ```

### Refetch Data on Endpoint Changes

In this section, we will **update** the `ApiUserCardGrid` and its `useEffect` hook to **refetch data** whenever the API endpoint prop changes.
- **Update** `ApiUserCardGrid` component to accept an `endpoint` prop.

  ```ts
  export function ApiUserCardGrid({ endpoint }: { endpoint: string }) {
    // ...
  }
  ```
- **Update** the `useEffect` hook to **re-run** whenever the `endpoint` changes **by including** it in the dependency array.

  ```ts
  useEffect(effectCallback, [endpoint]);
  ```
- **Update** the `useEffect` setup function **to return** a cleanup function.

  This cleanup **invokes** `controller.abort()` to **cancel any in-flight request** if the component unmounts or if `endpoint` changes **before** the request completes.

  ```ts
  function effectCallback() {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);
        setUsers(await fetchUsers(endpoint, controller.signal));
      } catch (err) {
        if (controller.signal.aborted) { return; }
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        if (!controller.signal.aborted) { setLoading(false); }
      }
    }

    loadUsers();

    // return cleanup function
    return () => {
      controller.abort();
    };
  }
  ```
- **Update** the `fetchUsers` function to **accept** an optional `AbortSignal`. *If provided*, **forward** this signal to the native `fetch` call.

  ```ts
  async function fetchUsers(endpoint: string, signal?: AbortSignal): Promise<ApiUser[]> {
    await delay(3); // simulate network latency (3 seconds)
    const response = await fetch(endpoint, { signal });
    // ...
  }
  ```
  - **Optional Parameter** `signal?: AbortSignal` allows callers to invoke `fetchUsers(endpoint)` without a signal when cancellation is unnecessary.
  - **Native Pass-Through** forwards `{ signal }` in to the `fetch` API, enabling automatic request termination upon `controller.abort()`.
- Finally, **update** the `ApiUserCardGrid` component instance inside `App.tsx` **to pass** the required `endpoint` prop.

  ```ts
  <ApiUserCardGrid endpoint={apiURL} />
  ```