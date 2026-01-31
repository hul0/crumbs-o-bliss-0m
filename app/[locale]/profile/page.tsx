'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Phone,
  MapPin,
  Save,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  Loader2,
  Sparkles,
  CreditCard,
  ShieldCheck
} from 'lucide-react'
import Loader from '@/components/loader'

interface UserData {
  name: string
  mobile: string
  address: string
  pincode: string
}

interface ProfilePageProps {
  params: Promise<{ locale: string }>
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const [locale, setLocale] = useState<string>('')
  const t = useTranslations()
  const [formData, setFormData] = useState<UserData>({
    name: '',
    mobile: '',
    address: '',
    pincode: '',
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [hasData, setHasData] = useState(false)

  // Load params and data
  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await params
      setLocale(resolvedParams.locale)

      const storedUser = localStorage.getItem('bakery_user_info')
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser)
          setFormData(parsed)
          setHasData(true)
        } catch (e) {
          console.error('Failed to parse user data')
        }
      }
      setIsLoading(false)
    }

    loadData()
  }, [params])

  // Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (saveStatus !== 'idle') setSaveStatus('idle')
  }

  // Save to LocalStorage
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    setTimeout(() => {
      try {
        localStorage.setItem('bakery_user_info', JSON.stringify(formData))
        setHasData(true)
        setSaveStatus('success')
        setTimeout(() => setSaveStatus('idle'), 3000)
      } catch (e) {
        setSaveStatus('error')
      } finally {
        setIsSaving(false)
      }
    }, 800)
  }

  // Clear Data
  const handleClearData = () => {
    if (confirm(t('profile.clearConfirm'))) {
      localStorage.removeItem('bakery_user_info')
      setFormData({ name: '', mobile: '', address: '', pincode: '' })
      setHasData(false)
      setSaveStatus('idle')
    }
  }

  // Helper to get initials
  const getInitials = (name: string) => {
    if (!name) return 'C'
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-secondary/20 pb-20">
      {/* --- Decorative Header Background --- */}
      <div className="h-48 bg-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-2xl" />
        
        <div className="container max-w-2xl mx-auto px-4 pt-8 relative z-10">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 -mt-20 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          
          {/* --- Profile Header Card --- */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className="w-24 h-24 md:w-28 md:h-28 bg-card rounded-full shadow-xl p-1 flex items-center justify-center mx-auto border-4 border-background">
                <div className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-3xl font-serif">
                  {getInitials(formData.name)}
                </div>
              </div>
              {hasData && (
                <div className="absolute bottom-1 right-1 bg-green-500 text-white p-1.5 rounded-full border-2 border-background shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {formData.name || t('profile.title')}
              </h1>
              <p className="text-muted-foreground text-sm">
                {t('profile.subtitle')}
              </p>
            </div>
          </div>

          {/* --- Main Form Card --- */}
          <div className="bg-card border border-border/50 rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm">
            
            {/* Status Feedback Bar */}
            <AnimatePresence>
              {saveStatus === 'success' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-green-500/10 border-b border-green-500/10 px-6 py-3"
                >
                  <div className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {t('profile.saved')}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSave} className="p-6 md:p-8 space-y-8">
              
              {/* Personal Details Group */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4" /> Personal Details
                </h3>
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-foreground/80 ml-1">
                      {t('profile.fullName')}
                    </label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder={t('modal.yourName')}
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-input rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="mobile" className="text-xs font-medium text-foreground/80 ml-1">
                      {t('profile.mobileNo')}
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder={t('modal.mobile10Digit')}
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-input rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Group */}
              <div className="space-y-4 pt-2 border-t border-border/50">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mt-4">
                  <MapPin className="w-4 h-4" /> Shipping Details
                </h3>
                
                <div className="space-y-1.5">
                  <label htmlFor="address" className="text-xs font-medium text-foreground/80 ml-1">
                    {t('profile.deliveryAddress')}
                  </label>
                  <div className="relative group">
                    <textarea
                      id="address"
                      name="address"
                      required
                      placeholder={t('modal.fullAddress')}
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-muted/30 border border-input rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                   <div className="space-y-1.5">
                    <label htmlFor="pincode" className="text-xs font-medium text-foreground/80 ml-1">
                      {t('profile.pinCodeLabel')}
                    </label>
                    <div className="relative group">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input
                        id="pincode"
                        name="pincode"
                        type="text"
                        required
                        pattern="[0-9]{6}"
                        placeholder={t('modal.pincode6Digit')}
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-input rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 flex flex-col-reverse sm:flex-row gap-4 items-center justify-between border-t border-border/50">
                {hasData ? (
                  <button
                    type="button"
                    onClick={handleClearData}
                    className="text-sm text-muted-foreground hover:text-red-500 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-all group"
                  >
                    <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    {t('profile.clearData')}
                  </button>
                ) : (
                  <div className="hidden sm:block" />
                )}

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('profile.saving')}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {t('profile.saveChanges')}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-500" />
              Your details are stored locally on your device for faster checkout.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}