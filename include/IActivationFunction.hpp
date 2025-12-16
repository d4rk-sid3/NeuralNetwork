#include "librairies.hpp"

class IActivationFunction {
    public:
        virtual float apply(const float z) = 0;
        virtual ActivationFunctionType getType() const = 0;
};
