
"use client"

import { useState } from "react"
import { InputGroup } from "./InputGroup"
import { Button } from "./Button"
import { Card } from "./Card"
import { Icon } from "./Icon"

interface PositionSizeResult {
  optimalSize: number
  totalRisk: number
  maxLoss: number
  positionValue: number
}

export function PositionSizeCalculator() {
  const [accountBalance, setAccountBalance] = useState("")
  const [riskPercentage, setRiskPercentage] = useState("")
  const [entryPrice, setEntryPrice] = useState("")
  const [stopLossPrice, setStopLossPrice] = useState("")
  const [result, setResult] = useState<PositionSizeResult | null>(null)

  const calculatePositionSize = () => {
    const balance = parseFloat(accountBalance)
    const risk = parseFloat(riskPercentage)
    const entry = parseFloat(entryPrice)
    const stopLoss = parseFloat(stopLossPrice)

    if (!balance || !risk || !entry || !stopLoss) return

    const riskAmount = (balance * risk) / 100
    const priceRisk = Math.abs(entry - stopLoss)
    const optimalSize = riskAmount / priceRisk
    const positionValue = optimalSize * entry

    setResult({
      optimalSize,
      totalRisk: riskAmount,
      maxLoss: riskAmount,
      positionValue,
    })
  }

  const reset = () => {
    setAccountBalance("")
    setRiskPercentage("")
    setEntryPrice("")
    setStopLossPrice("")
    setResult(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="pie-chart" className="text-primary" />
          <h2 className="text-heading">Position Size Calculator</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <InputGroup
            label="Account Balance ($)"
            value={accountBalance}
            onChange={setAccountBalance}
            placeholder="10000"
            type="number"
          />
          <InputGroup
            label="Risk Percentage (%)"
            value={riskPercentage}
            onChange={setRiskPercentage}
            placeholder="2"
            type="number"
          />
          <InputGroup
            label="Entry Price ($)"
            value={entryPrice}
            onChange={setEntryPrice}
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
          <Button onClick={calculatePositionSize} className="flex-1">
            Calculate Size
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
            <h3 className="text-lg font-semibold">Optimal Position</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-caption text-text-secondary">Position Size</p>
                <p className="text-lg font-semibold text-primary">
                  {result.optimalSize.toFixed(4)} units
                </p>
              </div>
              
              <div>
                <p className="text-caption text-text-secondary">Position Value</p>
                <p className="text-lg font-semibold text-text-primary">
                  ${result.positionValue.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-caption text-text-secondary">Total Risk</p>
                <p className="text-lg font-semibold text-orange-600">
                  ${result.totalRisk.toFixed(2)}
                </p>
              </div>
              
              <div>
                <p className="text-caption text-text-secondary">Max Loss</p>
                <p className="text-lg font-semibold text-red-600">
                  ${result.maxLoss.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
