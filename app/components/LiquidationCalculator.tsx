
"use client"

import { useState } from "react"
import { InputGroup } from "./InputGroup"
import { Button } from "./Button"
import { Card } from "./Card"
import { Icon } from "./Icon"

interface LiquidationResult {
  liquidationPrice: number
  marginUsed: number
  safetyMargin: number
  distanceToLiquidation: number
}

export function LiquidationCalculator() {
  const [entryPrice, setEntryPrice] = useState("")
  const [leverage, setLeverage] = useState("")
  const [positionSize, setPositionSize] = useState("")
  const [isLong, setIsLong] = useState(true)
  const [result, setResult] = useState<LiquidationResult | null>(null)

  const calculateLiquidation = () => {
    const entry = parseFloat(entryPrice)
    const lev = parseFloat(leverage)
    const size = parseFloat(positionSize)

    if (!entry || !lev || !size) return

    // Simplified liquidation calculation (assuming 100% margin requirement)
    const marginUsed = (size * entry) / lev
    const liquidationPrice = isLong 
      ? entry * (1 - 1/lev) 
      : entry * (1 + 1/lev)
    
    const distanceToLiquidation = Math.abs(entry - liquidationPrice)
    const safetyMargin = (distanceToLiquidation / entry) * 100

    setResult({
      liquidationPrice,
      marginUsed,
      safetyMargin,
      distanceToLiquidation,
    })
  }

  const reset = () => {
    setEntryPrice("")
    setLeverage("")
    setPositionSize("")
    setResult(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="alert-triangle" className="text-red-500" />
          <h2 className="text-heading">Liquidation Calculator</h2>
        </div>

        <div className="space-y-4 mb-6">
          {/* Position Direction */}
          <div>
            <label className="input-label">Position Direction</label>
            <div className="flex bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setIsLong(true)}
                className={`flex-1 py-2 px-4 rounded-sm text-sm font-medium transition-colors ${
                  isLong ? "bg-green-500 text-white" : "text-text-secondary"
                }`}
              >
                Long
              </button>
              <button
                onClick={() => setIsLong(false)}
                className={`flex-1 py-2 px-4 rounded-sm text-sm font-medium transition-colors ${
                  !isLong ? "bg-red-500 text-white" : "text-text-secondary"
                }`}
              >
                Short
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputGroup
              label="Entry Price ($)"
              value={entryPrice}
              onChange={setEntryPrice}
              placeholder="0.00"
              type="number"
            />
            <InputGroup
              label="Leverage (x)"
              value={leverage}
              onChange={setLeverage}
              placeholder="10"
              type="number"
            />
          </div>

          <InputGroup
            label="Position Size"
            value={positionSize}
            onChange={setPositionSize}
            placeholder="1000"
            type="number"
          />
        </div>

        <div className="flex space-x-3">
          <Button onClick={calculateLiquidation} className="flex-1">
            Calculate Liquidation
          </Button>
          <Button variant="secondary" onClick={reset}>
            Reset
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="animate-slide-up border-l-4 border-l-red-500">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="alert-triangle" className="text-red-500" />
            <h3 className="text-lg font-semibold">Liquidation Analysis</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-caption text-text-secondary">Liquidation Price</p>
                <p className="text-xl font-bold text-red-600">
                  ${result.liquidationPrice.toFixed(4)}
                </p>
              </div>
              
              <div>
                <p className="text-caption text-text-secondary">Safety Margin</p>
                <p className="text-lg font-semibold text-orange-600">
                  {result.safetyMargin.toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-caption text-text-secondary">Margin Used</p>
                <p className="text-lg font-semibold text-text-primary">
                  ${result.marginUsed.toFixed(2)}
                </p>
              </div>
              
              <div>
                <p className="text-caption text-text-secondary">Distance to Liquidation</p>
                <p className="text-lg font-semibold text-red-600">
                  ${result.distanceToLiquidation.toFixed(4)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-200">
            <p className="text-sm text-red-800">
              ⚠️ <strong>Warning:</strong> High leverage increases liquidation risk. 
              Monitor your position closely and consider setting stop-losses.
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
