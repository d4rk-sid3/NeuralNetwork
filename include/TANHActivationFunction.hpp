#include "librairies.hpp"
#include "IActivationFunction.hpp"

class TANHActivationFunction : public IActivationFunction {
    public:
        ActivationFunctionType type = ActivationFunctionType::TANH;
        float apply(const float z) override {
            return std::tanh(z);
        }
};
