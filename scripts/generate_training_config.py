import json
import os

def get_int(prompt):
    while True:
        try:
            value = int(input(prompt))
            if value <= 0:
                print("Please enter a positive integer.")
                continue
            return value
        except ValueError:
            print("Invalid input. Please enter an integer.")

def get_float(prompt):
    while True:
        try:
            value = float(input(prompt))
            if value <= 0:
                print("Please enter a positive number.")
                continue
            return value
        except ValueError:
            print("Invalid input. Please enter a number.")

def main():
    print("=== Training Configuration Generator ===")
    
    epochs = get_int("Number of epochs: ")
    mini_batch_size = get_int("Mini-batch size: ")
    eta = get_float("Learning rate (eta): ")

    config = {
        "epochs": epochs,
        "mini_batch_size": mini_batch_size,
        "eta": eta
    }

    # Ask user for output file path
    while True:
        filename = input("\nPath to save the training config JSON file: ")
        dir_path = os.path.dirname(os.path.abspath(filename))
        if not os.path.exists(dir_path):
            print("Directory does not exist. Please enter a valid path.")
        else:
            break

    # Save JSON
    with open(filename, "w") as f:
        json.dump(config, f, indent=4)

    print(f"\nFile '{filename}' successfully generated!")
    print(json.dumps(config, indent=4))

if __name__ == "__main__":
    main()
