import { mlEngine } from '../src/services/mlEngine.js';

const mockAssets = [
  { name: 'BTC', value: 50, risk: 'Low', yield: '3.2%' },
  { name: 'ETH', value: 30, risk: 'Low', yield: '12.5%' },
  { name: 'XRP', value: 20, risk: 'High', yield: '1.5%' }
];

console.log('--- ML Engine Verification ---');

// 1. Analyze Portfolio
const analysis = mlEngine.analyzePortfolio(mockAssets);
console.log('Portfolio Analysis:', analysis);
if (analysis.riskScore > 0 && analysis.riskLevel) {
  console.log('✅ analyzePortfolio: PASSED');
} else {
  console.log('❌ analyzePortfolio: FAILED');
}

// 2. Predict Market
const prediction = mlEngine.predictMarket('BTC/USD');
console.log('BTC Prediction:', prediction);
if (prediction.confidence && prediction.trend) {
  console.log('✅ predictMarket: PASSED');
} else {
  console.log('❌ predictMarket: FAILED');
}

// 3. Optimize Allocation
const optimized = mlEngine.optimizeAllocation(mockAssets);
console.log('Optimized Allocation:', optimized);
if (optimized.length === mockAssets.length && optimized[2].recommended < optimized[2].value) {
  console.log('✅ optimizeAllocation (Risk Reduction): PASSED');
} else {
  console.log('❌ optimizeAllocation: FAILED');
}

// 4. Get Insight
const insight = mlEngine.getInsight({ assets: mockAssets }, 'BEARISH');
console.log('AI Insight:', insight);
if (insight.length > 20) {
  console.log('✅ getInsight: PASSED');
} else {
  console.log('❌ getInsight: FAILED');
}

console.log('\n--- Verification Complete ---');
