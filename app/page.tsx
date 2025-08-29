
"use client"

import { useMiniKit, useAddFrame, useOpenUrl } from "@coinbase/onchainkit/minikit"
import { Name, Identity, Address, Avatar, EthBalance } from "@coinbase/onchainkit/identity"
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownDisconnect } from "@coinbase/onchainkit/wallet"
import { useEffect, useState, useCallback, useMemo } from "react"
import { Calculator } from "./components/Calculator"
import { Button } from "./components/Button"
import { Icon } from "./components/Icon"

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit()
  const [frameAdded, setFrameAdded] = useState(false)
  const [activeTab, setActiveTab] = useState("calculator")

  const addFrame = useAddFrame()
  const openUrl = useOpenUrl()

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame()
    setFrameAdded(Boolean(frameAdded))
  }, [addFrame])

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="secondary"
          size="sm"
          onClick={handleAddFrame}
          className="text-accent"
          icon={<Icon name="plus" size="sm" />}
        >
          Save App
        </Button>
      )
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-accent animate-fade-in">
          <Icon name="check" size="sm" />
          <span>Saved</span>
        </div>
      )
    }

    return null
  }, [context, frameAdded, handleAddFrame])

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <div className="w-full max-w-xl mx-auto px-4 py-3">
        {/* Header */}
        <header className="flex justify-between items-center mb-6 h-11">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="calculator" size="sm" className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-text-primary">TradeCalc</h1>
              <p className="text-xs text-text-secondary">Calculate trades in seconds</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Wallet className="z-10">
              <ConnectWallet>
                <Name className="text-inherit text-sm" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
            {saveFrameButton}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Calculator />
        </main>

        {/* Footer */}
        <footer className="mt-8 pt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-text-secondary text-xs hover:text-text-primary"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </Button>
        </footer>
      </div>
    </div>
  )
}
