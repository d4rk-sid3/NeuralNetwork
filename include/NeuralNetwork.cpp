#include "NeuralNetwork.hpp"

explicit NeuralNetwork::NeuralNetwork(std::vector<Layer> layers)
    : m_layers(std::move(layers)),
        m_numLayers(layers.size())
{
}

size_t NeuralNetwork::getNumLayers() const
{
    return m_numLayers;
}

Layer& NeuralNetwork::getLayer(size_t index)
{
    if (index >= m_layers.size())
        throw std::invalid_argument("Index out of range");
    return m_layers[index];
}

std::vector<float> NeuralNetwork::feedforward(const std::vector<float>& input)
{
    
}