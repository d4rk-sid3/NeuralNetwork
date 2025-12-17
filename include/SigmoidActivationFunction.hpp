#pragma once
#include "librairies.hpp"
#include "IActivationFunction.hpp"

class SigmoidActivationFunction : public IActivationFunction {
    public:
        SigmoidActivationFunction() = default;

        float apply(const float z) const override {
            return  1.0f / (1.0f + std::exp(-z));
        }

        ActivationFunctionType getType() const override {
            return ActivationFunctionType::SIGMOID;
        }
};