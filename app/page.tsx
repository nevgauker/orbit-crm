'use client';
import { useAuth } from "@/contexts/auth_context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, UsersRound, UserPlus, Briefcase, BarChart3, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      const teamId = user.roles[0].team.id;
      router.push(`/dashboard/${teamId}`);
    } else {
      router.push("/signin");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="w-full border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="OrbitCRM" width={36} height={36} className="rounded-sm" />
            <span className="font-semibold">OrbitCRM</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#features" className="hover:text-foreground">Features</Link>
            <Link href="/pricing" className="hover:text-foreground">Pricing</Link>
            <Link href="/contact-sales" className="hover:text-foreground">Contact sales</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/signin" className="px-3 py-1.5 text-sm rounded-md border hover:bg-accent hover:text-accent-foreground">Sign in</Link>
            <button onClick={handleGetStarted} className="px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90">Get Started</button>
          </div>
        </div>
      </header>

      <section className="w-full">
        <div className="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Grow relationships. Close more deals.</h1>
            <p className="mt-4 text-lg text-muted-foreground">A clean, fast CRM your team will actually enjoy using. Track contacts, qualify leads, manage opportunities and stay on top of tasks — all in one place.</p>
            <div className="mt-6 flex items-center gap-3">
              <button onClick={handleGetStarted} className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90">Start Free</button>
              <Link href="/pricing" className="px-4 py-2 rounded-md border hover:bg-accent hover:text-accent-foreground">See Pricing</Link>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><CheckCircle2 className="text-primary" size={18} /> No credit card required</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="text-primary" size={18} /> Team-based access</div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md border p-4">
                <div className="text-sm text-muted-foreground flex items-center gap-2"><UsersRound size={16} /> Contacts</div>
                <div className="mt-2 text-2xl font-semibold">Centralized</div>
              </div>
              <div className="rounded-md border p-4">
                <div className="text-sm text-muted-foreground flex items-center gap-2"><UserPlus size={16} /> Leads</div>
                <div className="mt-2 text-2xl font-semibold">Qualified</div>
              </div>
              <div className="rounded-md border p-4">
                <div className="text-sm text-muted-foreground flex items-center gap-2"><Briefcase size={16} /> Opportunities</div>
                <div className="mt-2 text-2xl font-semibold">Pipeline</div>
              </div>
              <div className="rounded-md border p-4">
                <div className="text-sm text-muted-foreground flex items-center gap-2"><BarChart3 size={16} /> Reports</div>
                <div className="mt-2 text-2xl font-semibold">Insights</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="w-full border-t">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <Feature icon={<LayoutDashboard />} title="Unified dashboard" desc="See KPIs and recent activity at a glance across your teams." />
            <Feature icon={<UsersRound />} title="Contacts & teams" desc="Segment by teams with role-based access and invites." />
            <Feature icon={<Briefcase />} title="Sales pipeline" desc="Track opportunities from open to won and forecast revenue." />
          </div>
        </div>
      </section>

      <section className="w-full border-t">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-lg border bg-card p-8 text-center">
            <h3 className="text-2xl font-semibold">Ready to get started?</h3>
            <p className="mt-2 text-muted-foreground">Join teams using OrbitCRM to streamline their customer relationships.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button onClick={handleGetStarted} className="px-5 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90">Create Free Account</button>
              <Link href="/pricing" className="px-5 py-2 rounded-md border hover:bg-accent hover:text-accent-foreground">View Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full border-t">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground flex items-center justify-between">
          <span>© {new Date().getFullYear()} OrbitCRM</span>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="hover:text-foreground">Pricing</Link>
            <Link href="/contact-sales" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">{icon} {title}</div>
      <div className="mt-2 text-base text-muted-foreground">{desc}</div>
    </div>
  );
}
