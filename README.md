# Cheaper Hotel

## What is this?

A application who show to the user the cheaper hotel based on type of client and availability. I built this project with these elements in mind:

- Readability

- Solution design

- Ease of application evolution and maintenance

- Automated tests

- Operability

- Architecture



## Readbility

This project use in order to create a solution with readable code:

- Eslint: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.

- Prettier: Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

- EditorConfig: A file format and collection of text editor plugins for maintaining consistent coding styles between different editors and IDEs.



## Architecture decisions and Solution design

This project used concepts of Clean Architecture (https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and Screaming Architecture (https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html).

With this architecture the project is:
1.  Independent of Frameworks.
2.  Testable.
3.  Independent of UI.
4.  Independent of Database.
5.  Independent of any external agency.

### Project anatomy
```
app
 └ evidences                        → Evidences that the project works as requested
 └ src                              → Application sources
    └ business_rules    			→ Application services layer
       └ use_cases                  → Application use cases
          └ cheaper_hotel           → Cheaper Hotel use cases
    └ enterprise_business_rules     → Enterprise core business layer
       └ models                     → Domain model
       └ enum                       → Enumerators
    └ frameworks_drivers            → Frameworks, drivers and tools such as Database.
       └ database                   → Data object
    └ interface_adapters            → Adapters and formatters for use cases and entities to external agency such as Database or the Web.
       └ controllers                → Controllers folder
 └ node_modules (generated)         → NPM dependencies
 └ tests                            → Source folder for unit or functional tests
 └ index.js                         → Main application entry point
```
## Tests
The project use `jest` to test the application and has **100%** test coverage:

## Run the application
In the **project root folder**, run:
`npm i` to install dependencies (you need to run this code because **I deleted the node_modules in order to decrease project size to transfer it over the internet)**.

`node index "<your_argument_here>"` to execute the code. Example:
`node index "Regular: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)"   `

`npm test` to run the tests;

`npm run coverage` to see the code coverage of project.
