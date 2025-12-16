#pragma once
#include "librairies.hpp"
#include "IArtificialNeuron.hpp"
#include "IActivationFunction.hpp"

class Perceptron : public IArtificialNeuron {
    public:
        Perceptron(
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
                for (auto& w : m_weights) w = dist(gen);
            }
    
            m_bias = bias.value_or(dist(gen));
            m_z = 0.f;
            m_output = 0.f;
        }
        
        float compute_z(const std::vector<float>& inputs) override {
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
    
        float compute_activation() override {
            // Step function: output = 1 si z >= 0, sinon 0
            m_output = (m_z >= 0.f) ? 1.f : 0.f;
            return m_output;
        }
    
        float get_output() override {
            return m_output;
        }
    
        std::vector<float>& get_weights() override {
            return m_weights;
        }
    
        float& get_bias() override {
            return m_bias;
        }
    
        float& get_z() override {
            return m_z;
        }
    
        NeuronType getType() const override {
            return NeuronType::PERCEPTRON;
        }
    
    private:
        size_t m_nWeights;
        std::vector<float> m_weights;
        float m_bias;
        float m_z;
        float m_output;
    };
    