import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Scatter, ScatterChart, ZAxis } from 'recharts';

// Mock data representing neural network benchmark results
const MOCK_DATA = [
  {
    "experiment_id": "exp_001",
    "date": "2025-12-15T10:00:00Z",
    "network_config": {
      "num_layers": 4,
      "layers": [
        { "type": "input", "size": 784, "neuron_type": "perceptron" },
        { "type": "hidden", "size": 128, "neuron_type": "relu" },
        { "type": "hidden", "size": 64, "neuron_type": "sigmoid" },
        { "type": "output", "size": 10, "neuron_type": "sigmoid" }
      ],
      "learning_rate": 0.01,
      "batch_size": 32
    },
    "training_data_size": 60000,
    "performance": {
      "accuracy": 0.845,
      "loss": 0.45,
      "precision": 0.83,
      "recall": 0.82,
      "f1_score": 0.825,
      "training_duration_sec": 125.4,
      "multithreaded": true,
      "threads_used": 8
    },
    "timestamps": {
      "start_time": "2025-12-15T10:00:00Z",
      "end_time": "2025-12-15T10:02:05Z"
    },
    "notes": "Initial baseline run"
  },
  {
    "experiment_id": "exp_001",
    "date": "2025-12-15T11:00:00Z",
    "network_config": {
      "num_layers": 4,
      "layers": [
        { "type": "input", "size": 784, "neuron_type": "perceptron" },
        { "type": "hidden", "size": 128, "neuron_type": "relu" },
        { "type": "hidden", "size": 64, "neuron_type": "sigmoid" },
        { "type": "output", "size": 10, "neuron_type": "sigmoid" }
      ],
      "learning_rate": 0.01,
      "batch_size": 32
    },
    "training_data_size": 60000,
    "performance": {
      "accuracy": 0.895,
      "loss": 0.32,
      "precision": 0.88,
      "recall": 0.87,
      "f1_score": 0.875,
      "training_duration_sec": 123.1,
      "multithreaded": true,
      "threads_used": 8
    },
    "timestamps": {
      "start_time": "2025-12-15T11:00:00Z",
      "end_time": "2025-12-15T11:02:03Z"
    },
    "notes": "Second epoch showing improvement"
  },
  {
    "experiment_id": "exp_001",
    "date": "2025-12-15T12:00:00Z",
    "network_config": {
      "num_layers": 4,
      "layers": [
        { "type": "input", "size": 784, "neuron_type": "perceptron" },
        { "type": "hidden", "size": 128, "neuron_type": "relu" },
        { "type": "hidden", "size": 64, "neuron_type": "sigmoid" },
        { "type": "output", "size": 10, "neuron_type": "sigmoid" }
      ],
      "learning_rate": 0.01,
      "batch_size": 32
    },
    "training_data_size": 60000,
    "performance": {
      "accuracy": 0.925,
      "loss": 0.25,
      "precision": 0.92,
      "recall": 0.91,
      "f1_score": 0.915,
      "training_duration_sec": 121.8,
      "multithreaded": true,
      "threads_used": 8
    },
    "timestamps": {
      "start_time": "2025-12-15T12:00:00Z",
      "end_time": "2025-12-15T12:02:02Z"
    },
    "notes": "Convergence approaching"
  },
  {
    "experiment_id": "exp_001",
    "date": "2025-12-16T14:35:00Z",
    "network_config": {
      "num_layers": 4,
      "layers": [
        { "type": "input", "size": 784, "neuron_type": "perceptron" },
        { "type": "hidden", "size": 128, "neuron_type": "relu" },
        { "type": "hidden", "size": 64, "neuron_type": "sigmoid" },
        { "type": "output", "size": 10, "neuron_type": "sigmoid" }
      ],
      "learning_rate": 0.01,
      "batch_size": 32
    },
    "training_data_size": 60000,
    "performance": {
      "accuracy": 0.945,
      "loss": 0.21,
      "precision": 0.93,
      "recall": 0.92,
      "f1_score": 0.925,
      "training_duration_sec": 125.4,
      "multithreaded": true,
      "threads_used": 8
    },
    "timestamps": {
      "start_time": "2025-12-16T14:35:00Z",
      "end_time": "2025-12-16T14:37:05Z"
    },
    "notes": "Peak performance achieved"
  },
  {
    "experiment_id": "exp_002",
    "date": "2025-12-15T13:00:00Z",
    "network_config": {
      "num_layers": 5,
      "layers": [
        { "type": "input", "size": 784, "neuron_type": "perceptron" },
        { "type": "hidden", "size": 256, "neuron_type": "relu" },
        { "type": "hidden", "size": 128, "neuron_type": "relu" },
        { "type": "hidden", "size": 64, "neuron_type": "relu" },
        { "type": "output", "size": 10, "neuron_type": "softmax" }
      ],
      "learning_rate": 0.005,
      "batch_size": 64
    },
    "training_data_size": 60000,
    "performance": {
      "accuracy": 0.875,
      "loss": 0.38,
      "precision": 0.86,
      "recall": 0.85,
      "f1_score": 0.855,
      "training_duration_sec": 245.2,
      "multithreaded": true,
      "threads_used": 8
    },
    "timestamps": {
      "start_time": "2025-12-15T13:00:00Z",
      "end_time": "2025-12-15T13:04:05Z"
    },
    "notes": "Deeper architecture test"
  },
  {
    "experiment_id": "exp_002",
    "date": "2025-12-15T14:00:00Z",
    "network_config": {
      "num_layers": 5,
      "layers": [
        { "type": "input", "size": 784, "neuron_type": "perceptron" },
        { "type": "hidden", "size": 256, "neuron_type": "relu" },
        { "type": "hidden", "size": 128, "neuron_type": "relu" },
        { "type": "hidden", "size": 64, "neuron_type": "relu" },
        { "type": "output", "size": 10, "neuron_type": "softmax" }
      ],
      "learning_rate": 0.005,
      "batch_size": 64
    },
    "training_data_size": 60000,
    "performance": {
      "accuracy": 0.915,
      "loss": 0.28,
      "precision": 0.90,
      "recall": 0.89,
      "f1_score": 0.895,
      "training_duration_sec": 242.8,
      "multithreaded": true,
      "threads_used": 8
    },
    "timestamps": {
      "start_time": "2025-12-15T14:00:00Z",
      "end_time": "2025-12-15T14:04:03Z"
    },
    "notes": "Improved after second epoch"
  },
  {
    "experiment_id": "exp_002",
    "date": "2025-12-16T09:00:00Z",
    "network_config": {
      "num_layers": 5,
      "layers": [
        { "type": "input", "size": 784, "neuron_type": "perceptron" },
        { "type": "hidden", "size": 256, "neuron_type": "relu" },
        { "type": "hidden", "size": 128, "neuron_type": "relu" },
        { "type": "hidden", "size": 64, "neuron_type": "relu" },
        { "type": "output", "size": 10, "neuron_type": "softmax" }
      ],
      "learning_rate": 0.005,
      "batch_size": 64
    },
    "training_data_size": 60000,
    "performance": {
      "accuracy": 0.935,
      "loss": 0.22,
      "precision": 0.93,
      "recall": 0.92,
      "f1_score": 0.925,
      "training_duration_sec": 240.1,
      "multithreaded": true,
      "threads_used": 8
    },
    "timestamps": {
      "start_time": "2025-12-16T09:00:00Z",
      "end_time": "2025-12-16T09:04:00Z"
    },
    "notes": "Near-optimal performance"
  },
  {
    "experiment_id": "exp_003",
    "date": "2025-12-16T15:00:00Z",
    "network_config": {
      "num_layers": 3,
      "layers": [
        { "type": "input", "size": 784, "neuron_type": "perceptron" },
        { "type": "hidden", "size": 512, "neuron_type": "tanh" },
        { "type": "output", "size": 10, "neuron_type": "softmax" }
      ],
      "learning_rate": 0.02,
      "batch_size": 16
    },
    "training_data_size": 60000,
    "performance": {
      "accuracy": 0.815,
      "loss": 0.52,
      "precision": 0.80,
      "recall": 0.79,
      "f1_score": 0.795,
      "training_duration_sec": 98.5,
      "multithreaded": false,
      "threads_used": 1
    },
    "timestamps": {
      "start_time": "2025-12-16T15:00:00Z",
      "end_time": "2025-12-16T15:01:38Z"
    },
    "notes": "Lightweight architecture benchmark"
  },
  {
    "experiment_id": "exp_003",
    "date": "2025-12-16T16:00:00Z",
    "network_config": {
      "num_layers": 3,
      "layers": [
        { "type": "input", "size": 784, "neuron_type": "perceptron" },
        { "type": "hidden", "size": 512, "neuron_type": "tanh" },
        { "type": "output", "size": 10, "neuron_type": "softmax" }
      ],
      "learning_rate": 0.02,
      "batch_size": 16
    },
    "training_data_size": 60000,
    "performance": {
      "accuracy": 0.865,
      "loss": 0.41,
      "precision": 0.85,
      "recall": 0.84,
      "f1_score": 0.845,
      "training_duration_sec": 96.2,
      "multithreaded": false,
      "threads_used": 1
    },
    "timestamps": {
      "start_time": "2025-12-16T16:00:00Z",
      "end_time": "2025-12-16T16:01:36Z"
    },
    "notes": "Second epoch improvement"
  }
];

