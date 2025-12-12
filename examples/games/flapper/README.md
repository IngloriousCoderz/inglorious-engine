# Inglorious Flapper

A Flappy Bird clone.

![Gameplay Screenshot](https://raw.githubusercontent.com/IngloriousCoderz/inglorious-forge/main/examples/games/flapper/public/screenshot.png)

## About This Project

This project is a port of a Flappy Bird clone originally created with Lua and the LÖVE 2D framework. The original version was developed as part of the second lecture in Harvard's CS50's Introduction to Game Development.

- **Original Course Lecture:** [CS50's Intro to Game Development - Lecture 2: Flappy Bird](https://www.youtube.com/watch?v=3IdOCxHGMIo)
- **Original Source Code (Lua/LÖVE 2D):** [games50/fifty-bird](https://github.com/games50/fifty-bird)

While the core gameplay remains faithful to the original, this port serves as a demonstration of the [**Inglorious Engine**](https://www.npmjs.com/package/@inglorious/engine). It was an exercise in applying modern architectural patterns and tooling to a classic game.

## Key Features & Architectural Highlights

This version showcases several modern development practices and design patterns:

### 1. Simplified Vector Math with IngloriousScript

Vector calculations for movement, collision, and physics are greatly simplified through the use of the **IngloriousScript** language. This allows for more readable and maintainable physics code, abstracting away the low-level mathematical operations.

### 2. Modular Configuration

Instead of a single monolithic configuration file, this project subdivides game settings into multiple, organized files. This approach improves maintainability by separating concerns like entity definitions, game states, and asset management.

### 3. Event-Driven Game Engine (Pub/Sub)

The **Inglorious Engine** is built on an event-driven, Publish-Subscribe (Pub/Sub) architecture. This design promotes a loosely coupled system where game entities communicate through events, making the codebase more modular and extensible.

## Getting Started

1.  Clone the repository:
    ```bash
    git clone https://github.com/IngloriousCoderz/inglorious-forge.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd inglorious-forge/examples/games/flapper
    ```
3.  Install dependencies:
    ```bash
    pnpm install
    ```
4.  Run the game:
    ```bash
    pnpm dev
    ```

## How to Play

- **Player 1 (Left Paddle):** Use `W` (up) and `S` (down).
- **Player 2 (Right Paddle):** Use `Up Arrow` (up) and `Down Arrow` (down).
- **Serve Ball:** Press `Spacebar` to start the game.
- **Objective:** Be the first player to score 10 points!

## License

**MIT License - Free and open source**

Created by [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)

You're free to use, modify, and distribute this software. See [LICENSE](./LICENSE) for details.
