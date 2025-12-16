#include "librairies.hpp"
#include "IArtificialNeuron.hpp"

class SigmoidNeuron : public IArtificialNeuron {
    public:
        NeuronType type = NeuronType::SIGMOID;
    private:
        size_t m_nWeights;
        std::vector<float> m_weights;
        float m_activation;
        float m_output;
        float m_bias;
}