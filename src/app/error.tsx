'use client'

export default function ErrorBoundary( {
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
} ) {
    return (
    <div>
        <h1 className={ 'font-bold' }>Something went wrong!</h1>
        <h1>{ error.message }</h1>
      <button onClick={ () => reset() }>Try again</button>
    </div>
  )
}
