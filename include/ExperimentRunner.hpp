#pragma once
#include "librairies.hpp"
#include "NeuralNetwork.hpp"
#include "DataLoader.hpp"
#include "NeuronFactory.hpp"

class ExperimentRunner {
    public:
        static NeuralNetwork loadNetwork(const std::string& network_name);
        static void saveNetwork(const NeuralNetwork &network, const std::string &name);
};