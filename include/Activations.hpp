#pragma once
#include "librairies.hpp"
#include "IActivationFunction.hpp"
#include "SigmoidActivationFunction.hpp"
#include "RELUActivationFunction.hpp"
#include "TANHActivationFunction.hpp"
#include "StepActivationFunction.hpp"

namespace Activations {
    inline SigmoidActivationFunction sigmoid;
    inline TANHActivationFunction tanh;
    inline RELUActivationFunction relu;
    inline StepActivationFunction step;
}