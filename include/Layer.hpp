#pragma once
#include "librairies.hpp"
#include "IArtificialNeuron.hpp"

class Layer {
    public:
        explicit Layer(std::vector<std::unique_ptr<IArtificialNeuron>> neurons, LayerType type);
    
        std::vector<std::unique_ptr<IArtificialNeuron>>& getNeurons();
    
        size_t getNeuronCount() const;
    
        LayerType getType() const;
    
    private:
        std::vector<std::unique_ptr<IArtificialNeuron>> m_neurons;
        size_t m_nNeurons;
        LayerType m_type;
    };