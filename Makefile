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

LIB_NAME := neural_network.so

# =========================
# Source & object files
# =========================

SRCS := $(shell find $(SRC_DIR) -name "*.cpp")
OBJS := $(patsubst $(SRC_DIR)/%.cpp,$(OBJ_DIR)/%.o,$(SRCS))

# =========================
# Targets
# =========================

.PHONY: all library clean re debug

# Default target
all: library

# --------
# Build shared library
# --------
library: $(LIB_DIR)/$(LIB_NAME)

$(LIB_DIR)/$(LIB_NAME): $(OBJS)
	@mkdir -p $(LIB_DIR)
	$(CXX) -shared -o $@ $^

# --------
# Compile objects
# --------
$(OBJ_DIR)/%.o: $(SRC_DIR)/%.cpp
	@mkdir -p $(dir $@)
	$(CXX) $(CXXFLAGS) $(INCLUDES) -c $< -o $@

# =========================
# Utilities
# =========================

clean:
	rm -rf $(OBJ_DIR) $(LIB_DIR)

re: clean library

# =========================
# Debug build
# =========================

debug: CXXFLAGS += -g
debug: library
