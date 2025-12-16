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

std::vector<float> NeuralNetwork::feedforward(std::vector<float>& input)
{
    std::vector<float> new_inputs;

    for (size_t i = 0; i < m_numLayers; i++)
	{
		new_inputs.clear();
		
		// reference the layer neurons directly
		std::vector<std::unique_ptr<IArtificialNeuron>>& layer_neurons = m_layers[i].getNeurons();
        
		for (size_t n = 0; n < layer_neurons.size(); n++)
		{
			layer_neurons[n]->compute_z(input);
			layer_neurons[n]->compute_activation();
			new_inputs.push_back(layer_neurons[n]->get_output());
		}
		input = new_inputs;
	}
	return input;
}

