#include "../../include/MyTorchAnalyzer.hpp"

MyTorchAnalyzer::MyTorchAnalyzer(const std::string& nnLibraryPath,
    const std::string& runnerLibraryPath)
: currentNN(nullptr)
{
    // Load NeuralNetwork dynamically
    nnLoader = std::make_unique<DLLoader<NeuralNetwork>>(nnLibraryPath);
    runnerLoader = std::make_unique<DLLoader<ExperimentRunner>>(runnerLibraryPath);

    currentNN = nullptr;
    runner = runnerLoader->getInstance();

    currentNN = new NeuralNetwork(runner->loadNetwork("128-64-RELU"));
}

MyTorchAnalyzer::~MyTorchAnalyzer()
{
    delete currentNN;
    delete runner;
}

void MyTorchAnalyzer::predict(const std::string &filepath)
{
    runner->predict(*currentNN, filepath);
    return;
}
