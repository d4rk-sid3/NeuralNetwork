#include "ExperimentRunner.hpp"

NeuralNetwork ExperimentRunner::loadNetwork(const std::string& network_name)
{
    fs::path base_path = fs::path("Neural_Networks") / network_name;
    fs::path config_path = base_path / (network_name + ".json");

    if (!fs::exists(config_path)) {
        throw std::runtime_error("Network config not found: " + config_path.string());
    }

    // Load JSON config
    nlohmann::json j;
    {
        std::ifstream file(config_path);
        if (!file.is_open()) {
            throw std::runtime_error("Cannot open network config file");
        }
        file >> j;
    }

    // Retrieve last training parameters

    int epochs = j.at("epochs").get<int>();
    int mini_batch_size = j.at("mini_batch_size").get<int>();
    float learning_rate = j.at("learning_rate").get<float>();

    // Rebuild layers
    const auto& layers_json = j.at("layers");

    // Creating an empty neurons vector

    // Creating an empty layers vector

    // Path to weights and biases
    fs::path weights_dir = base_path / "weights";
    fs::path biases_dir  = base_path / "biases";


    for (size_t l = 0; l < layers_json.size(); l++) {

        // Empty the neuronal vector

        const auto& layer = layers_json[l];

        // Retrieve parameters

        std::string layer_type = layer.at("layer_type").get<std::string>();
        std::string activation_name = layer.at("activation").get<std::string>();
        size_t number_neurons = layer.at("number").get<size_t>();

        fs::path w_file = weights_dir / ("weights-" + std::to_string(l + 1) + ".bin");
        fs::path b_file = biases_dir  / ("biases-"  + std::to_string(l + 1) + ".bin");

        // Load weights and biases

        auto weights = DataLoader::load_weights(w_file.string());
        auto biases  = DataLoader::load_biases(b_file.string());

        if (number_neurons != weights.size() ||
            number_neurons != biases.size()) {
            throw std::runtime_error("Weights/Biases size mismatch in layer " + std::to_string(l));
        }

        size_t nb_weights = weights[0].size();

        for (size_t n = 0; n < number_neurons; n++) {
            std::optional<std::vector<float>> neuron_weights = std::make_optional(weights[n]);
            std::optional<float> neuron_bias = std::make_optional(biases[n]);
            neurons_vector.push_back(
                std::move(NeuronFactory::create(
                    activation_name, 
                    nb_weights, 
                    neuron_weights, 
                    neuron_bias))
            );
        }
        layers_vector.push_back(std::move(
            Layer(neurons_vector, 
                StringtoLayerType(layer_type))));
    }

    return NeuralNetwork(layers_vector);
}