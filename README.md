# NgPanel

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

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

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## CI/CD and Publishing

This project includes automated CI/CD for publishing to NPM. See [CICD_SETUP.md](CICD_SETUP.md) for complete setup instructions and workflow documentation.

### Quick Start for Contributors

1. Create feature branches from `master`
2. Submit pull requests to `prod` branch for release
3. Use conventional commit messages for automatic version bumping:
   - `feat:` for new features (minor version)
   - `fix:` for bug fixes (patch version)  
   - `BREAKING CHANGE:` for breaking changes (major version)

The library will be automatically published to NPM when changes are merged to the `prod` branch.
