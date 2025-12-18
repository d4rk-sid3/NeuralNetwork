#include "DataLoader.hpp"

std::vector<TrainingSample> DataLoader::loadData(const std::string& filename)
{
    std::ifstream file(filename);
    if (!file.is_open()) {
        throw std::runtime_error("Unable to open data file: " + filename);
    }

    std::vector<TrainingSample> dataset;
    std::string line;

    while (std::getline(file, line)) {
        if (line.empty()) continue;

        std::stringstream ss(line);
        std::vector<float> values;
        float v;

        // Read all the values on the line
        while (ss >> v) {
            values.push_back(v);
        }

        // Check the validity of the line
        if (values.size() != 78) {
            throw std::runtime_error("Invalid data line: not enough values. Expected number of values : 78");
        }

        // Input / output separation
        const size_t output_size = 5;
        const size_t input_size = values.size() - output_size;

        std::vector<float> input(values.begin(), values.begin() + input_size);
        std::vector<float> output(values.begin() + input_size, values.end());

        dataset.emplace_back(std::move(input), std::move(output));
    }

    return dataset;
}

std::vector<std::vector<float>> DataLoader::load_weights(const std::string& path)
{
    std::ifstream file(path, std::ios::binary);
    
    if (!file.is_open()) {
        throw std::runtime_error("Cannot open weights file: " + path);
    }

    std::vector<std::vector<float>> weights;

    while (true) {
        int n_weights = 0;

        // Read the weight of each neuron
        file.read(reinterpret_cast<char*>(&n_weights), sizeof(int));

        // Proper end file
        if (file.eof()) {
            break;
        }

        if (!file || n_weights <= 0) {
            throw std::runtime_error("Corrupted weights file: " + path);
        }

        std::vector<float> neuron_weights(n_weights);
        file.read(reinterpret_cast<char*>(neuron_weights.data()),
                  n_weights * sizeof(float));

        if (!file) {
            throw std::runtime_error("Corrupted weights file (weights read): " + path);
        }

        weights.push_back(std::move(neuron_weights));
    }

    file.close();
    return weights;
}
