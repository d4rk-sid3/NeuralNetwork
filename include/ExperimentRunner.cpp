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

    for (size_t l = 0; l < layers_json.size(); ++l) {
        const auto& layer = layers_json[l];

        std::string layer_type = layer.at("type").get<std::string>();
        size_t layer_size = layer.at("size").get<size_t>();
        std::string neuron_type = layer.at("neuron_type").get<std::string>();

        network.addLayer(
            layer_type,
            layer_size,
            ActivationFactory::create(neuron_type)
        );
    }

    // -----------------------
    // Load weights & biases
    // (skip input layer)
    // -----------------------
    fs::path weights_dir = base_path / "weights";
    fs::path biases_dir  = base_path / "biases";

    for (size_t l = 1; l < network.numLayers(); ++l) {
        fs::path w_file = weights_dir / ("weights-" + std::to_string(l) + ".bin");
        fs::path b_file = biases_dir  / ("biases-"  + std::to_string(l) + ".bin");

        auto weights = DataLoader::load_weights(w_file.string());
        auto biases  = DataLoader::load_biases(b_file.string());

        auto& neurons = network.getLayer(l).getNeurons();

        if (neurons.size() != weights.size() ||
            neurons.size() != biases.size()) {
            throw std::runtime_error("Weights/Biases size mismatch in layer " + std::to_string(l));
        }

        for (size_t n = 0; n < neurons.size(); ++n) {
            neurons[n]->set_weights(weights[n]);
            neurons[n]->set_bias(biases[n]);
        }
    }

    return network;
}