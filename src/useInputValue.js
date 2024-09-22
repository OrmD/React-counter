import { useState } from "react"

export function useInputValue(defaultValue = 1) {
	const [value, setValue] = useState(defaultValue)
	return {
		value,
		onChange: (Event) => setValue(Event.target.value)
	}
}