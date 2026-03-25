'use client'
import { useEffect, useState, RefObject } from 'react'
import type SplitTypeLib from 'split-type'

export function useFontLoaded() {
  const [state, setState] = useState({ loaded: false, timedOut: false })
  useEffect(() => {
    if (typeof window === 'undefined') return
    let didTimeout = false
    const timeout = setTimeout(() => {
      didTimeout = true
      setState({ loaded: true, timedOut: true })
    }, 3000)
    document.fonts.ready.then(() => {
      if (!didTimeout) {
        clearTimeout(timeout)
        setState({ loaded: true, timedOut: false })
      }
    })
  }, [])
  return state
}

export function useSplitType(
  ref: RefObject<Element | null>,
  types: string = 'chars,words'
) {
  const [instance, setInstance] = useState<SplitTypeLib | null>(null)
  const { loaded } = useFontLoaded()

  useEffect(() => {
    if (!loaded || !ref.current || typeof window === 'undefined') return

    let splitInstance: SplitTypeLib | null = null

    const init = async () => {
      const SplitType = (await import('split-type')).default
      if (!ref.current) return
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      splitInstance = new SplitType(ref.current as HTMLElement, { types: types as any })
      setInstance(splitInstance)
    }

    init()

    const handleResize = debounce(() => {
      if (splitInstance) {
        splitInstance.split({})
      }
    }, 300)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      splitInstance?.revert()
    }
  }, [loaded, ref, types])

  return instance
}

function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>
  return ((...args: unknown[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }) as T
}
