import { Button } from '@/shadcn/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/ui/select'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export function DropdownPortalTest () {
  const [poppedOut, setPoppedOut] = useState(false)

  const windowRef = useRef()
  const popoutContainer = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    // When container is ready
    if (poppedOut && popoutContainer) {
      // Create window
      windowRef.current = window.open(
        '',
        '',
        `width=${600},height=${400}`
      )

      // Save reference to window for cleanup
      const curWindow = windowRef.current

      // Copy styles from main document
      curWindow.document.head.innerHTML = window.document.head.innerHTML
      // Append popoutContainer
      curWindow.document.body.appendChild(popoutContainer)

      curWindow.onbeforeunload = () => {
        setPoppedOut(false)
      }

      // Return cleanup function
      return () => {
        curWindow.close()
      }
    }
  }, [poppedOut, popoutContainer])

  const dropdown = (
    <Select id="theme-selector"
      value='light'
    >
      <SelectTrigger className="m-4 w-[150px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
      </SelectContent>
    </Select>
  )

  return (
    <div>
      <Button
        onClick={() => {
          setPoppedOut(true)
        }}
      >
        Create Window
      </Button>
      {poppedOut &&
        createPortal(dropdown, popoutContainer)
      }
    </div>
  )
}
