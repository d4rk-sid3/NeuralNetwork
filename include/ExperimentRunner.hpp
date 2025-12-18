#pragma once
#include "librairies.hpp"
#include "NeuralNetwork.hpp"
#include "DataLoader.hpp"
#include "NeuronFactory.hpp"

class ExperimentRunner {
    public:
        static void saveNetwork(NeuralNetwork &network, const std::string &name);
        static NeuralNetwork loadNetwork(const std::string& network_name);
};