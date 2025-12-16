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

const map<string, vector<int>> labelMapping =
{
    {"CheckWhite",	    {1, 0, 0, 0, 0}},
    {"CheckBlack",	    {0, 1, 0, 0, 0}},
    {"CheckmateWhite",	{0, 0, 1, 0, 0}},
    {"CheckmateBlack",	{0, 0, 0, 1, 0}},
    {"Nothing",	        {0, 0, 0, 0, 1}}
};

vector<vector<int>> parseDataSet(vector<string> & infosTab);
vector<int> parseDataSetLine(string & line);
vector<int> getLineInfo(string & line);
vector<int> getCastlingInfo(string & line);
vector<int> getEnPassantInfo(string & line);
void storeResult(vector<vector<int>> & res, string filepath);
vector<string> getDataSet(string filepath);


#endif /* !CONVERT_HPP */