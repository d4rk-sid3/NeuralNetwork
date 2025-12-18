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

    int epochs = j.at("epochs").get<int>();
    int mini_batch_size = j.at("mini_batch_size").get<int>();
    float learning_rate = j.at("learning_rate").get<float>();

    const auto& layers_json = j.at("layers");

    fs::path weights_dir = base_path / "weights";
    fs::path biases_dir  = base_path / "biases";

    std::vector<Layer> layers_vector;

    // ----------------------------
    // Create input layer automatically
    // ----------------------------
    size_t input_size = 1;

    std::vector<std::unique_ptr<Neuron>> input_neurons;
    for (size_t n = 0; n < input_size; n++) {
        input_neurons.push_back(
            NeuronFactory::create(
                "PERCEPTRON",
                1,
                std::vector<float>{1.f},
                0.f
            )
        );
    }
    layers_vector.emplace_back(std::move(input_neurons), LayerType::INPUT);

    // ----------------------------
    // Rebuild hidden and output layers from JSON
    // ----------------------------
    for (size_t idx = 0; idx < layers_json.size(); idx++) {
        const auto& layer_json = layers_json[idx];

        std::string layer_type_str  = layer_json.at("layer_type").get<std::string>();
        std::string activation_name = layer_json.at("activation").get<std::string>();
        size_t number_neurons       = layer_json.at("number").get<size_t>();

        LayerType layer_type = StringToLayerType(layer_type_str);

        std::vector<std::unique_ptr<Neuron>> neurons_vector;

        fs::path w_file = weights_dir / ("weights-" + std::to_string(idx + 1) + ".bin");
        fs::path b_file = biases_dir  / ("biases-"  + std::to_string(idx + 1) + ".bin");

        auto weights = DataLoader::load_weights(w_file.string());
        auto biases  = DataLoader::load_biases(b_file.string());

        if (weights.size() != number_neurons ||
            biases.size()  != number_neurons) {
            throw std::runtime_error("Weights/Biases size mismatch in layer " + std::to_string(idx));
        }

        for (size_t n = 0; n < number_neurons; n++) {
            neurons_vector.push_back(
                NeuronFactory::create(
                    activation_name,
                    weights[n].size(),
                    weights[n],
                    biases[n]
                )
            );
        }

        layers_vector.emplace_back(std::move(neurons_vector), layer_type);
    }

    NeuralNetwork net(std::move(layers_vector));
    net.setTrainingParams(epochs, mini_batch_size, learning_rate);

    return net;
}