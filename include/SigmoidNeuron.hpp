#include "librairies.hpp"
#include "IArtificialNeuron.hpp"
#include "IActivationFunction.hpp"

class SigmoidNeuron : public IArtificialNeuron {
    public:
        SigmoidNeuron(
            const IActivationFunction& activation,
            int n_weights,
            std::optional<std::vector<float>> weights = std::nullopt,
            std::optional<float> bias = std::nullopt
        );

        float compute_z(const std::vector<float>& inputs) override;
    
        float compute_activation() override;
    
        float get_output() override;
    
        std::vector<float>& get_weights() override;
    
        float& get_bias() override;

        float& get_z() override;
    
        NeuronType getType() const override;
    private:
        size_t m_nWeights;
        std::vector<float> m_weights;
        float m_activation;
        float m_output;
        float m_bias;
        float m_z;
        const IActivationFunction& m_activationfunction;
};