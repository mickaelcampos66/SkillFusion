import { cn } from '@/lib/utils'

export function ErrorMessage({ children }: React.ComponentProps<'div'>) {
  const open = children != null

  return (
    <div
      className={cn('grid transition-all', {
        'grid-rows-[0fr]': !open,
        'grid-rows-[1fr]': open,
      })}
    >
      <div
        className="overflow-hidden text-sm text-destructive"
        aria-hidden={!open}
      >
        {children && <span>{children}</span>}
      </div>
    </div>
  )
}
