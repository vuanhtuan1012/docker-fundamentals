# Introduction to TypeScript  <!-- omit in toc -->

[TypeScript](https://www.typescriptlang.org/) is a **free, open-source** programming language **developed by** Microsoft that act as a **strongly typed syntactical superset** of JavaScript. This means any valid JavaScript code is also valid TypeScript code.

[TypeScript](https://www.typescriptlang.org/) **adds** static type definitions to JavaScript, allowing developers to **catch errors** early in their editor **before** running the code.

- [Key Features](#key-features)
- [Compilation vs. Transpilation](#compilation-vs-transpilation)
- [Write and Run The First TypeScript Program](#write-and-run-the-first-typescript-program)
- [Command-line Tools](#command-line-tools)
- [TypeScript Configuration File](#typescript-configuration-file)
- [CommonJS vs. ES Modules](#commonjs-vs-es-modules)
- [TypeScript Fundamentals](#typescript-fundamentals)
  - [Basic Types](#basic-types)
  - [Functions and Types](#functions-and-types)
  - [Objects and Interfaces](#objects-and-interfaces)
  - [Union Types](#union-types)
- [Arrays, Type Aliases, and Geqnerics](#arrays-type-aliases-and-geqnerics)
  - [Arrays](#arrays)
  - [Type Aliases](#type-aliases)
- [Build a TypeScript REST API](#build-a-typescript-rest-api)
  - [Create the Project](#create-the-project)
  - [Define Data Model](#define-data-model)
  - [Build the Express Application](#build-the-express-application)

## Key Features
- **Static Type Checking:** JavaScript is dynamically typed, meaning variable types are checked at runtime. **TypeScript checks** types **at compile** time, catching bugs like typos or unindented type coercion **before deployment.**
- **Type Inference:** TypeScript can infer the shape of data based on how it's initialized.
- **Transpilation:** Browser and [Node.js](https://nodejs.org/) don't execute TypeScript directly. The TypeScript Compiler (`tsc`) transpiles `.ts` files down to standard JavaScript `.js` that can run anywhere.

| Feature             | JavasSript                      | TypeScript                                   |
|---------------------|---------------------------------|----------------------------------------------|
| *Type System*       | Dynamic (*checked at runtime*)  | Static (*checked at compile time*)           |
| *Execution*         | Directly by browsers / runtimes | Transpiled into JavaScript first             |
| *Primary Advantage* | Flexibility, quick prototyping  | Scalability, code quality, developer tooling |
| *Best For*          | Small scripts, web prototypes   | Medium to large applications, team codebases |

## Compilation vs. Transpilation
- **Compilation** is the process of **translating** code written **in a high-level**, human-readable programmming language (like *C*, *Rust*, *Go*, *etc.,*) **into a low-level**, machine-readable language (like *machine code*, *assembly*, or *bytecode*).
  - **Goal:** **convert code** into a format that a **computer's CPU** or a virtual machine (like JVM or V8) **can directly execute.**
  - **Analogy:** translating a complex **English novel** into binary **Morse code.**
- **Transpilation** (short for *source-to-source compilation*) is a specific **subset of compilation** where code written in one programming language is **translated into another language** at a **similar level of abstraction.**
  - **Goal:** transform source code into another equivalent source code format, often to target broader runtime compability or adopt new features.
  - **Analogy:** translating an **English novel** into **Spanish.** Both are human languages operating at the **same structural level.**

## Write and Run The First TypeScript Program
Suppose that [Node.js](https://nodejs.org/) is installed.
1. **Initialize** the project directory

   ```bash
   mkdir ts-project
   cd ts-project
   npm init -y
   ```
2. **Install TypeScript** and execution tools

   ```bash
   npm install -D typescript tsx
   ```
   This command **installs** TypeScript and `tsx` (a fast **TypeScript execution tool** for [Node.js](https://nodejs.org/)) as **development dependencies.**
3. **Initialize TypeScript** configuration

   ```bash
   npx tsc --init
   ```
   This command **generates** the **default** `tsconfig.json` **configuration file** in the project directory, **which defines** compiler options.
   - `npx`: Node Package Exectuable.
   - `tsc`: TypeScript Complier
4. **Write** the first TypeScript code

   Create a file named `index.ts` and add the following code:

    ```ts
    interface User {
      id: number;
      name: string;
      email: string;
      isActive: boolean;
    }

    function welcomeUser(user: User): string {
      if (user.isActive) {
        return `Welcome back, ${user.name}!`;
      } else {
        return `Hello, ${user.name}. Please activate your account.`;
      }
    }

    const currentUser: User = {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      isActive: true
    };

    console.log(welcomeUser(currentUser));
    ```
5. **Run** the TypeScript script

   **Execute** the file **directly** using `tsx`.
   ```bash
   npx tsx index.ts
   ```
   - `npx`: Node Package Exectuable.
   - `tsx`: TypeScript Execute
6. **Transpile** to standard Javascript
   - **Transpile** the file **using the TypeScript compiler.**

      ```bash
      npx tsc
      ```
      - `npx`: Node Package Exectuable.
      - `tsc`: TypeScript Complier
   - **Run** the transpiled Javascript file **with standard** [Node.js](https://nodejs.org/).

      ```bash
      node index.js
      ```

## Command-line Tools

Node Package Executable (`npx`), TypeScript Compiler (`tsc`), and TypeScript Executable (`tsx`) are three command-line tools we **frequently use** when working in JavaSript and TypeScript environments.
1. **Node Package Executable** `npx` is a package runner tool that comes bundled automatically with `npm` (from version 5.2+).
   - **What it does:** it lets us **execute** `npm` packages or CLI binaries **without having to** permanently install them globally on our machine.
   - **Why use it:**
     - **Run single-use** commands like `npx create-react-app my-app`.
     - **Run locally** installed project packages without typing full `node_modules` paths.
   - **Analogy:** it's like **streaming a movie** on-demand rather than buying the DVD.
2. **TypeScript Compiler** `tsc` is the **official TypeScript compiler** provided by Microsoft.
   - **What it does:** it **reads** TypeScript code `.ts`, **performs** static type checking, and **transpiles** it into plain JavaScript code `.js` **that** [Node.js](https://nodejs.org/) or web browsers can execute.
   - **How it works:** it **generates** output JavaScript files **alongside** TypeScript files, **or into** a build folder like `dist/`.
   - **Common usages:**
     - **Create** a default `tsconfig.json` **configuration file:** `npx tsc --init`.
     - **Compiles** the **entire** TypeScript **project** according to `tsconfig.json`: `npx tsc`.
3. **TypeScript Execute** `tsx` is a lightweight, high-performance CLI tool (powered by `esbuild`) used **to execute** TypeScript files **directly** in [Node.js](https://nodejs.org/).
   - **What it does:** it **compiles** TypeScript files **on-the-fly** in memory and **runs** them instantly using [Node.js](https://nodejs.org/), **without** generating `.js` output files on disk.
   - **Why use it:** during development, **transpiling** to disk with `tsc` first and **then running** with `node` **is slow.** `tsx` **combines** these steps **into one** super fasts command.
   - **Key feature:** it **supports** modern ES modules, CommonJS, and hot-reloading out of the box.

## TypeScript Configuration File
The TypeScript configuration file `tsconfig.json` **serves two primary purposes** in a TypeScript project:
- **Marks the project roots:** it **indicates** that the directory where the file resides is **the root of** a TypeScript project.
- **Configures the compiler:** it **specifies** the **compiler options** (`compilerOptions`), target **JavaScript versions,** and file **include/exclude patterns** for the TypeScript compiler `tsc`.

**Core roles** of `tsconfig.json`:
1. **Specifying output** JavaScript: TypeScript code must be converted to JavaScript to run. `tsconfig.json` **tells the compiler** (in fact, transpiler) **how to shape** that output:
   - `target`: **defines** which **version of JavaScript** the compiler outputs (e.g., `es2022`, `es6`, `esnext`). Older targets transpile modern syntax down to remain compatible with older browsers/Node versions.
   - `module`: **defines** the **module system used** in the output JavaScript (e.g., `nodenext`, `commonjs`, `esnext`).
2. **Enabling** type-checking rigor: **controlling how** strictly TypeScript enforces typing:
   - `strict: true`: **enforces** a suite of **type-checking safety rules** (like preventing `null` or `undefined` assignments and requiring explicit function return types).
   - `noImplicitAny: true`: **flags** an error **whenever** TypeScript **cannot infer** a variable's type and defaults it to `any`.
3. **Controlling** file resolution and path: **configures how** module imports are resolved and where built files go:
   - `rootDir`: **specifies** the **source folder** containing TypeScript files (e.g., `./src`).
   - `outDir`: **specifies** the **output directory** for generated `.js` files (e.g., `./dist` or `./build`).
   - `paths`: **creates path aliases** (e.g., mapping `@components/*` to `src/components/*`) to avoid relative path headaches like `../../components`.
4. **Selecting** which files to include/exclude: **defines file boundaries:**
   - `include`: array of glob patterns **specifying files to compile** (e.g., `["src/**/*"]`).
   - `exclude`: **files/folders to skip** during compilation (e.g., `["node_modules", "dist"]`).

## CommonJS vs. ES Modules
- **CommonJS (CJS)** is the **traditional module system** originally created for [Node.js](https://nodejs.org/) back in 2009.
  - **Syntax:** uses `require()` to import and `module.exports` or `exports` to export.
  - **Loading Mechanism:** dynamic and **synchronous.** Modules are **loaded and executed sequentially** as the code runs.
  - **Primary Use:** older [Node.js](https://nodejs.org/) backends and **legacy** `npm` packages.
- **ES Modules (ESM)** is the **official, standardized module system** introduced in ECMAScript 2015 (ES6) for standardizing modules across both web browsers and [Node.js](https://nodejs.org/).
  - **Syntax:** uses `import` and `export` statements.
  - **Loading Mechanism:** static and **asynchronous.** Imports are **analyzed at compile time** before any code executes, enabling modern optimization like `tree-shaking` (removing unused code).
  - Primary Use: modern web development, modern [Node.js](https://nodejs.org/), and **current** `npm` packages.

## TypeScript Fundamentals

### Basic Types
Here are the **types** that we **often use:**

| TypeScript Type | Meaning                       | Example                    |
|-----------------|-------------------------------|----------------------------|
| `string`        | Text                          | `"hello world"`            |
| `number`        | Numbers, *including decimals* | `42`, `3.14`               |
| `boolean`       | `true` or `false`             | `true`                     |
| `string[]`      | Array of strings              | `["TypeScript", "Python"]` |
| `number[]`      | Array of numbers              | `[42, 3.14]`               |

We can **explicitly decalre** a variable's type:

```ts
let msg: string = "Hello World!";
let pi: number = 3.14;
```

TypeScript can often **infer the type automatically:**

```ts
let msg = "Hello World!"; // inferred as string
let pi = 3.14; // inferred as numbers

msg = "TypeScript Fundamentals"; // OK
pi = "3.14"; // Error
```

**Type inference** means TypeScript **determines** the type **from** the initial value, so we **don't need** to annotate every variable.

### Functions and Types
- **Function declaration:** the **standard way** to define a function using the `function` keyword. *For example:*

  ```ts
  function add(a: number, b: number): number {
    return a + b;
  }

  console.log(add(1, 2)); // 3
  ```
  - `a: number` **declares** the **first argument** must be a number.
  - `b: number` **declares** the **second argument** must be a number.
  - `: number` (after `)`) **declares** the **return value** must be number.

  We can also **define** functions that **return nothing** by using `void`. *For example:*

  ```ts
  function logMessage(msg: string): void {
    console.log(msg);
  }
  ```
- **Arrow function:** use the `=>` syntax. It is the **most common approach** in modern code bases. *For example:*

  ```ts
  const multiply = (a: number, b:number): number => {
    return a * b;
  }

  console.log(multiply(1, 2)); // 2
  ```
- **Function expression:** assigning an anonymous function directly to a variable. *For example:*

  ```ts
  const subtract = function(a: number, b:number): number {
    return a - b;
  }

  console.log(subtract(1, 2)); // -1
  ```
- **Optional parameters:** a parameter optional is specified by using `?`. An optional parameter **must come after** required parameters. *For example:*

  ```ts
  function greet(name: string, title?: string): string {
    if (title) {
      return `Hello, ${title}${name}`;
    }

    return `Hello, ${name}`;
  }

  console.log(greet("Alice")); // "Hello, Alice"
  console.log(greet("Bob", "Dr.")); // "Hello, Dr.Bob"
  ```

### Objects and Interfaces
- An objects is described by using `interface`. Then use it to type a variable. *For example:*

  ```ts
  interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
  }

  const alice: User = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    isActive: true
  }
  ```
- Use `?` to specify that a property may be absent. *For example:*

  ```ts
  interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    nickname?: string;
  }

  const bob: User = {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    isActive: false
  }
  ```

### Union Types
Sometimes a value can legitimately **have more than one** type. The `|` symbol is used to specify that. *For example:*

```ts
function formatId(id: number | string): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  }

  return id.toFixed(0);
}

console.log(formatId("abc")); // "ABC"
console.log(formatId(1.5)); // 2
```

## Arrays, Type Aliases, and Geqnerics

### Arrays
- We use `[]` or the generic array syntax `Array<TypeName>` to declare an array. *For example:*

  ```ts
  const scores: number[] = [85, 90, 95];
  const users: Array<User> = [
    { id: 1, name: "Alice", email: "alice@example.com", isActive: true },
    { id: 2, name: "Bob", email: "bob@example.com", isActive: false }
  ]
  ```
- For most **everyday code,** `User[]` and `Array<User>` mean the same thing. `User[]` **is recommended** for simple arrays since it's concise.

### Type Aliases
- A type alias **gives a name to a type,** which can be an object, a primitive, a union, or something more complex. *For example:*

  ```ts
  type UserId = number;

  let userId: UserId = 42; // OK
  userId = "42"; // Error
  ```
- We can **describe an object** using either `interface` or `type`. *For example:*

  ```ts
  interface User {
    id: number;
    name: string;
  }
  ```
  Equivalent object type alias:

  ```ts
  type User = {
    id: number;
    name: string;
  }
  ```
  Both work for many common object definition. One **distinction is:**
  - interfaces **can be extended and declaration-merged,** while
  - type aliases can **represent more kinds of types,** such as unions and intersection.
- **Union types** is where **aliases** become **especially useful.** *For example:*

  ```ts
  type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

  function logRequest(method: HttpMethod): void {
    console.log(method);
  }

  logRequest("GET"); // OK
  logRequest("PATCH"); // Error
  ```
- Sometimes an object needs to **satisfy two type definitions at once.** TypeScript **use** `&` for this, called an **intersection type.** *For example:*

  ```ts
  type Person = {
    name: string;
    age: number;
  }

  type Employee = {
    employeeId: number;
    department: string;
  }

  type CompanyEmployee = Person & Employee;
  ```
  Now `CompanyEmployee` **must have all** four properties. *For example:*

  ```ts
  const alice: CompanyEmployee = {
    name: "Alice",
    age: 30,
    employeeId: 1001,
    department: "Engineering"
  }
  ```
- **Generics** is one of the most **important TypeScript feature.** A generic allows us to **write reusable code** while **preserving information** about **the types it receives.**

  Imagine a function that returns the first element of an array. This works for strings, numbers, and objects. But **without type information,** TypeScript **cannot reliably know** the return type **when** the **input type is not defined.** We could **write separate functions** for each type, but that **would duplicate code.** Generics solve this problem. *For example:*

  ```ts
  function first<T>(items: T[]): T | undefined {
    return items[0];
  }

  console.log(first(["alice", "bob", "charlie"])); // "alice"
  console.log(first([25, 30, 35])); // 25
  console.log(first([])); // undefined
  ```
  - `<T>` **declares** a type parameter named `T`.
  - `items: T[]` **means** the function accepts an array of `T` elements.
  - `: T` **means** the return type is `T`.

  `T` is **a placeholder for** a type that TypeScript **determines when** the function is called.

## Build a TypeScript REST API
In this project, we create a **user management API** using [TypeScript](https://www.typescriptlang.org/) and [Express](https://expressjs.com/).
- The application contains **six endpoints:**
  - `GET /`: returns a welcome message.
  - `GET /users`: retrieve all users.
  - `GET /users/:id`: retrieve one users.
  - `POST /users`: create a user.
  - `PUT /users/:id`: update a user.
  - `DELETE /users/:id`: delete a user.
- The **user model** contains three fields (`id`, `name`, `email`) and relies on an **in-memory database** for simplicity.
- The application defaults to **listening on port** `3000`.

### Create the Project
- **Create** a new project.

  ```bash
  mkdir ts-users-api
  cd ts-users-api
  npm init -y
  ```
- **Install** Express and TypeScript.

  ```bash
  npm install express
  npm install -D typescript tsx @types/node @types/express
  ```
  - `@types/node`: TypeScript **definitions for** Express. It **provides** TypeScript **type definitions for** [Node.js](https://nodejs.org/) built-in APIs. It **lets** TypeScript **understand** functions, objects, and modules such as `process`, `Buffer`, and `node:fs`.
  - `@types/express`: TypeScript **definitions for** [Node.js](https://nodejs.org/) APIs. It **allows** TypeScript to **understand types** such as `Request`, `Response`, and `NextFunction`.
- **Create** a TypeScript **configuration.**

  ```bash
  npx tsc --init
  ```
  Update these values in the file `tsconfig.json` created file.
  ```json
  // File Layout
  "rootDir": "./src",
  "outDir": "./dist",

  // Other Outputs
  "sourceMap": false,
  "declaration": false,
  "declarationMap": false,
  ```
- **Configure** `package.json`: **add** `build`, `start`, `dev` commands to the `scripts` fields **and set** `type` to `module` **to allow** `import` / `export` syntax.

  ```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc",
    "start": "node dist/app.js",
    "dev": "tsx watch src/app.ts"
  },
  "type": "module",
  ```
- **Create** the `src` **directory** and the `src/app.ts` file **inside** it. The **project structure** will be:

  ```text
  ts-users-api/
  ├── src/
  │   └── app.ts
  ├── package.json
  ├── package-lock.json
  └── tsconfig.json
  ```

### Define Data Model
Before defining routes, we **specify the user data model** in `src/models.ts`.

```ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserDataRequest = Omit<User, 'id'>;
```
- `export` **makes** a type **available to** other files.
- `Omit<User, 'id'>` **creates** a type containing **all properties** of `User` **except** `id`. This is **ideal for request bodies** where the `id` is generated by the server.

### Build the Express Application
The application code is located in `src/app.ts`.

- We **first initialize** the Express application, **set** the default port, and **configure** in-memory storage.

  ```ts
  import express from 'express';
  import type { Request, Response } from 'express';
  import type { User, UserDataRequest } from './models.js';

  const app = express();
  const port = process.env.PORT || 3000;

  // Middleware to parse JSON request bodies
  app.use(express.json());

  // In-memory storage for users
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
  ];
  let nextId = users.length + 1;
  ```
- We then **define three first** endpoints.

  ```ts
  app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'Welcome to the TypeScript Users API!' });
  });

  app.get('/users', (_req: Request, res: Response) => {
    res.json(users);
  });

  app.get(
    '/users/:id',
    validateUserId,
    (req: Request<{ id: string }>, res: Response) => {
      const userId = Number(req.params.id);
      const user = users.find(user => user.id === userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(user);
    }
  );
  ```
  The `Request` type **accepts several** generic parameters. The first **describes** the **URL parameters.**

  ```ts
  (req: Request<{ id: string }>, res: Response)
  ```
  For `/users/:id`, the ID arrives through the URL **as a string,** even if it represents a number. TypeScript **helps** us **understand** what data we're working with, but it **doesn't automatically convert** the string into a number.
- Lastly, we **define the final** endpoints and start the server.

  ```ts
  app.post(
    '/users',
    validateUserData,
    (req: Request<{}, {}, UserDataRequest>, res: Response) => {
      const { name, email } = req.body;
      const newUser: User = { id: nextId++, name, email };
      users.push(newUser);
      res.status(201).json(newUser);
    }
  );

  app.put(
    '/users/:id',
    validateUserId,
    validateUserData,
    (req: Request<{ id: string }, {}, UserDataRequest>, res: Response) => {
      const userId = Number(req.params.id);
      const user = users.find(user => user.id === userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const { name, email } = req.body;
      user.name = name;
      user.email = email;
      res.json(user);
    }
  );

  app.delete(
    '/users/:id',
    validateUserId,
    (req: Request<{ id: string }>, res: Response) => {
      const userId = Number(req.params.id);
      const userIndex = users.findIndex(user => user.id === userId);
      if (userIndex === -1) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      users.splice(userIndex, 1);
      res.json({ message: `User ${userId} deleted successfully!` });
    }
  )

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  ```
  The **three generic parameters** in `Request<{}, {}, UserDataRequest>` are:
  - `{}`: the route parameters.
  - `{}`: the response body type.
  - `UserDataRequest`: the **request body type.**

  **Note that** type annotations **do not validate** incoming HTTP requests. A client **can send** arbitrary JSON.
- The application uses two **middleware functions to validate** URL parameters and request bodies.

  ```ts
  function validateUserId(
    req: Request<{ id: string }>,
    res: Response,
    next: Function
  ): void {
    const userId = Number(req.params.id);
    if (!Number.isInteger(userId) || userId <= 0) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }
    next();
  }

  function validateUserData(
    req: Request<{}, {}, UserDataRequest>,
    res: Response,
    next: Function
  ): void {
    const { name, email } = req.body;
    if (!name || !email || name.trim() === '' || email.trim() === '') {
      res.status(400).json({ error: 'Name and email are required' });
      return;
    }
    next();
  }
  ```
The source code of `app.ts` is at [app.ts](ts-users-api/src/app.ts).