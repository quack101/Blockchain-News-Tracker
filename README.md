# Blockchain News Tracker

A decentralized news registry system built with a focus on article authenticity and history tracking.

## Project Overview

This project implements a transparent way to track news articles on the blockchain. It ensures that the history of an article is immutable and verifiable.

## Project Structure

The project is divided into three main sections:

### 1. Blockchain (`/blockchain`) - Person 1
Smart contract layer for managing the news registry.
- **Contract:** `NewsRegistry.sol` (Article struct + core functions)
- **Tools:** Hardhat, ethers.js

### 2. Backend (`/backend`) - Person 2
API layer that bridges the frontend and the blockchain.
- **Stack:** Node.js, Express
- **Functions:** Content hashing (SHA-256), DB management, and blockchain service interaction.

### 3. Frontend (`/frontend`) - Person 3
User interface for interacting with the news registry.
- **Stack:** React, Axios
- **Features:** Wallet connection (MetaMask), article publishing, and version history timeline.

## Setup Instructions

Initially, you will need to run `npm install` in each directory once the dependencies are defined.

### Steps to Run:
1. **Blockchain:** Configure `.env`, compile contracts, and deploy to a local/test network.
2. **Backend:** Set the contract address in `.env` and start the server.
3. **Frontend:** Configure the API URL and start the development server.
