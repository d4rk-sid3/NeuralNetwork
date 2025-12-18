#pragma once
#include "librairies.hpp"

class ExperimentRunner {
    public:
        static std::vector<TrainingSample> loadData(const std::string& filename);
};