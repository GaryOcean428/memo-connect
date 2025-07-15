import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from './error-boundary'
import { describe, it, expect } from 'vitest'

// Component that throws an error for testing
const ThrowError = () => {
  throw new Error('Test error')
}

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders error UI when an error occurs', () => {
    // Suppress console.error for this test
    const consoleError = console.error
    console.error = () => {}
    
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Test error')).toBeInTheDocument()
    expect(screen.getByText('Try Again')).toBeInTheDocument()
    expect(screen.getByText('Reload Page')).toBeInTheDocument()
    
    // Restore console.error
    console.error = consoleError
  })

  it('renders custom fallback when provided', () => {
    const consoleError = console.error
    console.error = () => {}
    
    render(
      <ErrorBoundary fallback={<div>Custom error UI</div>}>
        <ThrowError />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Custom error UI')).toBeInTheDocument()
    
    console.error = consoleError
  })
})