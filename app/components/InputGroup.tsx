
"use client"

interface InputGroupProps {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  className?: string
}

export function InputGroup({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = "text",
  className = "" 
}: InputGroupProps) {
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field"
        step={type === "number" ? "any" : undefined}
      />
    </div>
  )
}
