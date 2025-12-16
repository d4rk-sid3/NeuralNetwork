# Introduction

Here is a description of how to use the converter 

# Compilation

## Prerequisites
- C++ compiler supporting C++11 or later
- Google Test framework (for running tests)

## Build Instructions

To compile the project:

```bash
g++ -std=c++11 -o convert convert.cpp main.cpp
```

For tests, ensure Google Test is installed and compile with:

```bash
g++ -std=c++11 -o parseDatasetTest tests/parseDatasetTest.cpp convert.cpp -lgtest -lgtest_main -pthread
```

# Usage

## Running the Converter

- Convert a dataset file and output to stdout:
```bash
./convert input_dataset.txt
```

- Convert a dataset file and save to an output file:
```bash
./convert input_dataset.txt output_results.txt
```

- Display help information:
```bash
./convert --help
```

## Input Format

The input dataset file should contain chess positions in FEN notation with labels:
```
rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1 Check White
```

## Running Tests

Execute all unit tests:
```bash
./parseDatasetTest
```

Tests verify functionality for parsing chess board lines, castling rights, en passant squares, and complete dataset lines.