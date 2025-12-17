#pragma once
#include "librairies.hpp"
#include "Layer.hpp"
#include "EvalMetrics.hpp"

using TrainingSample = std::pair<std::vector<float>, std::vector<float>>;

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
    
    private:
        std::vector<Layer> m_layers;
        size_t m_numLayers;
    };