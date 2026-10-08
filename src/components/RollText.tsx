// Hover effect: the label rolls up and an identical copy rolls in from below.
// Relies on an ancestor with the `group` class.
export default function RollText({ children, className = '' }: { children: string; className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
        {children}
      </span>
      <span
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  )
}
