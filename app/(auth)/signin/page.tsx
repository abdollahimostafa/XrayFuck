'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import Image from 'next/image'

export default function SigninPage() {
  const { update } = useSession()
  const [step, setStep] = useState<1 | 2>(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ phoneNumber: '', code: '' })

  const normalizeNumbers = (input: string) => {
    return input.replace(/[۰-۹]/g, (d) =>
      String.fromCharCode(d.charCodeAt(0) - 1728)
    )
  }

  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div className="text-center py-10">در حال بررسی ورود...</div>
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSendCode = async () => {
    setLoading(true)
    const normalizedPhone = normalizeNumbers(form.phoneNumber)
    const res = await fetch('/api/send-code', {
      method: 'POST',
      body: JSON.stringify({ phone: normalizedPhone }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      toast.success('کد تأیید ارسال شد', { className: 'ggfont' })
      setStep(2)
    } else {
      toast.error('ارسال کد با خطا مواجه شد', { className: 'ggfont' })
    }

    setLoading(false)
  }

  const handleVerify = async () => {
    setLoading(true)
    const normalizedPhone = normalizeNumbers(form.phoneNumber)
    const normalizedCode = normalizeNumbers(form.code)
    const res = await signIn('credentials', {
      phoneNumber: normalizedPhone,
      code: normalizedCode,
      redirect: false,
    })

    if (res?.ok) {
      await update()
      toast.success('ورود موفقیت‌آمیز بود', { className: 'ggfont' })
      router.push('/dashboard')
    } else {
      toast.error('کد وارد شده معتبر نیست', { className: 'ggfont' })
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left: Form Card */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-none p-15">
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold mb-2 text-center">
              {step === 1 ? 'ورود کاربر' : 'تأیید شماره موبایل'}
            </h2>

            {step === 1 && (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendCode()
                }}
              >
                <div>
                  <Label className="mb-1">شماره موبایل</Label>
                  <Input
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  ارسال کد ورود
                </Button>
                              <a href='/signup' className='text-center text-sm  block text-gray-400'>حساب کاربری ندارم</a>

              </form>

            )}

            {step === 2 && (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleVerify()
                }}
              >
                <div className="space-y-2 text-center mx-auto w-fit" dir="ltr">
                  <Label className="block text-sm font-medium mb-5">
                    کد تأیید را وارد کنید
                  </Label>
                  <InputOTP
                    maxLength={6}
                    value={form.code}
                    onChange={(value) => setForm({ ...form, code: value })}
                    className="flex justify-center mb-4"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  تأیید و ورود
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right: Brand / Illustration */}
      <div className="flex-1 hidden md:flex items-center justify-center bg-gradient-to-r from-blue-400 to-transparent ">
        <Image
        width={500}
        height={400}
          src="/flogin.png"
          alt="Medical AI Illustration"
          className="max-w-xs md:max-w-lg lg:max-w-xl"
        />
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute animate-in inset-0 z-50 flex flex-col items-center justify-center bg-black/80">
          <svg
            className="w-12 h-12 animate-spin text-white mb-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          <p className="text-white text-lg">در حال پردازش، لطفاً صبر کنید...</p>
        </div>
      )}
    </div>
  )
}
