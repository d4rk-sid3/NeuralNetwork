#pragma once
#include "librairies.hpp"

class DataLoader {
    public:
        static std::vector<TrainingSample> loadData(const std::string& filename);
};