#ifndef   CONVERT_HPP
#define   CONVERT_HPP

#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <map>

using namespace std;

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

const map<string, int> labelMapping =
{
    {"CheckWhite",	1},
    {"CheckBlack",	2},
    {"CheckmateWhite",	3},
    {"CheckmateBlack",	4},
    {"Nothing",	0},
};

vector<vector<int>> parseDataSet(vector<string> & infosTab);

#endif /* !CONVERT_HPP */