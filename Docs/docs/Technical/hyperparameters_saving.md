# Neural Network Parameters Storage Documentation

# 1. Configuration File (`JSON`)

The architecture and hyperparameters of the neural network are defined in a JSON file. This file describes the layers, their size, neuron type, and the corresponding files for storing weights and biases. Hyperparameters such as learning rate and batch size are also included.

**Example JSON Configuration:**

```json
{
  "layers": [
    {
      "type": "input",
      "size": 784,
      "neuron_type": "perceptron",
      "weights_file": null,
      "biases_file": null
    },
    {
      "type": "hidden",
      "size": 128,
      "neuron_type": "sigmoid",
      "weights_file": "weights_layer1.bin",
      "biases_file": "biases_layer1.bin"
    },
    {
      "type": "hidden",
      "size": 64,
      "neuron_type": "relu",
      "weights_file": "weights_layer2.bin",
      "biases_file": "biases_layer2.bin"
    },
    {
      "type": "output",
      "size": 10,
      "neuron_type": "sigmoid",
      "weights_file": "weights_layer3.bin",
      "biases_file": "biases_layer3.bin"
    }
  ],
  "learning_rate": 0.01,
  "batch_size": 32
}
```

**Explanation of Fields:**

| Field         | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| type          | Layer type: input, hidden, or output.                                       |
| size          | Number of neurons in the layer.                                             |
| neuron_type   | Function of activation for the layer: sigmoid, relu, perceptron, etc.       |
| weights_file  | Binary file storing the weights for this layer. `null` for input layers.    |
| biases_file   | Binary file storing the biases for this layer. `null` for input layers.     |
| learning_rate | Learning rate for gradient descent.                                         |
| batch_size    | Size of mini-batches used during training.                                  |

# 2. Binary Storage Format

Weights and biases are stored in separate **binary files (`.bin`)** for each layer. This ensures **efficient reading/writing** and compact storage.

## 2.1 Weights File (`weights_layerX.bin`)

For a given layer, all the neurons’ weights are stored sequentially.

**Structure per neuron:**

1. **Number of weights** (`int`) – indicates how many inputs this neuron has.  
2. **Weights** (`float`) – consecutive values corresponding to each input.

**Binary layout (per neuron):**
```
[int n_weights][float w0][float w1]...[float w(n_weights-1)]
```

**Sequence in the layer file: The file contains all neurons in order.**
```
Neuron1 weights
Neuron2 weights
...
NeuronN weights
```
## 2.2 Biases File (`biases_layerX.bin`)

For each neuron, the bias is stored as a single `float`. Neurons are stored in the same order as the weights.

**Binary layout:**
```
[float bias_neuron1][float bias_neuron2]...[float bias_neuronN]
```
# 3. Summary

- Each layer has **two separate binary files**: one for weights and one for biases.  
- **Weights file**: stores the number of inputs per neuron followed by its weights, repeated for all neurons in the layer.  
- **Biases file**: stores one float per neuron in the same order as the weights.  
- The **JSON configuration** links the files to the layer and provides global hyperparameters such as learning rate and batch size.  
- This design allows **easy loading of layers and neurons**, while keeping storage efficient and structured.
