#pragma once
#include "librairies.hpp"
#include "Layer.hpp"
#include "EvalMetrics.hpp"
#include "Activations.hpp"

class NeuralNetwork {
    public:
        explicit NeuralNetwork(std::vector<Layer> layers);
    
        size_t getNumLayers() const;
    
        Layer& getLayer(size_t index);
    
        std::vector<float> feedforward(const std::vector<float>& input);
    
        void SGD(const std::vector<TrainingSample>& training_data,
                 int epochs,
                 int mini_batch_size,
                 float eta,
                 const std::vector<TrainingSample>* test_data = nullptr);
    
        void updateMiniBatch(const std::vector<TrainingSample>& mini_batch, float eta);
    
        std::pair<std::vector<std::vector<float>>, std::vector<std::vector<std::vector<float>>>>
            backprop(const std::vector<float>& x, const std::vector<float>& y);
    
        EvalMetrics evaluate(const std::vector<TrainingSample>& test_data);

        void NeuralNetwork::save_config(const std::string& name);

        void NeuralNetwork::save_weights(const std::string& name);

        void NeuralNetwork::save_biases(const std::string& name);

        void NeuralNetwork::save(const std::string& name);

        void setEpochs(const int epochs);

        void setMiniBatchSize(const int mini_batch_size);

        void setLearningRate(const float eta);
    
    private:
        std::vector<Layer> m_layers;
        size_t m_numLayers;
        int m_epochs;
        int m_mini_batch_size;
        float m_eta;
    };