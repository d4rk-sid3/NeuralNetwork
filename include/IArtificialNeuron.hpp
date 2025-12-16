#pragma once
#include "librairies.hpp"

class IArtificialNeuron {
    public:
        virtual ~IArtificialNeuron() {}
        virtual float compute_z(const std::vector<float>& inputs) = 0;
        virtual float compute_activation(void) = 0;
        virtual float get_output(void) = 0;
        /*  We use reference here so that we don't have to reset the weights
            once another function has modify them
        */
        virtual std::vector<float>& get_weights(void) = 0;
        virtual float& get_bias() = 0;
        virtual float& get_z() = 0;
        virtual NeuronType getType() const = 0;
};