// Component: Experiment selector dropdown
const ExperimentSelector = ({ experiments, selectedExperiment, onSelect }) => {
  return (
    <div className="relative">
      <label className="block text-xs font-medium tracking-wider uppercase text-stone-500 mb-2">
        Experiment
      </label>
      <select
        value={selectedExperiment}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full bg-stone-900 border-2 border-stone-700 rounded-none px-4 py-3 text-stone-100 
                   font-mono text-sm focus:outline-none focus:border-amber-500 transition-colors
                   appearance-none cursor-pointer hover:border-stone-600"
      >
        <option value="">Select an experiment</option>
        {experiments.map((exp) => (
          <option key={exp} value={exp} className="bg-stone-900">
            {exp}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-4 top-[42px] text-amber-500">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor">
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>
    </div>
  );
};

// Component: Metric card displaying current performance
const MetricCard = ({ label, value, format = 'percent', trend }) => {
  const formattedValue = format === 'percent' 
    ? `${(value * 100).toFixed(1)}%` 
    : format === 'decimal'
    ? value.toFixed(3)
    : value;

  return (
    <div className="bg-stone-900 border-l-4 border-amber-500 p-5">
      <div className="text-xs font-medium tracking-wider uppercase text-stone-500 mb-2">
        {label}
      </div>
      <div className="flex items-baseline justify-between">
        <div className="text-3xl font-bold text-stone-100 font-mono">
          {formattedValue}
        </div>
        {trend && (
          <div className={`text-sm font-mono ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend > 0 ? '+' : ''}{(trend * 100).toFixed(1)}%
          </div>
        )}
      </div>
    </div>
  );
};

// Component: Performance chart
const PerformanceChart = ({ data, onDataPointClick, activeMetrics }) => {
  const colors = {
    accuracy: '#f59e0b',
    loss: '#ef4444',
    precision: '#10b981',
    recall: '#3b82f6',
    f1_score: '#8b5cf6'
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill={colors.accuracy}
        stroke="#1c1917"
        strokeWidth={2}
        className="cursor-pointer hover:r-8 transition-all"
        onClick={() => onDataPointClick(payload)}
      />
    );
  };

  return (
    <div className="bg-stone-900 p-6 border-2 border-stone-800">
      <h3 className="text-xs font-medium tracking-wider uppercase text-stone-500 mb-6">
        Performance Evolution
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#44403c" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="#78716c"
            style={{ fontSize: '12px', fontFamily: 'monospace' }}
          />
          <YAxis 
            stroke="#78716c"
            style={{ fontSize: '12px', fontFamily: 'monospace' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1c1917',
              border: '1px solid #44403c',
              borderRadius: '0',
              fontFamily: 'monospace',
              fontSize: '12px'
            }}
            labelStyle={{ color: '#a8a29e' }}
          />
          <Legend 
            wrapperStyle={{ 
              fontFamily: 'monospace', 
              fontSize: '12px',
              paddingTop: '20px'
            }}
          />
          {activeMetrics.accuracy && (
            <Line 
              type="monotone" 
              dataKey="performance.accuracy" 
              stroke={colors.accuracy}
              strokeWidth={3}
              name="Accuracy"
              dot={<CustomDot />}
              activeDot={{ r: 8 }}
            />
          )}
          {activeMetrics.loss && (
            <Line 
              type="monotone" 
              dataKey="performance.loss" 
              stroke={colors.loss}
              strokeWidth={3}
              name="Loss"
              dot={{ r: 5, fill: colors.loss, stroke: '#1c1917', strokeWidth: 2 }}
            />
          )}
          {activeMetrics.precision && (
            <Line 
              type="monotone" 
              dataKey="performance.precision" 
              stroke={colors.precision}
              strokeWidth={2}
              name="Precision"
              dot={{ r: 4 }}
            />
          )}
          {activeMetrics.recall && (
            <Line 
              type="monotone" 
              dataKey="performance.recall" 
              stroke={colors.recall}
              strokeWidth={2}
              name="Recall"
              dot={{ r: 4 }}
            />
          )}
          {activeMetrics.f1_score && (
            <Line 
              type="monotone" 
              dataKey="performance.f1_score" 
              stroke={colors.f1_score}
              strokeWidth={2}
              name="F1 Score"
              dot={{ r: 4 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Component: Metric toggle switches
const MetricToggle = ({ metrics, activeMetrics, onToggle }) => {
  return (
    <div className="bg-stone-900 p-5 border-2 border-stone-800">
      <h3 className="text-xs font-medium tracking-wider uppercase text-stone-500 mb-4">
        Visible Metrics
      </h3>
      <div className="space-y-3">
        {Object.keys(metrics).map((metric) => (
          <label key={metric} className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm text-stone-300 font-mono capitalize group-hover:text-stone-100 transition-colors">
              {metric.replace('_', ' ')}
            </span>
            <button
              onClick={() => onToggle(metric)}
              className={`w-12 h-6 rounded-full transition-all duration-300 ${
                activeMetrics[metric] ? 'bg-amber-500' : 'bg-stone-700'
              }`}
            >
              <div
                className={`w-5 h-5 bg-stone-100 rounded-full transform transition-transform duration-300 ${
                  activeMetrics[metric] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        ))}
      </div>
    </div>
  );
};

// Component: Epoch detail modal
const EpochDetailModal = ({ epoch, onClose }) => {
  if (!epoch) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-stone-900 border-4 border-amber-500 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-stone-900 border-b-2 border-stone-800 p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-stone-100 font-mono tracking-tight">
            Epoch Details
          </h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-100 transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-medium tracking-wider uppercase text-stone-500 mb-1">
                Experiment ID
              </div>
              <div className="text-lg font-mono text-amber-400">
                {epoch.experiment_id}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium tracking-wider uppercase text-stone-500 mb-1">
                Date
              </div>
              <div className="text-lg font-mono text-stone-100">
                {new Date(epoch.date).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="border-t-2 border-stone-800 pt-6">
            <h3 className="text-xs font-medium tracking-wider uppercase text-stone-500 mb-4">
              Performance Metrics
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(epoch.performance).map(([key, value]) => (
                <div key={key} className="bg-stone-800 p-4">
                  <div className="text-xs text-stone-400 mb-1 capitalize">
                    {key.replace('_', ' ')}
                  </div>
                  <div className="text-xl font-mono text-stone-100">
                    {typeof value === 'number' && value < 1 && value > 0
                      ? `${(value * 100).toFixed(1)}%`
                      : typeof value === 'boolean'
                      ? value ? 'Yes' : 'No'
                      : value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-stone-800 pt-6">
            <h3 className="text-xs font-medium tracking-wider uppercase text-stone-500 mb-4">
              Network Configuration
            </h3>
            <div className="bg-stone-800 p-4 space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-stone-400">Layers</div>
                  <div className="text-lg font-mono text-stone-100">
                    {epoch.network_config.num_layers}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-stone-400">Learning Rate</div>
                  <div className="text-lg font-mono text-stone-100">
                    {epoch.network_config.learning_rate}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-stone-400">Batch Size</div>
                  <div className="text-lg font-mono text-stone-100">
                    {epoch.network_config.batch_size}
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-stone-700">
                <div className="text-xs text-stone-400 mb-2">Layer Architecture</div>
                <div className="space-y-2">
                  {epoch.network_config.layers.map((layer, idx) => (
                    <div key={idx} className="flex items-center text-sm font-mono text-stone-300">
                      <span className="text-amber-500 w-20">{layer.type}</span>
                      <span className="text-stone-100 w-24">{layer.size} units</span>
                      <span className="text-stone-400">{layer.neuron_type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {epoch.notes && (
            <div className="border-t-2 border-stone-800 pt-6">
              <h3 className="text-xs font-medium tracking-wider uppercase text-stone-500 mb-2">
                Notes
              </h3>
              <div className="bg-stone-800 p-4 text-stone-300 font-mono text-sm">
                {epoch.notes}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Application Component
const NeuralBenchmarkDashboard = () => {
  const [benchmarkData, setBenchmarkData] = useState([]);
  const [selectedExperiment, setSelectedExperiment] = useState('');
  const [selectedEpoch, setSelectedEpoch] = useState(null);
  const [activeMetrics, setActiveMetrics] = useState({
    accuracy: true,
    loss: true,
    precision: false,
    recall: false,
    f1_score: false
  });
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading data from JSON file
  const loadBenchmarkData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setBenchmarkData(MOCK_DATA);
      setIsLoading(false);
    }, 500);
  };

  // Load data on mount
  useEffect(() => {
    loadBenchmarkData();
  }, []);

  // Extract unique experiment IDs
  const experimentIds = useMemo(() => {
    return [...new Set(benchmarkData.map(item => item.experiment_id))].sort();
  }, [benchmarkData]);

  // Filter and sort data for selected experiment
  const experimentData = useMemo(() => {
    if (!selectedExperiment) return [];
    return benchmarkData
      .filter(item => item.experiment_id === selectedExperiment)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [benchmarkData, selectedExperiment]);

  // Calculate current metrics and trends
  const currentMetrics = useMemo(() => {
    if (experimentData.length === 0) return null;
    
    const latest = experimentData[experimentData.length - 1];
    const previous = experimentData.length > 1 ? experimentData[experimentData.length - 2] : null;
    
    return {
      current: latest.performance,
      trends: previous ? {
        accuracy: latest.performance.accuracy - previous.performance.accuracy,
        loss: latest.performance.loss - previous.performance.loss,
        f1_score: latest.performance.f1_score - previous.performance.f1_score
      } : null
    };
  }, [experimentData]);

  const handleMetricToggle = (metric) => {
    setActiveMetrics(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }));
  };

  const handleReload = () => {
    loadBenchmarkData();
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <div className="max-w-[1800px] mx-auto p-8">
        <header className="mb-12">
          <div className="border-l-8 border-amber-500 pl-6 mb-8">
            <h1 className="text-5xl font-black text-stone-100 tracking-tighter mb-2">
              Neural Network Benchmark
            </h1>
            <p className="text-stone-400 text-lg font-mono">
              Performance tracking and analysis dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ExperimentSelector
                experiments={experimentIds}
                selectedExperiment={selectedExperiment}
                onSelect={setSelectedExperiment}
              />
            </div>
            <button
              onClick={handleReload}
              disabled={isLoading}
              className="bg-amber-500 hover:bg-amber-600 disabled:bg-stone-700 text-stone-950 
                         font-bold py-3 px-6 transition-colors duration-200 disabled:cursor-not-allowed
                         font-mono tracking-wide uppercase text-sm"
            >
              {isLoading ? 'Loading...' : 'Reload Data'}
            </button>
          </div>
        </header>

        {selectedExperiment && experimentData.length > 0 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                label="Accuracy"
                value={currentMetrics.current.accuracy}
                format="percent"
                trend={currentMetrics.trends?.accuracy}
              />
              <MetricCard
                label="Loss"
                value={currentMetrics.current.loss}
                format="decimal"
                trend={currentMetrics.trends?.loss}
              />
              <MetricCard
                label="F1 Score"
                value={currentMetrics.current.f1_score}
                format="percent"
                trend={currentMetrics.trends?.f1_score}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <PerformanceChart
                  data={experimentData}
                  onDataPointClick={setSelectedEpoch}
                  activeMetrics={activeMetrics}
                />
              </div>
              <div>
                <MetricToggle
                  metrics={activeMetrics}
                  activeMetrics={activeMetrics}
                  onToggle={handleMetricToggle}
                />
              </div>
            </div>

            <div className="bg-stone-900 border-2 border-stone-800 p-6">
              <h3 className="text-xs font-medium tracking-wider uppercase text-stone-500 mb-4">
                Experiment Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-xs text-stone-400 mb-1">Total Epochs</div>
                  <div className="text-2xl font-mono text-stone-100">{experimentData.length}</div>
                </div>
                <div>
                  <div className="text-xs text-stone-400 mb-1">Training Data Size</div>
                  <div className="text-2xl font-mono text-stone-100">
                    {experimentData[0].training_data_size.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-stone-400 mb-1">Avg Duration</div>
                  <div className="text-2xl font-mono text-stone-100">
                    {(experimentData.reduce((sum, d) => sum + d.performance.training_duration_sec, 0) / experimentData.length).toFixed(1)}s
                  </div>
                </div>
                <div>
                  <div className="text-xs text-stone-400 mb-1">Best Accuracy</div>
                  <div className="text-2xl font-mono text-amber-400">
                    {(Math.max(...experimentData.map(d => d.performance.accuracy)) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-stone-900 border-2 border-stone-800 p-20 text-center">
            <div className="text-stone-500 text-lg font-mono">
              {selectedExperiment 
                ? 'No data available for this experiment'
                : 'Select an experiment to view benchmark results'}
            </div>
          </div>
        )}
      </div>

      {selectedEpoch && (
        <EpochDetailModal
          epoch={selectedEpoch}
          onClose={() => setSelectedEpoch(null)}
        />
      )}
    </div>
  );
};

export default NeuralBenchmarkDashboard;