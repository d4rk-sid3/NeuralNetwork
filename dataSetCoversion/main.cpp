#include "convert.hpp"

int main(int ac, char **av)
{
    if (string(av[1]) == "--help") {
        cout << "Usage: ./convert [--convert | --tests ] <input_file> [ <output_file> ]" << endl;
        cout << "--convert : Convert the dataset from input_file to integer format." << endl;
        cout << "--tests : Get board info without label." << endl;
        cout << "<input_file> : path to the input dataset file." << endl;
        cout << "<output_file> : (optional) path to the output file to store results." << endl;
        cout << "If output_file is not provided, " << endl;
        cout << "   - for --convert, results will be stored in 'dataSetInt.txt'." << endl;
        cout << "   - for --tests, results will be stored in 'boardTest.txt'." << endl;
        return 0;
    }
    if (ac < 3 || ac > 4) {
        cerr << "Invalid number of arguments. Use --help for usage information." << endl;
        return 1;
    }
    if (string(av[1]) == "--convert") {
        Convertor convertor;

        if (ac == 4)
            convertor.convertToIntFIle(av[2], av[3]);
        else
            convertor.convertToIntFIle(av[2]);
        
        return 0;
    } else if (string(av[1]) == "--tests") {
        Convertor convertor;

        if (ac == 4)
            convertor.retrieveBoardInfoTest(av[2], av[3]);
        else
            convertor.retrieveBoardInfoTest(av[2]);
        
        return 0;
    }
}
