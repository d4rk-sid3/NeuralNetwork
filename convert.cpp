#include "convert.hpp"

vector<int> getLineInfo(string & line)
{
    vector<int> tab;

    for (char pos : line) {
        if (pos >= '0' && pos <= '9') {
            int a = pos - '0';

            for (int i = 0; i < a; i++) {
                tab.push_back(0);
            }
        } else
            tab.push_back(values.at(pos));
    }
    return tab;
}

vector<int> getCastlingInfo(string & line)
{
    vector<int> tab(4, 0);

    if (line == "-")
        return tab;

    for (char pos : line) {
        tab.push_back(values.at(pos));
    }

    return tab;
}

vector<int> getEnPassantInfo(string & line)
{
    vector<int> tab(2, 0);

    if (line == "-")
        return tab;

    tab[0] = line[0] - 'a';
    tab[1] = line[1] - '0';

    return tab;
}

vector<string> getDataSet(string filepath)
{
    ifstream in(filepath);
    vector<string> res;
    string line;

    while (getline(in, line, '\n')) {
        res.push_back(line);
    }
    
    return res;
}

void storeResult(vector<vector<int>> & res, string filepath)
{
    ofstream out(filepath, ios::app);

    for (auto & tmp : res) {
        for (auto & th : tmp) {
            out << th << " ";
        }
        out << endl;
    }
}

vector<vector<int>> parseDataSet(vector<string> & infosTab)
{
    vector<vector<int>> allResults;
    
    for (auto & tmp : infosTab) {
        stringstream stmp(tmp);

        vector<string> spaceTab;

        vector<int> res;

        string ss;

        while (std::getline(stmp, ss,  ' ')) {
            spaceTab.push_back(ss);
        }
        
        stringstream  sboard(spaceTab[0]);
        string line;

        while (std::getline(sboard, line,  '/')) {
            vector<int> resint = getLineInfo(line);
            res.insert(res.end(), resint.begin(), resint.end());
        }

        res.push_back(sideToMove.at(spaceTab[1]));

        vector<int> rescastle = getCastlingInfo(spaceTab[2]);

        res.insert(res.end(), rescastle.begin(), rescastle.end());

        vector<int> enpassant = getEnPassantInfo(spaceTab[3]);

        res.insert(res.end(), enpassant.begin(), enpassant.end());

        res.push_back(stoi(spaceTab[4]));
    
        res.push_back(stoi(spaceTab[5]));

        string tmpLabel = "";

        for (int i = 6; i < spaceTab.size(); i++)
            tmpLabel.insert(tmpLabel.end(), spaceTab[i].begin(), spaceTab[i].end());
        
        res.push_back(labelMapping.at(tmpLabel));

        allResults.push_back(res);
        
    }

    return allResults;

}


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