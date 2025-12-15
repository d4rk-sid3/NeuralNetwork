#include "librairies.hpp"
#include "IActivationFunction.hpp"

class SigmoidActivationFunction : public IActivationFunction {
    public:
        ActivationFunctionType type = ActivationFunctionType::SIGMOID;
        float apply(const float z) override {
            return  1.0f / (1.0f + std::exp(-z));
        }
};