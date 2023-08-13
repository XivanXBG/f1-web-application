# F1Application Documentation

This documentation provides an overview of the **F1Application** project, detailing its structure, modules, and key features.

## Project Overview

**F1Application** is a web application built using Angular 16.1.3. It serves as a hub for Formula 1 enthusiasts, providing information about circuits, drivers, constructors, schedules, and more. The application follows a modular structure to ensure maintainability and scalability.

## Project Architecture

The project is organized into several modules and components to achieve a clean and structured architecture:

### Core Module

- Contains core functionality shared across the application.
- Includes footer and header components for consistent layout.
- Implements guards to control user access.
- Defines interfaces for type safety.
- Houses services such as:
  - Authentication Service: Handles user authentication.
  - Firestore Service: Interacts with the Firestore database.
  - Update Profile Service: Manages user profile updates.

### Assets

- Stores application assets, such as images and media files.

### Features Module

#### Circuit Module (Lazy Loading)

- Displays circuit information within the schedule.
- Components within this module:
  - Circuit Details: Displays detailed information about a circuit.
  - Schedule: Displays the upcoming race schedule.
  - Shared Folder: Houses a clock component for the next race countdown.

#### Wiki Module (Lazy Loading)

- Contains detailed information about drivers, constructors, and general F1 knowledge.
- Components within this module:
  - Drivers Wiki: Provides details about F1 drivers.
  - Constructors Wiki: Offers information about F1 constructors.
  - Wiki Page: Displays general F1-related information.

#### Pages Folder

- Holds various pages and components for user interaction:
  - Forgot Password: Allows users to recover their password.
  - Landing Page: The initial page users see upon visiting the app.
  - Login: Enables user login.
  - Register: Allows new users to register.
  - Not Found: Displays a 404 error page for invalid routes.
  - Pit Stop Strategy Game: Engaging game related to pit stop strategies.
  - Profile View: Displays user profiles.
  - Standings: Displays current F1 standings.
  - Verify Email: Guides users through email verification.

## Getting Started

To run the application locally:
1. Clone the repository.
2. Install the required dependencies using `npm install`.
3. Run `ng serve` for a development server.
4. Navigate to `http://localhost:4200/` in your browser to view the application.
5. The application will automatically reload if you make changes to the source files.

## Building the Project

To build the project for deployment, run `ng build`. The build artifacts will be stored in the `dist/` directory.

## Testing

- Run unit tests with `ng test` using Karma.
- Perform end-to-end tests using `ng e2e` with a chosen testing platform.

For more detailed usage and commands, refer to the [Angular CLI Overview and Command Reference](https://angular.io/cli).

This documentation provides a high-level overview of the **F1Application** project's structure and key components. For further assistance or more in-depth information, please refer to the relevant source code files and comments.