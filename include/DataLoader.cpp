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