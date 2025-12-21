# ♟️ MyTorch — Neural Network–Based Chess State Evaluation Engine

MyTorch is a **C++ neural network engine** designed to analyze chess positions and predict high-level game states such as **check**, **checkmate**, or **neutral positions**.  
The project focuses on **from-scratch neural networks**, full control over training, evaluation, and inference, and a complete toolchain from raw chess data to an interactive AI shell.

This repository is both:
- an **engineering project** (C++, shared libraries, dynamic loading, CLI shell)
- a **machine learning project** (custom neural network implementation, training pipeline, evaluation metrics)

---

## 🧠 Technologies Used

- **C++17**
- **STL (Standard Template Library)**
- **Shared libraries (.so)** and dynamic loading (`dlopen`, `dlsym`)
- **Custom Neural Network implementation**
  - Feedforward
  - Backpropagation
  - Softmax output layer
  - Stochastic Gradient Descent
- **JSON configuration** (via *nlohmann/json*)
- **Makefile-based build system**
- **Command-line interactive shell**
- **Linux environment**

---

## ♞ About Chess (Game Overview)

Chess is a two-player strategy game played on an 8×8 board.  
Each player controls 16 pieces, and the objective is to **checkmate** the opponent’s king — placing it in a position where it cannot escape capture.

Key concepts relevant to this project:
- **Check**: the king is under immediate threat
- **Checkmate**: the king cannot escape threat → game over
- **Side to move** matters (white or black)
- Board state alone does *not* encode future legality — this is a key ML challenge

---

## Project Goal

The goal of MyTorch is to **classify a chess position** into one of five game states:

| Game State          | Output Vector |
|---------------------|--------------|
| Check (White)       | `[1, 0, 0, 0, 0]` |
| Check (Black)       | `[0, 1, 0, 0, 0]` |
| Checkmate (White)   | `[0, 0, 1, 0, 0]` |
| Checkmate (Black)   | `[0, 0, 0, 1, 0]` |
| Nothing / Neutral   | `[0, 0, 0, 0, 1]` |

This is a **multi-class classification problem** solved using a **Softmax output layer**.

---

## ♟️ FEN Notation

Chess positions are represented using **FEN (Forsyth–Edwards Notation)**.

A FEN string encodes:
- Board layout
- Side to move
- Castling rights
- En passant target
- Halfmove clock
- Fullmove number

📖 Reference:  
👉 https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation

---

## 🔄 Data Conversion Pipeline

Raw chess data (FEN-based) is **not directly usable** by a neural network.

### Conversion Steps

1. **Raw FEN input**
2. Converted into **numerical representation**
3. Output format: **73 values**
   - 64 board squares
   - 1 side-to-move value
   - Additional metadata (ignored during training)
4. **Only the first 65 values are used as NN input**
5. **Last 5 values are labels (during training)**

A **dedicated converter executable** is provided to transform raw FEN datasets into this standardized numeric format.

---

## Neural Network Architecture

### Input Layer
- **65 neurons**
- Fixed size
- No weights or biases
- Cannot be customized (tied to data format)

### Hidden Layers
- Fully customizable
- Any number of layers
- Supported activation functions:
  - `RELU`
  - `SIGMOID`
  - `TANH`
  - `PERCEPTRON`

### Output Layer
- **5 neurons**
- Always fixed
- Uses **Softmax** (probability distribution)

### Training Details
- Loss: **Categorical Cross-Entropy**
- Optimizer: **Mini-batch Stochastic Gradient Descent**
- Weight initialization: random (uniform)

---

## 🏋️ Training System

Training is orchestrated through the **ExperimentRunner**.

### Required Inputs
- Neural Network instance
- Training dataset file
- JSON file defining hyperparameters

### Hyperparameters JSON
```json
{
  "epochs": 30,
  "mini_batch_size": 64,
  "eta": 0.003
}
```

## Training Process

- Load hyperparameters
- Load and shuffle dataset
- Split into mini-batches
- Backpropagation & updates
- Repeat for each epoch
- Metrics tracked during training

## 📊 Evaluation Metrics

RobotAI evaluates models using:

- Accuracy
- Loss
- Precision
- Recall
- F1 Score
- Confusion Matrix

