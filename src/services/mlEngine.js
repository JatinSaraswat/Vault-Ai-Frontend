/**
 * VaultAI ML Intelligence Engine (Simulated)
 * 
 * This engine simulates real-time DeFi portfolio optimization using 
 * trend analysis, risk scoring models, and yield projection logic.
 */

export const mlEngine = {
  /**
   * Analyzes an array of assets and returns an aggregate risk and yield report.
   */
  analyzePortfolio(assets) {
    const totalValue = assets.reduce((sum, a) => sum + (a.current || 0), 0);
    const avgRisk = assets.reduce((sum, a) => {
      const riskMap = { 'Low': 20, 'Medium': 50, 'High': 85 };
      return sum + (riskMap[a.risk || 'Medium'] * (a.value / 100));
    }, 0);

    return {
      totalValue,
      riskScore: Math.round(avgRisk),
      riskLevel: avgRisk < 40 ? 'LOW' : avgRisk < 70 ? 'MODERATE' : 'HIGH',
      avgYield: assets.reduce((sum, a) => sum + (parseFloat(a.yield || 0) * (a.value / 100)), 0).toFixed(1)
    };
  },

  /**
   * Generates market predictions for assets.
   */
  predictMarket(symbol) {
    // Simulated prediction logic based on symbol volatility
    const volatilityMap = { 'BTC': 0.12, 'ETH': 0.18, 'SOL': 0.35, 'XRP': 0.45, 'ADA': 0.25 };
    const baseVol = volatilityMap[symbol.split('/')[0]] || 0.2;
    
    return {
      predictedMove: (Math.random() * baseVol * 2 - baseVol).toFixed(2),
      confidence: (85 + Math.random() * 10).toFixed(1),
      trend: Math.random() > 0.4 ? 'BULLISH' : 'BEARISH',
      targetPrice: (1 + (Math.random() * 0.1 - 0.05)).toFixed(4)
    };
  },

  /**
   * Optimizes allocation percentages based on market conditions.
   */
  optimizeAllocation(currentAssets) {
    // Simulation: Reduce High Risk, Increase Yield-Bearing assets
    return currentAssets.map(asset => {
      let recommended = asset.value;
      if (asset.risk === 'High') recommended -= 5;
      if (parseFloat(asset.yield) > 10) recommended += 5;
      
      // Normalize to 100% (simplified simulation)
      return { ...asset, recommended: Math.max(1, recommended) };
    });
  },

  /**
   * Generates a narrative insight based on current state.
   */
  getInsight(portfolioData, marketTrend) {
    const highYield = portfolioData.assets.find(a => parseFloat(a.yield) > 10);
    const highRisk = portfolioData.assets.find(a => a.risk === 'High');

    if (highRisk && marketTrend === 'BEARISH') {
      return `Market volatility is increasing for ${highRisk.name}. AI suggests rebalancing ${highRisk.value}% of exposure into stable pools to reduce potential drawdown.`;
    }
    if (highYield) {
      return `${highYield.name} yield is currently outperforming the market at ${highYield.yield}. Optimized strategy maintains overweight position to maximize MTD returns.`;
    }
    return "Portfolio is aligned with Balanced Growth strategy. No critical interventions required at this timestamp.";
  }
};
