#pragma once
#include "librairies.hpp"
#include "NeuralNetwork.hpp"

class ExperimentRunner {
    public:
        NeuralNetwork loadNetwork(const std::string& network_name);
};