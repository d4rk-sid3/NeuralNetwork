#include "librairies.hpp"
#include "IActivationFunction.hpp"

class RELUActivationFunction : public IActivationFunction {
    public:
        ActivationFunctionType type = ActivationFunctionType::RELU;
        float apply(const float z) override {
            return std::max(0.0f, z);
        }
};