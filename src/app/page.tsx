import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Shield, Zap, Link2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div 
      className="min-h-screen bg-white"
      style={{
        backgroundImage: 'url(/home-banner.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Header */}
      <header className="border-b border-accent/20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/biozy-logo.svg" 
              alt="Biozy" 
              width={120} 
              height={40}
              priority
            />
          </Link>
          <Link
            href="/admin"
            className="px-6 py-2.5 bg-accent text-white rounded-full font-semibold hover:bg-accent/90 transition-all hover:shadow-lg"
          >
            Admin Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 shadow-sm">
            <Sparkles className="text-accent" size={20} />
            <span className="text-sm font-medium text-text-primary">
              Your Digital Identity, Simplified
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
            One Link,
            <br />
            <span className="text-accent">Endless Possibilities</span>
          </h2>
          
          <p className="text-xl text-text-primary/70 max-w-2xl mx-auto mb-8">
            Create a beautiful landing page for all your important links. 
            Share your content, social media, portfolio, and more in one place.
          </p>
          
          <Link
            href="/admin"
            className="inline-block px-8 py-4 bg-accent text-white rounded-full font-semibold text-lg hover:bg-accent/90 transition-all hover:shadow-xl hover:scale-105"
          >
            Get Started
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <Zap className="text-accent" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Lightning Fast
            </h3>
            <p className="text-text-primary/70">
              Create and share your personalized link page in minutes. No coding required.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <Shield className="text-accent" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Secure & Reliable
            </h3>
            <p className="text-text-primary/70">
              Your data is safe with us. Built with modern security practices and reliability in mind.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <Link2 className="text-accent" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Unlimited Links
            </h3>
            <p className="text-text-primary/70">
              Add as many links as you want. Organize your entire online presence in one place.
            </p>
          </div>
        </div>

        {/* Example Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-text-primary mb-4">
            Clean, Modern Design
          </h3>
          <p className="text-text-primary/70 mb-8">
            Every link page is beautifully designed and mobile-optimized
          </p>
          
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8">
            <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent/70 rounded-full mx-auto mb-4"></div>
            <h4 className="text-2xl font-bold text-text-primary mb-2">Your Name</h4>
            <p className="text-text-primary/70 mb-6">Your bio goes here</p>
            
            <div className="space-y-3">
              <div className="bg-bg-primary rounded-xl p-4 text-text-primary font-medium hover:shadow-md transition-shadow cursor-pointer">
                Your First Link
              </div>
              <div className="bg-bg-primary rounded-xl p-4 text-text-primary font-medium hover:shadow-md transition-shadow cursor-pointer">
                Your Second Link
              </div>
              <div className="bg-bg-primary rounded-xl p-4 text-text-primary font-medium hover:shadow-md transition-shadow cursor-pointer">
                Your Third Link
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-accent/20 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <div className="flex justify-center mb-3">
            <Image 
              src="/biozy-logo.svg" 
              alt="Biozy" 
              width={100} 
              height={33}
              className="opacity-70"
            />
          </div>
          <p className="text-text-primary/60 text-sm">© 2025 Biozy.co - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

