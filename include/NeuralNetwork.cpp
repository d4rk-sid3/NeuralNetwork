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

void NeuralNetwork::SGD(
    const std::vector<TrainingSample>& training_data,
    int epochs,
    int mini_batch_size,
    float eta,
    const std::vector<TrainingSample>* test_data
)
{
    const size_t n = training_data.size();
    const size_t n_test = test_data ? test_data->size() : 0;

    std::random_device rd;
    std::mt19937 gen(rd());

    for (int epoch = 0; epoch < epochs; epoch++) {

        std::shuffle(training_data.begin(), training_data.end(), gen);

        for (size_t k = 0; k < n; k += mini_batch_size) {

            size_t end = std::min(k + mini_batch_size, n);

            std::vector<TrainingSample> mini_batch(
                training_data.begin() + k,
                training_data.begin() + end
            );

            updateMiniBatch(mini_batch, eta);
        }

        if (test_data) {
            int correct = evaluate(*test_data);
            std::cout << "Epoch " << epoch
                      << ": " << correct
                      << " / " << n_test << std::endl;
        } else {
            std::cout << "Epoch " << epoch << " complete" << std::endl;
        }
    }
}

void NeuralNetwork::updateMiniBatch(
    const std::vector<TrainingSample>& mini_batch,
    float eta
)
{
    std::vector<std::vector<std::vector<float>>> nabla_w;
    std::vector<std::vector<float>> nabla_b;

    // Initialization to zero
    for (auto& layer : m_layers) {
        std::vector<std::vector<float>> layer_w;
        std::vector<float> layer_b;

        for (const auto& neuron : layer.getNeurons()) {
            layer_w.emplace_back(neuron->get_weights().size(), 0.0f);
            layer_b.emplace_back(0.0f);
        }

        nabla_w.push_back(std::move(layer_w));
        nabla_b.push_back(std::move(layer_b));
    }

    // Accumulation of gradients for each sample in the mini-batch
    for (const auto& [x, y] : mini_batch) {
        auto gradients = backprop(x, y);

        for (size_t l = 0; l < nabla_w.size(); l++) {
            for (size_t n = 0; n < nabla_w[l].size(); n++) {
                nabla_b[l][n] += gradients.first[l][n];

                for (size_t w = 0; w < nabla_w[l][n].size(); w++) {
                    nabla_w[l][n][w] += gradients.second[l][n][w];
                }
            }
        }
    }

    // Weights and biases update
    const float lr = eta / static_cast<float>(mini_batch.size());

    for (size_t l = 0; l < m_layers.size(); l++) {
        auto& neurons = m_layers[l].getNeurons();

        for (size_t n = 0; n < neurons.size(); n++) {
            auto& weights = neurons[n]->get_weights();
            auto& bias = neurons[n]->get_bias();

            bias -= lr * nabla_b[l][n];

            for (size_t w = 0; w < weights.size(); ++w) {
                weights[w] -= lr * nabla_w[l][n][w];
            }
        }
    }
}

