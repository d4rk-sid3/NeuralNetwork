#pragma once
#include "librairies.hpp"
#include "IArtificialNeuron.hpp"
#include "IActivationFunction.hpp"
#include "Perceptron.hpp"
#include "SigmoidNeuron.hpp"

class NeuronFactory {
    public:
        static std::unique_ptr<IArtificialNeuron> createNeuron(
            NeuronType type,
            int n_weights,
            const IActivationFunction* activation = nullptr,
            std::optional<std::vector<float>> weights = std::nullopt,
            std::optional<float> bias = std::nullopt
        ) {
            switch (type) {
                case NeuronType::PERCEPTRON:
                    return std::make_unique<Perceptron>(n_weights, weights, bias);
    
                case NeuronType::SIGMOID:
                    if (!activation) {
                        throw std::invalid_argument("Activation function required for SigmoidNeuron");
                    }
                    return std::make_unique<SigmoidNeuron>(*activation, n_weights, weights, bias);
    
                default:
                    throw std::invalid_argument("Unknown neuron type");
            }
        }
    };