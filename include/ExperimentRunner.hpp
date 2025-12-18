#pragma once
#include "librairies.hpp"
#include "NeuralNetwork.hpp"
#include "DataLoader.hpp"
#include "NeuronFactory.hpp"

class ExperimentRunner {
    public:
        static NeuralNetwork ExperimentRunner::generate(const std::string& config_file);
        static void saveNetwork(NeuralNetwork &network, const std::string &name);
        static NeuralNetwork& loadNetwork(const std::string& network_name);
        static void ExperimentRunner::train(
            NeuralNetwork& network,
            const std::string& hyperparams_file,
            const std::string& training_data_file
        );
};