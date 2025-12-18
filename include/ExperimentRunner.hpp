#pragma once
#include "librairies.hpp"
#include "NeuralNetwork.hpp"
#include "DataLoader.hpp"

class ExperimentRunner {
    public:
        static NeuralNetwork loadNetwork(const std::string& network_name);
};