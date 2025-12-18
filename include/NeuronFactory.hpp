#pragma once
#include "librairies.hpp"
#include "Neuron.hpp"

class NeuronFactory {
    public:
        static std::unique_ptr<Neuron> create(
            const std::string& activation,
            size_t n_weights,
            const std::vector<float>& weights,
            float bias
        );
};
