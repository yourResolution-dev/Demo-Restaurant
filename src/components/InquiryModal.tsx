import React, { useState } from 'react';
import { Sparkles, MessageSquare, CheckCircle2, Send } from 'lucide-react';
import { RESTAURANT_INFO } from '@/config';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { Input, Textarea } from '@/components/ui/input';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ReSolution! My name is ${form.name || 'a visitor'} and I want a website like "${RESTAURANT_INFO.brandName}" for ${form.businessName || 'my business'}.`
    );
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const update =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [key]: e.target.value });

  const labelClass = 'normal-case tracking-normal mb-1';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        {/* Header */}
        <div className="relative border-b border-gold-400/30 bg-forest-900 p-6 text-center text-cream-100">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-500 text-forest-900 shadow-lg">
            <Sparkles className="h-6 w-6" />
          </div>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gold-400">
            Built by ReSolution
          </span>
          <DialogTitle className="text-cream-100">Want a Website Like This?</DialogTitle>
          <DialogDescription className="mx-auto mt-1 max-w-sm font-light">
            Get a high-converting, bespoke digital flagship designed specifically for your culinary
            establishment or luxury brand.
          </DialogDescription>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5 sm:p-6">
          {submitted ? (
            <div className="space-y-4 py-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-forest-900">Inquiry Received!</h4>
              <p className="mx-auto max-w-sm text-xs leading-relaxed text-charcoal-500">
                Thank you, <strong className="text-forest-900">{form.name}</strong>. The ReSolution
                team will connect with you on WhatsApp / Phone within 2 hours.
              </p>
              <Button variant="whatsapp" onClick={handleWhatsApp}>
                <MessageSquare className="h-4 w-4" />
                <span>Instant Connect on WhatsApp</span>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field id="inquiry-name" label="Your Name *" labelClassName={labelClass}>
                  {(c) => (
                    <Input
                      {...c}
                      type="text"
                      required
                      placeholder="e.g. Ranajit Gupta"
                      value={form.name}
                      onChange={update('name')}
                      className="bg-white px-3.5 text-xs"
                    />
                  )}
                </Field>
                <Field
                  id="inquiry-business"
                  label="Business / Brand Name"
                  labelClassName={labelClass}
                >
                  {(c) => (
                    <Input
                      {...c}
                      type="text"
                      placeholder="e.g. Olive Bistro"
                      value={form.businessName}
                      onChange={update('businessName')}
                      className="bg-white px-3.5 text-xs"
                    />
                  )}
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field id="inquiry-phone" label="Phone / WhatsApp *" labelClassName={labelClass}>
                  {(c) => (
                    <Input
                      {...c}
                      type="tel"
                      required
                      placeholder="e.g. +91 93320 12109"
                      value={form.phone}
                      onChange={update('phone')}
                      className="bg-white px-3.5 text-xs"
                    />
                  )}
                </Field>
                <Field id="inquiry-email" label="Email" labelClassName={labelClass}>
                  {(c) => (
                    <Input
                      {...c}
                      type="email"
                      placeholder="e.g. hello@mybrand.com"
                      value={form.email}
                      onChange={update('email')}
                      className="bg-white px-3.5 text-xs"
                    />
                  )}
                </Field>
              </div>

              <Field
                id="inquiry-notes"
                label="Tell us about your project"
                labelClassName={labelClass}
              >
                {(c) => (
                  <Textarea
                    {...c}
                    rows={2}
                    placeholder="Website redesign, online table reservations, tasting menu showcase..."
                    value={form.notes}
                    onChange={update('notes')}
                    className="bg-white px-3.5 text-xs"
                  />
                )}
              </Field>

              <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row">
                <Button type="submit" className="w-full py-3 shadow-md sm:flex-1">
                  <Send className="h-3.5 w-3.5" />
                  <span>Request Proposal</span>
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleWhatsApp}
                  className="w-full px-5 py-3 sm:w-auto"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>WhatsApp Us</span>
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
