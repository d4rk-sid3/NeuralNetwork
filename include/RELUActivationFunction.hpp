#pragma once
#include "librairies.hpp"
#include "IActivationFunction.hpp"

class RELUActivationFunction : public IActivationFunction {
    public:
        RELUActivationFunction() = default;

        float apply(const float z) const override {
            return std::max(0.0f, z);
        }

        ActivationFunctionType getType() const override {
            return ActivationFunctionType::RELU;
        }
};