import Link from 'next/link';
import {
  MoveRight,
  ShieldCheck,
  Zap,
  BarChart3,
  DatabaseZap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 bg-background text-foreground transition-colors duration-200">
      {/* 1. Hero Text Section */}
      <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.1] max-w-4xl">
        Launch and Scale Your Digital Products Ecosystem
      </h1>

      <p className="mt-6 text-xl text-muted-foreground max-w-2xl leading-relaxed">
        The complete platform for creators and builders to easily manage, sell,
        and secure premium digital assets. Join the AssetFlow marketplace and
        reach global customers.
      </p>

      {/* 2. Primary CTAs */}
      <div className="mt-12 flex items-center gap-4">
        {/* Uses the primary color from your inline theme map */}
        <Button
          size="lg"
          className="px-10 h-14 text-base bg-primary hover:opacity-90 text-white rounded-xl shadow-md shadow-primary/10"
        >
          <Link href="/browse" className="flex items-center gap-2">
            Explore Marketplace <MoveRight className="h-5 w-5" />
          </Link>
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="px-10 h-14 text-base border-border bg-background hover:bg-muted text-foreground rounded-xl"
        >
          <Link href="/auth/login">Start Selling Today</Link>
        </Button>
      </div>

      {/* 3. The Asset Flow Pipeline Visual (Hybrid Theme Variant) */}
      <div className="w-full max-w-6xl mt-24 p-8 bg-muted/40 border border-border rounded-3xl relative overflow-hidden group">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 relative z-10">
          {[
            {
              icon: Zap,
              label: 'Creator Upload',
              description: 'Soft-delete safe',
            },
            {
              icon: ShieldCheck,
              label: 'Security Check',
              description: 'Asset Integrity',
            },
            {
              icon: DatabaseZap,
              label: 'Secured Storage',
              description: 'Encrypted Files',
            },
            {
              icon: BarChart3,
              label: 'Buyer Access',
              description: 'Analytics Enabled',
            },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-background border border-border group-hover:border-primary rounded-full flex items-center justify-center text-primary transition-all shadow-sm">
                <item.icon className="h-10 w-10" />
              </div>
              <p className="text-foreground font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Feature Highlights Grid */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl mt-12 text-left">
        {[
          {
            title: 'SECURE COMMERCE',
            desc: 'Verified payments and secure asset storage for guaranteed, reliable transactions.',
            icon: ShieldCheck,
            primaryColor: 'text-emerald-600 dark:text-emerald-400',
            bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20',
          },
          {
            title: 'CREATOR EMPOWERMENT',
            desc: 'An intuitive dashboard to manage product listings, track detailed performance, and engage your audience.',
            icon: BarChart3,
            primaryColor: 'text-primary',
            bgColor: 'bg-primary/10 dark:bg-primary/20',
          },
          {
            title: 'PREMIUM DISCOVERY',
            desc: 'Discover high-quality, curated assets and accelerate your development with reliable resources.',
            icon: DatabaseZap,
            primaryColor: 'text-amber-600 dark:text-amber-400',
            bgColor: 'bg-amber-500/10 dark:bg-amber-500/20',
          },
        ].map((feat) => (
          <Card
            key={feat.title}
            className="bg-card text-card-foreground border-border rounded-2xl p-6 transition-colors hover:border-muted-foreground/30"
          >
            <CardContent className="p-0 flex flex-col gap-4">
              <div
                className={`p-3 w-12 h-12 rounded-xl ${feat.bgColor} flex items-center justify-center`}
              >
                <feat.icon className={`h-6 w-6 ${feat.primaryColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground tracking-tight">
                {feat.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feat.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <footer className="w-full py-6 text-center text-xs text-gray-500 opacity-60 hover:opacity-100 transition-opacity">
        <p>
          &copy; {new Date().getFullYear()} Asset Flow Market. All rights
          reserved.
        </p>
        <a
          href="https://www.flaticon.com/free-icons/digital-asset"
          title="digital asset icons"
          target="_blank"
          rel="noreferrer"
          className="underline block mt-1"
        >
          Digital asset icons created by afif fudin - Flaticon
        </a>
      </footer>
    </div>
  );
}
