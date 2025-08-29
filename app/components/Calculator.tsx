
"use client"

import { useState } from "react"
import { RiskRewardCalculator } from "./RiskRewardCalculator"
import { PositionSizeCalculator } from "./PositionSizeCalculator"
import { LiquidationCalculator } from "./LiquidationCalculator"
import { Button } from "./Button"

export function Calculator() {
  const [activeCalculator, setActiveCalculator] = useState<"risk-reward" | "position-size" | "liquidation">("risk-reward")

  const calculators = [
    { id: "risk-reward", label: "Risk/Reward", component: RiskRewardCalculator },
    { id: "position-size", label: "Position Size", component: PositionSizeCalculator },
    { id: "liquidation", label: "Liquidation", component: LiquidationCalculator },
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex bg-surface rounded-lg p-1 shadow-sm border border-gray-200">
        {calculators.map((calc) => (
          <button
            key={calc.id}
            onClick={() => setActiveCalculator(calc.id as any)}
            className={`tab-button flex-1 ${
              activeCalculator === calc.id ? "tab-active" : "tab-inactive"
            }`}
          >
            {calc.label}
          </button>
        ))}
      </div>

      {/* Calculator Content */}
      <div className="animate-fade-in">
        {calculators.map((calc) => {
          if (activeCalculator === calc.id) {
            const Component = calc.component
            return <Component key={calc.id} />
          }
          return null
        })}
      </div>
    </div>
  )
}
