#include "Layer.hpp"

explicit Layer::Layer(std::vector<std::unique_ptr<IArtificialNeuron>> neurons, LayerType type)
    : m_neurons(std::move(neurons)),
        m_nNeurons(m_neurons.size()),
        m_type(type)
{
}

std::vector<std::unique_ptr<IArtificialNeuron>>& Layer::getNeurons() { 
    return m_neurons; 
}

size_t Layer::getNeuronCount() const {
    return m_nNeurons;
}

LayerType Layer::getType() const {
    return m_type;
}