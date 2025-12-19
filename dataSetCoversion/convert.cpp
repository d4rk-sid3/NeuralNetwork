#include "convert.hpp"

vector<int> Convertor::getLineInfo(string & line)
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

vector<int> Convertor::getCastlingInfo(string & line)
{
    vector<int> tab(4, 0);

    if (line == "-")
        return tab;

    for (char pos : line) {
        if (pos == 'K')
            tab[0] = values.at('K');
        else if (pos == 'Q')
            tab[1] = values.at('Q');
        else if (pos == 'k')
            tab[2] = values.at('k');
        else if (pos == 'q')
            tab[3] = values.at('q');
    }

    return tab;
}

vector<int> Convertor::getEnPassantInfo(string & line)
{
    vector<int> tab(2, -1);

    if (line == "-")
        return tab;

    tab[0] = line[0] - 'a';
    tab[1] = line[1] - '0';

    return tab;
}

vector<string> Convertor::getDataSet(string filepath)
{
    ifstream in(filepath);
    vector<string> res;
    string line;

    while (getline(in, line, '\n')) {
        res.push_back(line);
    }
    
    return res;
}

void Convertor::storeResult(vector<vector<int>> & res, string filepath)
{
    ofstream out(filepath, ios::app);

    for (auto & tmp : res) {
        for (auto & th : tmp) {
            out << th << " ";
        }
        out << endl;
    }
}

vector<int> Convertor::parseDataSetLine(string & newline)
{
    stringstream stmp(newline);
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
    for (size_t i = 6; i < spaceTab.size(); i++)
        tmpLabel.insert(tmpLabel.end(), spaceTab[i].begin(), spaceTab[i].end());

    auto a = labelMapping.at(tmpLabel);
    res.insert(res.end(), a.begin(), a.end());
    return res;
}

vector<vector<int>> Convertor::parseDataSet(vector<string> & infosTab)
{
    vector<vector<int>> allResults;
    
    for (auto & tmp : infosTab) {
        allResults.push_back(parseDataSetLine(tmp));
    }

    return allResults;
}

void Convertor::convertToIntFIle(string inputFile, string outputFile)
{
    vector<string> infosTab = getDataSet(inputFile);

    vector<vector<int>> allResults = parseDataSet(infosTab);

    storeResult(allResults, outputFile);
}

void Convertor::retrieveBoardInfoTest(string inputFile, string outputFile)
{
    vector<string> infosTab = getDataSet(inputFile);
    ofstream out(outputFile, ios::app);

    for (auto & tmp : infosTab) {
        stringstream stmp(tmp);
        vector<string> spaceTab;
        string ss;

        while (std::getline(stmp, ss,  ' '))
            spaceTab.push_back(ss);
        
        for (int i = 0; i < 5; i++)
            out << spaceTab[i] << " ";
        out << spaceTab[5] << " ";
        out << endl;
    }
}

vector<float> Convertor::retrieveBoardInfo(string line)
{

    const map<char, int> values = 
    {
        {'P', +1},
        {'N', +2},
        {'B', +3},
        {'R', +4},
        {'Q', +5},
        {'K', +6},
        {'p', -1},
        {'n', -2},
        {'b', -3},
        {'r', -4},
        {'q', -5},
        {'k', -6}
    };

    const map<string, int> sideToMove =
    {
        {"w", 1},
        {"b", -1}
    };

    stringstream stmp(line);
    vector<string> spaceTab;
    vector<float> tab;
    string ss;

    while (std::getline(stmp, ss,  ' ')) {
        spaceTab.push_back(ss);
    }

    auto getLInfo = [&](string & l) {
        vector<float> res;
        for (char pos : l) {
            if (pos >= '0' && pos <= '9') {
                int a = pos - '0';

                for (int i = 0; i < a; i++) {
                    res.push_back(0.0f);
                }
            } else
                res.push_back(static_cast<float>(values.at(pos)));
        }
        return res;
    };

    auto getCInfo = [&](string & l) {
        vector<float> res(4, 0.0f);

        if (l == "-")
            return res;

        for (char pos : l) {
            if (pos == 'K')
                res[0] = static_cast<float>(values.at('K'));
            else if (pos == 'Q')
                res[1] = static_cast<float>(values.at('Q'));
            else if (pos == 'k')
                res[2] = static_cast<float>(values.at('k'));
            else if (pos == 'q')
                res[3] = static_cast<float>(values.at('q'));
        }

        return res;
    };

    auto getEInfo = [&](string & l) {
        vector<float> res(2, -1.0f);

        if (l == "-")
            return res;

        res[0] = static_cast<float>(l[0] - 'a');
        res[1] = static_cast<float>(l[1] - '0');

        return res;
    };
        
    stringstream  sboard(spaceTab[0]);
    string l;

    while (std::getline(sboard, l,  '/')) {
        vector<float> resfloat = getLInfo(l);
        for (auto & val : resfloat)
            tab.push_back(val);
    }

    tab.push_back(static_cast<float>(sideToMove.at(spaceTab[1])));

    vector<float> rescastle = getCInfo(spaceTab[2]);
    for (auto & val : rescastle)
        tab.push_back(val);

    vector<float> enpassant = getEInfo(spaceTab[3]);
    for (auto & val : enpassant)
        tab.push_back(val);

    tab.push_back(static_cast<float>(stoi(spaceTab[4])));
    tab.push_back(static_cast<float>(stoi(spaceTab[5])));

    return tab;
}