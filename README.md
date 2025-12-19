# DigitalPhoneBookUi


## Project information

Upon load, the application will accept a command from the user passed in the prompt bar to perform saving, finding, updating, or deleting records.

All available records are displayed in the table below the prompt bar.

Whenever a command is dispatched through the prompt bar, the application will display a message indicating the result of the command above the prompt bar.

The application only accepts commands towards one record. Trying to perform a command on multiple records will result in an error message.


## Development server

To start a local development server, run:

```bash
ng serve
```
Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```
