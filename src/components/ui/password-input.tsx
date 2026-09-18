import { useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Eye, EyeOff, LockKeyhole } from 'lucide-react'

import { Input } from '@/components/ui/input'

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  invalid?: boolean
}

export function PasswordInput({ invalid = false, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <Input
      invalid={invalid}
      leadingIcon={<LockKeyhole aria-hidden="true" className="size-4" strokeWidth={1.8} />}
      trailingAction={
        <button
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="flex size-8 items-center justify-center text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          onClick={() => setVisible((current) => !current)}
          type="button"
        >
          {visible ? (
            <EyeOff aria-hidden="true" className="size-4" strokeWidth={1.8} />
          ) : (
            <Eye aria-hidden="true" className="size-4" strokeWidth={1.8} />
          )}
        </button>
      }
      type={visible ? 'text' : 'password'}
      {...props}
    />
  )
}
