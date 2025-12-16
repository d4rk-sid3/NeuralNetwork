#pragma once
#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <map>
#include <cstdlib>
#include <cmath>
#include <ctime>
#include <algorithm>
#include <optional>
#include <random>

enum NeuronType {
    PERCEPTRON,
    SIGMOID,
};

enum ActivationFunctionType {
    SIGMOID,
    RELU,
    TANH
};
