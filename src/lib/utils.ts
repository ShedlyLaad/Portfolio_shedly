import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import React from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper to combine multiple refs (useRef objects or callback refs)
// Returns a valid callback ref function that React accepts
// React requires: function, React.createRef() object, or undefined/null
export function combineRefs(...refs: Array<React.Ref<any> | null | undefined>) {
  // Filter out null/undefined refs
  const validRefs = refs.filter(ref => ref !== null && ref !== undefined)
  
  // If no valid refs, return a no-op function (React accepts functions)
  if (validRefs.length === 0) {
    return () => {} // Return empty function instead of undefined
  }
  
  // Return a callback function that React accepts
  return (el: HTMLElement | null) => {
    validRefs.forEach((ref) => {
      if (ref === null || ref === undefined) {
        return
      }
      
      if (typeof ref === 'function') {
        // Callback ref - call it with the element
        try {
          ref(el)
        } catch (error) {
          // Silently handle errors to prevent crashes
        }
      } else if (typeof ref === 'object' && ref !== null && 'current' in ref) {
        // useRef object - assign to .current
        try {
          ref.current = el
        } catch (error) {
          // Silently handle errors to prevent crashes
        }
      }
    })
  }
}
