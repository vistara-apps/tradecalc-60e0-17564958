
"use client"

import { useState } from "react"
import { InputGroup } from "./InputGroup"
import { Button } from "./Button"
import { Card } from "./Card"
import { Icon } from "./Icon"

interface RiskRewardResult {
  potentialProfit: number
  potentialLoss: number
  riskRewardRatio: number
  profitPercentage: number
  lossPercentage: number
}

export function RiskRewardCalculator() {
  const [entryPrice, setEntryPrice] = useState("")
  const [takeProfitPrice, setTakeProfitPrice] = useState("")
  const [stopLossPrice, setStopLossPrice] = useState("")
  const [tradeSize, setTradeSize] = useState("")
  const [result, setResult] = useState<RiskRewardResult | null>(null)

  const calculateRiskReward = () => {
    const entry = parseFloat(entryPrice)
    const takeProfit = parseFloat(takeProfitPrice)
    const stopLoss = parseFloat(stopLossPrice)
    const size = parseFloat(tradeSize)

    if (!entry || !takeProfit || !stopLoss || !size) return

    const isLong = takeProfit > entry
    
    const potentialProfit = Math.abs(takeProfit - entry) * size
    const potentialLoss = Math.abs(entry - stopLoss) * size
    const riskRewardRatio = potentialProfit / potentialLoss

    const profitPercentage = ((takeProfit - entry) / entry) * 100
    const lossPercentage = ((entry - stopLoss) / entry) * 100

    setResult({
      potentialProfit,
      potentialLoss,
      riskRewardRatio,
      profitPercentage: Math.abs(profitPercentage),
      lossPercentage: Math.abs(lossPercentage),
    })
  }

  const reset = () => {
    setEntryPrice("")
    setTakeProfitPrice("")
    setStopLossPrice("")
    setTradeSize("")
    setResult(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="target" className="text-primary" />
          <h2 className="text-heading">Risk/Reward Calculator</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <InputGroup
            label="Entry Price ($)"
            value={entryPrice}
            onChange={setEntryPrice}
            placeholder="0.00"
            type="number"
          />
          <InputGroup
            label="Trade Size"
            value={tradeSize}
            onChange={setTradeSize}
            placeholder="0"
            type="number"
          />
          <InputGroup
            label="Take Profit ($)"
            value={takeProfitPrice}
            onChange={setTakeProfitPrice}
            placeholder="0.00"
            type="number"
          />
          <InputGroup
            label="Stop Loss ($)"
            value={stopLossPrice}
            onChange={setStopLossPrice}
            placeholder="0.00"
            type="number"
          />
        </div>

        <div className="flex space-x-3">
          <Button onClick={calculateRiskReward} className="flex-1">
            Calculate
          </Button>
          <Button variant="secondary" onClick={reset}>
            Reset
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="animate-slide-up">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="chart" className="text-accent" />
            <h3 className="text-lg font-semibold">Results</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-caption text-text-secondary">Potential Profit</p>
                <p className="text-lg font-semibold text-green-600">
                  ${result.potentialProfit.toFixed(2)}
                </p>
                <p className="text-sm text-green-600">
                  +{result.profitPercentage.toFixed(2)}%
                </p>
              </div>
              
              <div>
                <p className="text-caption text-text-secondary">Risk/Reward Ratio</p>
                <p className="text-lg font-semibold text-primary">
                  1:{result.riskRewardRatio.toFixed(2)}
                </p>
                <p className="text-sm text-text-secondary">
                  {result.riskRewardRatio >= 2 ? "Excellent" : result.riskRewardRatio >= 1.5 ? "Good" : "Risky"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-caption text-text-secondary">Potential Loss</p>
                <p className="text-lg font-semibold text-red-600">
                  -${result.potentialLoss.toFixed(2)}
                </p>
                <p className="text-sm text-red-600">
                  -{result.lossPercentage.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
