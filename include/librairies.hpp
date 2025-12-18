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
#include <memory>

enum NeuronType {
    PERCEPTRON,
    SIGMOID,
};

enum ActivationFunctionType {
    STEP,
    SIGMOID,
    RELU,
    TANH
};

enum LayerType {
    INPUT,
    HIDDEN,
    OUTPUT
};

using TrainingSample = std::pair<std::vector<float>, std::vector<float>>;
