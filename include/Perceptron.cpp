#include "Perceptron.hpp"

Perceptron::Perceptron(
    int n_weights,
    std::optional<std::vector<float>> weights = std::nullopt,
    std::optional<float> bias = std::nullopt
)
: m_nWeights(n_weights)
{
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_real_distribution<float> dist(-1.f, 1.f);

    if (weights) {
        m_weights = std::move(*weights);
        if (m_weights.size() != m_nWeights)
            throw std::invalid_argument("Weights size does not match n_weights");
    } else {
        m_weights.resize(m_nWeights);
        for (auto& w : m_weights)
            w = dist(gen);
    }

    m_bias = bias.value_or(dist(gen));
    m_z = 0.f;
    m_output = 0.f;
}

float Perceptron::compute_z(const std::vector<float>& inputs)
{
    if (inputs.size() != m_weights.size()) {
        throw std::invalid_argument(
            "Input size (" + std::to_string(inputs.size()) +
            ") does not match number of weights (" + std::to_string(m_weights.size()) + ")"
        );
    }

    float z = m_bias;
    for (size_t i = 0; i < m_weights.size(); ++i) {
        z += m_weights[i] * inputs[i];
    }

    m_z = z;
    return z;
}

float Perceptron::compute_activation()
{
    m_activation = (m_z >= 0.f) ? 1.f : 0.f;
    m_output = m_activation;
    return m_output;
}

float Perceptron::get_output()
{
    return m_output;
}

std::vector<float>& Perceptron::get_weights()
{
    return m_weights;
}

float& Perceptron::get_bias()
{
    return m_bias;
}

float& Perceptron::get_z()
{
    return m_z;
}

NeuronType Perceptron::getType() const 
{
    return NeuronType::PERCEPTRON;
}