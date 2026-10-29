import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const FarmContact: React.FC = () => {
  const [topic, setTopic] = useState('Egg Stock Check');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Ensure Web3Forms configuration parameters are explicitly set
      formData.set('access_key', '357a54f6-8b45-4ee0-9cf0-c2d8ed3f2760');
      formData.set('subject', 'New Farm Stand Inquiry from Flocking Reeds Farm');
      formData.set('from_name', 'Flocking Reeds Farm Website');
      formData.set('name', name);
      formData.set('email', email);
      formData.set('topic', topic);
      formData.set('message', message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(
          result.message || 'Something went wrong while sending your inquiry. Please try again or text Nicky directly!'
        );
      }
    } catch {
      setErrorMessage(
        'Unable to connect to the form service. Please try again or text Nicky directly at (603) 729-3568.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/95 dark:bg-[#132232]/95 rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/80 dark:border-emerald-500/80 shadow-xl shadow-emerald-500/5 space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-emerald-200 dark:border-emerald-900/60 pb-5">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-300/50">
            Direct Farm Inquiries
          </span>
          <h3 className="font-handwritten text-3xl sm:text-4xl font-bold text-emerald-800 dark:text-emerald-300 mt-1.5">
            Questions, Stock Checks & Inquiries
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 max-w-xl">
            Heading over to the stand, asking about quail hatching eggs, or want to say hello? Reach out directly to Nicky & Sammie.
          </p>
        </div>

        <div className="bg-stone-50 dark:bg-[#0b131e] px-3.5 py-2 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-stone-700 dark:text-stone-300 font-semibold">Fast Response from Nicky</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Contact Details & Info */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-stone-50 dark:bg-[#0b131e] p-5 rounded-2xl border-2 border-emerald-500/50 dark:border-emerald-500/60 shadow-sm space-y-3.5">
            <h4 className="font-handwritten text-2xl font-bold text-emerald-900 dark:text-emerald-300">
              Homestead Contact Info
            </h4>

            {/* Quick Text / Call Nicky's Phone Banner */}
            <div className="p-3.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border-2 border-amber-500/60 dark:border-amber-500/70 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 block">
                ⚡ Fastest Response: Text Nicky
              </span>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                <strong>Texting gets the fastest answer!</strong> All calls are screened through voicemail while we are outside tending the flock, so please leave a voicemail if you call. Texting is quickest, while voicemails and emails take a bit longer to reply to.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <a
                  href="sms:6037293568"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-lg text-xs shadow-xs transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Text Nicky (Fastest)</span>
                </a>
                <a
                  href="tel:6037293568"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-stone-200 hover:bg-stone-300 dark:bg-[#132232] dark:hover:bg-sky-950 text-stone-800 dark:text-stone-200 font-bold py-2 px-3 rounded-lg text-xs transition border border-stone-300 dark:border-sky-800/60"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call (Leave Voicemail)</span>
                </a>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <a
                href="mailto:support@flockingreeds.farm"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-500/10 transition group text-stone-700 dark:text-stone-200"
              >
                <span className="p-2 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                  <Mail className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Farm Stand & Support</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100 group-hover:text-sky-600 transition">
                    support@flockingreeds.farm
                  </span>
                </div>
              </a>

              <a
                href="mailto:nicky@flockingreeds.farm"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-500/10 transition group text-stone-700 dark:text-stone-200"
              >
                <span className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  <Mail className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Nicky's Direct Email</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 transition">
                    nicky@flockingreeds.farm
                  </span>
                </div>
              </a>

              <a
                href="mailto:sammie@flockingreeds.farm"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-500/10 transition group text-stone-700 dark:text-stone-200"
              >
                <span className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                  <Mail className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Sammie's Homestead Email</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition">
                    sammie@flockingreeds.farm
                  </span>
                </div>
              </a>

              <a
                href="mailto:admin@flockingreeds.farm"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-500/10 transition group text-stone-700 dark:text-stone-200"
              >
                <span className="p-2 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                  <MessageSquare className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Admin & Collabs</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100 group-hover:text-sky-600 transition">
                    admin@flockingreeds.farm
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-2.5 rounded-xl text-stone-700 dark:text-stone-200">
                <span className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Location</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    441 Millbrook Rd, Grafton, NH 03240
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Honor stand etiquette reminder */}
          <div className="bg-stone-50 dark:bg-[#0b131e] p-4 rounded-2xl border-2 border-emerald-500/40 dark:border-emerald-500/50 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-1">
              Visiting the Driveway Stand:
            </span>
            No need to knock or schedule an appointment to buy eggs! Pull up anytime 24/7, browse the coolers, drop payment in the metal box or scan with Square / Venmo / Cash App / PayPal.
          </div>
        </div>

        {/* Right Column: Web3Forms Powered Interactive Inquiry Form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="bg-stone-50 dark:bg-[#0b131e] p-6 sm:p-8 rounded-2xl border-2 border-emerald-500 shadow-md space-y-4 text-center">
              <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
              <h4 className="font-handwritten text-3xl font-bold text-emerald-800 dark:text-emerald-300">
                🎉 Thank You!
              </h4>
              <p className="text-sm sm:text-base text-stone-700 dark:text-stone-200 max-w-md mx-auto leading-relaxed">
                🎉 Thank you, <strong>{name}</strong>! Your message has been sent to Nicky & Sammie at Flocking Reeds Farm regarding <strong>{topic}</strong>.
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                We check our messages between chores and will get back to you at <strong>{email}</strong> as quickly as possible.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                  setName('');
                  setEmail('');
                  setErrorMessage(null);
                }}
                className="mt-3 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs sm:text-sm cursor-pointer shadow-md transition transform hover:-translate-y-0.5 active:scale-95"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              onSubmit={handleSubmit}
              className="bg-stone-50 dark:bg-[#0b131e] p-5 sm:p-6 rounded-2xl border-2 border-emerald-500/50 dark:border-emerald-500/60 shadow-md space-y-4 text-left"
            >
              {/* Web3Forms Hidden Configuration Inputs */}
              <input type="hidden" name="access_key" value="357a54f6-8b45-4ee0-9cf0-c2d8ed3f2760" />
              <input type="hidden" name="subject" value="New Farm Stand Inquiry from Flocking Reeds Farm" />
              <input type="hidden" name="from_name" value="Flocking Reeds Farm Website" />
              {/* Honeypot Spam Protection */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              {/* Error Alert if Submission Fails */}
              {errorMessage && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Inquiry Topic Dropdown */}
              <div className="space-y-1">
                <label htmlFor="topic" className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  Inquiry Topic
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-2.5 rounded-xl border-2 border-emerald-500/30 dark:border-emerald-500/40 bg-white dark:bg-[#132232] text-stone-900 dark:text-stone-100 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Egg Stock Check">🥚 Check Stand Egg Stock Today</option>
                  <option value="YouTube & Collaborations">🎬 YouTube Channel, Media & Collaborations</option>
                  <option value="Farm Visit / Directions">🚗 Farm Visit & Stand Directions</option>
                  <option value="Quail & Chicks">🐣 Live Birds / Quail / Chicks Inquiry</option>
                  <option value="Baked Goods">🧁 Baked Goods & Special Drops</option>
                  <option value="Community Support">💛 Pay-What-You-Can or Donation Question</option>
                  <option value="General Farm Question">👋 General Farm Question / Hello</option>
                </select>
              </div>

              {/* Visitor Name & Visitor Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                    Visitor Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Sarah M."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border-2 border-emerald-500/30 dark:border-emerald-500/40 bg-white dark:bg-[#132232] text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                    Visitor Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. sarah@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border-2 border-emerald-500/30 dark:border-emerald-500/40 bg-white dark:bg-[#132232] text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Ask your question or check if dozens are in the cooler right now..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border-2 border-emerald-500/30 dark:border-emerald-500/40 bg-white dark:bg-[#132232] text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold py-3 px-6 rounded-xl shadow-md transition transform hover:-translate-y-0.5 active:scale-95 text-sm cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Sending Message to Nicky & Sammie...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Farm Inquiry to Nicky & Sammie</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-stone-500 dark:text-stone-400 text-center">
                Inquiries are delivered securely via Web3Forms directly to Nicky's farm inbox.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
