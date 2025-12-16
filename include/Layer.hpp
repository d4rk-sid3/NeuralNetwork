#pragma once
#include "librairies.hpp"
#include "IArtificialNeuron.hpp"

class Layer {
    public:
        Layer(int n_neurons, int n_weights, LayerType type);
        ~Layer();
    
        // return mutable reference to the neurons
        std::vector<IArtificialNeuron>& get_neurons(void) { return m_neurons; };
    
    private:
        void initNeurons(int n_neurons, int n_weights);
    
        std::vector<IArtificialNeuron> m_neurons;
};