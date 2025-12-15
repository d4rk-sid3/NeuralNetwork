import React, { useState, useEffect } from 'react';

// Mock training evolution data for 20 epochs
const mockTrainingHistory = [
  { epoch: 1, training_loss: 1.245, validation_accuracy: 45.2 },
  { epoch: 2, training_loss: 1.089, validation_accuracy: 52.8 },
  { epoch: 3, training_loss: 0.952, validation_accuracy: 58.3 },
  { epoch: 4, training_loss: 0.847, validation_accuracy: 63.7 },
  { epoch: 5, training_loss: 0.765, validation_accuracy: 68.1 },
  { epoch: 6, training_loss: 0.698, validation_accuracy: 71.9 },
  { epoch: 7, training_loss: 0.642, validation_accuracy: 75.2 },
  { epoch: 8, training_loss: 0.594, validation_accuracy: 77.8 },
  { epoch: 9, training_loss: 0.553, validation_accuracy: 80.1 },
  { epoch: 10, training_loss: 0.518, validation_accuracy: 82.3 },
  { epoch: 11, training_loss: 0.487, validation_accuracy: 84.2 },
  { epoch: 12, training_loss: 0.461, validation_accuracy: 85.8 },
  { epoch: 13, training_loss: 0.438, validation_accuracy: 87.1 },
  { epoch: 14, training_loss: 0.418, validation_accuracy: 88.3 },
  { epoch: 15, training_loss: 0.401, validation_accuracy: 89.2 },
  { epoch: 16, training_loss: 0.386, validation_accuracy: 90.1 },
  { epoch: 17, training_loss: 0.373, validation_accuracy: 90.8 },
  { epoch: 18, training_loss: 0.362, validation_accuracy: 91.4 },
  { epoch: 19, training_loss: 0.352, validation_accuracy: 91.9 },
  { epoch: 20, training_loss: 0.343, validation_accuracy: 92.5 },
  { epoch: 21, training_loss: 0.401, validation_accuracy: 89.2 },
  { epoch: 22, training_loss: 0.386, validation_accuracy: 90.1 },
  { epoch: 23, training_loss: 0.373, validation_accuracy: 90.8 },
  { epoch: 24, training_loss: 0.362, validation_accuracy: 91.4 },
  { epoch: 25, training_loss: 0.352, validation_accuracy: 91.9 },
  { epoch: 26, training_loss: 0.343, validation_accuracy: 92.5 }
];

// Mock real-time predictions for current board state
const mockCurrentPredictions = [
  { prediction: 'Nothing', probability: 0.65, color: 'bg-green-500' },
  { prediction: 'Check', probability: 0.20, color: 'bg-yellow-500' },
  { prediction: 'Checkmate', probability: 0.10, color: 'bg-red-500' },
  { prediction: 'Stalemate', probability: 0.05, color: 'bg-blue-500' }
];

