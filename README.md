# ft_transcendence

**ft_transcendence** is the final project of the Common Core at 42 Barcelona. It consists of building a web platform where users can play the classic Pong game, participate in online tournaments, and experience a secure, scalable, and modern application. The project aims to consolidate the skills developed throughout the curriculum by implementing real-world technologies, secure practices, and advanced modules.

## Technologies Used

- **Frontend**: Vanilla JavaScript, HTML5, CSS3, Bootstrap
- **Backend**: Django (Python)
- **Database**: PostgreSQL
- **Infrastructure**: Docker, Docker Compose
- **Others**: WebSockets, JWT, Two-Factor Authentication, Blockchain (Ethereum), Three.js/WebGL

## Implemented Modules

### Web

- **Backend Framework (Django)**  
  We used Django to structure the backend, handle API logic, WebSocket connections, user authentication, and database interactions.

- **Frontend Toolkit (Bootstrap)**  
  Bootstrap was used as a UI toolkit to ensure a responsive and visually consistent user interface.

- **Backend Database (PostgreSQL)**  
  PostgreSQL was integrated for secure and reliable storage of users, matches, statistics, and tournament data.

- **Blockchain Score Storage**  
  Tournament scores are securely stored on a test Ethereum blockchain using Solidity smart contracts, ensuring transparency and immutability.

### User Management

- **Standard User Management**  
  Includes user registration, secure login, custom profiles, avatars, friend system, and game history tracking.

- **Remote Authentication (OAuth)**  
  Implemented OAuth 2.0 login via 42’s intra system for seamless authentication using institutional credentials.

### Gameplay

- **Multiplayer Mode (More than 2 players)**  
  Expanded gameplay supports multiple concurrent players with adapted logic for dynamic matches.

- **AI Opponent**  
  An AI-controlled bot simulates a human player with a limited reaction time, providing a challenging solo gameplay option.

### Statistics and Visualization

- **User and Game Dashboards**  
  Users can access dashboards showing personal and game-wide statistics, win/loss ratios, and historical performance.

### Security

- **Two-Factor Authentication and JWT**  
  Implemented 2FA alongside JSON Web Tokens to ensure secure session management and enhanced account protection.

### Architecture

- **Backend Microservices Design**  
  The backend is structured as multiple independent services to improve scalability, maintainability, and modularity.

### Graphics

- **Advanced 3D Techniques with Three.js/WebGL**  
  Pong was redesigned using Three.js to provide a 3D interactive game experience with real-time rendering.

### Accessibility

- **Extended Browser Compatibility**  
  The application was tested and adjusted for compatibility with multiple modern browsers to improve accessibility.

## Installation

Clone the repository and run:

```bash
docker-compose up --build
```

May be you need the env file? 
  up2you
