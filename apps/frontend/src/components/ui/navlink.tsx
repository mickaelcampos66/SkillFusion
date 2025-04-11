'use client'

import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

const linkVariants = cva(
  'text-[1.15rem] px-1 hover:text-primary transition-colors duration-200 ease-in-out',
  {
    variants: {
      variant: {
        default: 'text-secondary-foreground',
        mobile: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface NavLinkProps extends LinkProps, VariantProps<typeof linkVariants> {
  children?: React.ReactNode
}

export function NavLink({ children, href, variant, ...props }: NavLinkProps) {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={cn(linkVariants({ variant }),
        pathname === href && 'text-primary font-bold')}
      {...props}
    >
      {children}
    </Link>
  )
}
