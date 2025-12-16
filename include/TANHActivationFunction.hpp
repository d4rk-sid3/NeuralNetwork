#pragma once
#include "librairies.hpp"
#include "IActivationFunction.hpp"

class TANHActivationFunction : public IActivationFunction {
    public:

        TANHActivationFunction() = default;

        float apply(const float z) override {
            return std::tanh(z);
        }

        ActivationFunctionType getType() const override {
            return ActivationFunctionType::TANH;
        }
};
