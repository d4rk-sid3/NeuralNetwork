#include "convert.hpp"

int main(int ac, char **av)
{
    if (string(av[1]) == "--help") {
        cout << "Usage: ./convert <input_file> [ <output_file> ]" << endl;
        cout << "<input_file> : path to the input dataset file." << endl;
        cout << "<output_file> : (optional) path to the output file to store results." << endl;
        cout << "If output_file is not provided, results will be printed to standard output." << endl;
        return 0;
    }

    vector<string> infosTab = getDataSet(av[1]);

    vector<vector<int>> allResults = parseDataSet(infosTab);
    
    if (ac == 3)
        storeResult(allResults, av[2]);
    else
        for (auto & tmp : allResults) {
            for (auto & th : tmp) {
                cout << th << " ";
            }
            cout << endl;
        }
}