const BenchmarkDashboard = () => {
  const [currentEpoch, setCurrentEpoch] = useState(20);
  const [isSimulating, setIsSimulating] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Get current metrics based on epoch
  const currentMetrics = mockTrainingHistory[currentEpoch - 1];
  const bestAccuracy = Math.max(...mockTrainingHistory.map(d => d.validation_accuracy));
  const totalEpochs = mockTrainingHistory.length;

  // Simulate real-time training progression
  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setCurrentEpoch(prev => {
          if (prev >= totalEpochs) {
            setIsSimulating(false);
            return totalEpochs;
          }
          return prev + 1;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isSimulating, totalEpochs]);

  const handleSimulate = () => {
    setCurrentEpoch(1);
    setIsSimulating(true);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Normalize data for visualization
  const normalizeValue = (value, min, max) => {
    return ((value - min) / (max - min)) * 100;
  };

  const minLoss = Math.min(...mockTrainingHistory.map(d => d.training_loss));
  const maxLoss = Math.max(...mockTrainingHistory.map(d => d.training_loss));
  const minAccuracy = Math.min(...mockTrainingHistory.map(d => d.validation_accuracy));
  const maxAccuracy = Math.max(...mockTrainingHistory.map(d => d.validation_accuracy));

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section - Responsive */}
        <div className="mb-6 sm:mb-8 border-b border-gray-800 pb-4 sm:pb-6">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                EPITECH My_Torch Analyzer
              </h1>
              <p className="text-xs sm:text-sm text-gray-400">
                Chess Neural Network - Supervised Learning Benchmark Dashboard
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors border border-gray-700 text-sm sm:text-base"
              >
                Refresh Data
              </button>
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                  isSimulating 
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSimulating ? 'Training...' : 'Simulate Training'}
              </button>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators - Fully Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8">
          
          {/* Current Epoch Card */}
          <div className="bg-gray-900 rounded-lg p-4 sm:p-5 md:p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Current Epoch
              </span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {currentEpoch} <span className="text-xl sm:text-2xl text-gray-500">/ {totalEpochs}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 mt-3 sm:mt-4">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentEpoch / totalEpochs) * 100}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Progress: {((currentEpoch / totalEpochs) * 100).toFixed(1)}%
            </div>
          </div>

          {/* Current Training Loss Card */}
          <div className="bg-gray-900 rounded-lg p-4 sm:p-5 md:p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Training Loss
              </span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {currentMetrics.training_loss.toFixed(4)}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              {currentEpoch > 1 && (
                <span className="text-green-400">
                  {((1 - currentMetrics.training_loss / mockTrainingHistory[0].training_loss) * 100).toFixed(1)}% reduction
                </span>
              )}
              {currentEpoch === 1 && <span>Initial value</span>}
            </div>
          </div>

          {/* Best Validation Accuracy Card */}
          <div className="bg-gray-900 rounded-lg p-4 sm:p-5 md:p-6 border border-gray-800 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Best Accuracy
              </span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {bestAccuracy.toFixed(1)}<span className="text-xl sm:text-2xl text-gray-500">%</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Current: {currentMetrics.validation_accuracy.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Evolution Timeline Charts - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8">
          
          {/* Training Loss Evolution Chart */}
          <div className="bg-gray-900 rounded-lg p-4 sm:p-5 md:p-6 border border-gray-800">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">
                Training Loss Evolution
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Loss function convergence over epochs
              </p>
            </div>
            
            <div className="relative h-48 sm:h-56 md:h-64">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-1 sm:pr-2">
                <span>{maxLoss.toFixed(2)}</span>
                <span>{((maxLoss + minLoss) / 2).toFixed(2)}</span>
                <span>{minLoss.toFixed(2)}</span>
              </div>
              
              {/* Chart area */}
              <div className="ml-8 sm:ml-10 md:ml-12 h-full flex items-end justify-between gap-0.5 sm:gap-1">
                {mockTrainingHistory.slice(0, currentEpoch).map((data, index) => {
                  const height = 100 - normalizeValue(data.training_loss, minLoss, maxLoss);
                  const chartHeight = typeof window !== 'undefined' && window.innerWidth < 640 ? 1.8 : 
                                     typeof window !== 'undefined' && window.innerWidth < 768 ? 2.1 : 2.4;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center group">
                      <div className="relative w-full">
                        <div 
                          className="w-full bg-red-500/80 hover:bg-red-400 rounded-t transition-all duration-200"
                          style={{ height: `${height * chartHeight}px` }}
                        />
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap border border-gray-700 z-10">
                          E{data.epoch}: {data.training_loss.toFixed(4)}
                        </div>
                      </div>
                      {index % 5 === 0 && (
                        <div className="text-xs text-gray-600 mt-1 sm:mt-2">{data.epoch}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-3 sm:mt-4 text-center text-xs text-gray-500 uppercase tracking-wider">
              Epoch Number
            </div>
          </div>

          {/* Validation Accuracy Evolution Chart */}
          <div className="bg-gray-900 rounded-lg p-4 sm:p-5 md:p-6 border border-gray-800">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">
                Validation Accuracy Evolution
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Model performance improvement over time
              </p>
            </div>
            
            <div className="relative h-48 sm:h-56 md:h-64">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-1 sm:pr-2">
                <span>{maxAccuracy.toFixed(0)}%</span>
                <span>{((maxAccuracy + minAccuracy) / 2).toFixed(0)}%</span>
                <span>{minAccuracy.toFixed(0)}%</span>
              </div>
              
              {/* Chart area */}
              <div className="ml-8 sm:ml-10 md:ml-12 h-full flex items-end justify-between gap-0.5 sm:gap-1">
                {mockTrainingHistory.slice(0, currentEpoch).map((data, index) => {
                  const height = normalizeValue(data.validation_accuracy, minAccuracy, maxAccuracy);
                  const chartHeight = typeof window !== 'undefined' && window.innerWidth < 640 ? 1.8 : 
                                     typeof window !== 'undefined' && window.innerWidth < 768 ? 2.1 : 2.4;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center group">
                      <div className="relative w-full">
                        <div 
                          className="w-full bg-green-500/80 hover:bg-green-400 rounded-t transition-all duration-200"
                          style={{ height: `${height * chartHeight}px` }}
                        />
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap border border-gray-700 z-10">
                          E{data.epoch}: {data.validation_accuracy.toFixed(1)}%
                        </div>
                      </div>
                      {index % 5 === 0 && (
                        <div className="text-xs text-gray-600 mt-1 sm:mt-2">{data.epoch}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-3 sm:mt-4 text-center text-xs text-gray-500 uppercase tracking-wider">
              Epoch Number
            </div>
          </div>
        </div>

        {/* Real-Time Predictions - Full Width, Responsive Padding */}
        <div className="bg-gray-900 rounded-lg p-4 sm:p-5 md:p-6 border border-gray-800">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">
              Current Board State Predictions
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Neural network classification probabilities for FEN state analysis
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {mockCurrentPredictions.map((pred, index) => (
              <div key={index} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-700 w-6 sm:w-8 flex-shrink-0">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold text-white text-base sm:text-lg">
                        {pred.prediction}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {pred.prediction === 'Nothing' ? 'Normal position - No special state' :
                         pred.prediction === 'Check' ? 'King under attack' :
                         pred.prediction === 'Checkmate' ? 'Game over - King captured' :
                         'Draw position - No legal moves'}
                      </div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right ml-9 sm:ml-0">
                    <div className="text-xl sm:text-2xl font-bold text-white">
                      {(pred.probability * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      confidence
                    </div>
                  </div>
                </div>
                
                {/* Progress bar - Responsive height */}
                <div className="w-full bg-gray-800 rounded-full h-3 sm:h-4 overflow-hidden">
                  <div 
                    className={`${pred.color} h-3 sm:h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2`}
                    style={{ width: `${pred.probability * 100}%` }}
                  >
                    {pred.probability > 0.15 && (
                      <span className="text-xs font-semibold text-white hidden sm:inline">
                        {(pred.probability * 100).toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Statistics - Responsive Grid */}
          <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-800">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {mockCurrentPredictions.length}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                  Classes
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {(Math.max(...mockCurrentPredictions.map(p => p.probability)) * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                  Max Confidence
                </div>
              </div>
              <div>
                <div className="text-base sm:text-2xl font-bold text-white truncate px-1">
                  {mockCurrentPredictions[0].prediction}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                  Predicted State
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info - Responsive Text */}
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600 px-2">
          <p>EPITECH Project - My_Torch Custom Neural Network Framework</p>
          <p className="mt-1">Binary: my_torch_analyzer | Supervised Learning for Chess State Classification</p>
        </div>

      </div>
    </div>
  );
};

export default BenchmarkDashboard;