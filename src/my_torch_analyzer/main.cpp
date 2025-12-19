#include "../../include/MyTorchAnalyzer.hpp"

int main(int argc, char **argv) {
    try {
        MyTorchAnalyzer analyzer(
            "./librairies/libNeuralNetwork.so",
            "./librairies/libExperimentRunner.so"
        );
        shell.run();
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << "\n";
        return 1;
    }
    return 0;
}