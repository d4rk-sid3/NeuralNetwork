# =========================
# Compiler configuration
# =========================

CXX := g++
CXXFLAGS := -std=c++17 -O2 -Wall -Wextra -fPIC
INCLUDES := -Iinclude

# =========================
# Project structure
# =========================

SRC_DIR := src
OBJ_DIR := build
LIB_DIR := librairies
BIN_DIR := bin

# =========================
# Source files
# =========================

# NeuralNetwork library
NN_SRCS := $(shell find $(SRC_DIR)/neural_network -name "*.cpp")
NN_OBJS := $(patsubst $(SRC_DIR)/neural_network/%.cpp,$(OBJ_DIR)/neural_network/%.o,$(NN_SRCS))
NN_LIB := $(LIB_DIR)/libNeuralNetwork.so

# ExperimentRunner library
ER_SRCS := $(shell find $(SRC_DIR)/experiment_runner -name "*.cpp")
ER_OBJS := $(patsubst $(SRC_DIR)/experiment_runner/%.cpp,$(OBJ_DIR)/experiment_runner/%.o,$(ER_SRCS))
ER_LIB := $(LIB_DIR)/libExperimentRunner.so

# Shell
SHELL_SRCS := $(shell find $(SRC_DIR)/shell -name "*.cpp")
SHELL_OBJS := $(patsubst $(SRC_DIR)/shell/%.cpp,$(OBJ_DIR)/shell/%.o,$(SHELL_SRCS))
SHELL_BIN := $(BIN_DIR)/shell

# =========================
# Targets
# =========================

.PHONY: all neural_network experiment_runner shell clean re debug

# Default target
all: neural_network experiment_runner shell

# -------------------------
# Neural Network Library
# -------------------------
neural_network: $(NN_LIB)

$(NN_LIB): $(NN_OBJS)
	@mkdir -p $(LIB_DIR)
	$(CXX) -shared -o $@ $^

# -------------------------
# Experiment Runner Library
# -------------------------
experiment_runner: $(ER_LIB)

$(ER_LIB): $(ER_OBJS) $(NN_LIB)
	@mkdir -p $(LIB_DIR)
	$(CXX) -shared -o $@ $^

# -------------------------
# Shell
# -------------------------
shell: $(SHELL_BIN)

$(SHELL_BIN): $(SHELL_OBJS) $(NN_LIB) $(ER_LIB)
	@mkdir -p $(BIN_DIR)
	$(CXX) -o $@ $^ -ldl -Wl,-rpath,'\$ORIGIN/../librairies'

# -------------------------
# Compile object files
# -------------------------
$(OBJ_DIR)/%.o: $(SRC_DIR)/%.cpp
	@mkdir -p $(dir $@)
	$(CXX) $(CXXFLAGS) $(INCLUDES) -c $< -o $@

# =========================
# Utilities
# =========================

clean:
	rm -rf $(OBJ_DIR) $(LIB_DIR) $(BIN_DIR)

re: clean all

# =========================
# Debug build
# =========================

debug: CXXFLAGS += -g
debug: re
