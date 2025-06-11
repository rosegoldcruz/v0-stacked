import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clapperboard, ImageIcon, Sparkles, Library, Video, Brain, Scan, Code2 } from "lucide-react"

const DashboardCard = ({
  title,
  description,
  icon: Icon,
  href,
  primary = false,
}: {
  title: string
  description: string
  icon: any
  href: string
  primary?: boolean
}) => {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden bg-gray-800 border border-gray-700 transition-all duration-300 ease-in-out",
        "hover:scale-[1.02] hover:shadow-primary-glow-md hover:-translate-y-1",
        primary && "ring-2 ring-cyan-400/50 shadow-primary-glow-sm", // Initial glow for primary
      )}
    >
      {/* Optional: Add a subtle background gradient or pattern for hero cards */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <CardHeader className="p-6 relative z-10">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
          <Icon
            className={cn(
              "h-6 w-6 transition-colors",
              primary ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-300",
            )}
          />
          {title}
        </CardTitle>
        <CardDescription className="text-gray-400 text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0 relative z-10">
        <Button
          asChild
          className={cn(
            "transition-all duration-200",
            primary ? "bg-cyan-600 hover:bg-cyan-700 text-white" : "bg-gray-700 hover:bg-gray-600 text-gray-200",
          )}
        >
          <Link href={href}>Open {title}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

const QuickAccessButton = ({ label, href, icon: Icon }: { label: string; href: string; icon: any }) => {
  return (
    <Button
      variant="outline"
      asChild
      className="border-gray-600 bg-gray-800 text-gray-300 transition-colors duration-200
                 hover:bg-primary/20 hover:text-primary hover:border-primary/50"
    >
      <Link href={href} className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-gray-400 group-hover:text-primary" />
        {label}
      </Link>
    </Button>
  )
}

const quickAccessItems = [
  { label: "Library", href: "/dashboard/library", icon: Library },
  { label: "Video Gen", href: "/dashboard/video-gen", icon: Video },
  { label: "Models", href: "/dashboard/models", icon: Brain },
  { label: "Canvas", href: "/dashboard/canvas", icon: Scan },
  { label: "API Access", href: "/dashboard/api-access", icon: Code2 },
]

export default function HomeDashboard() {
  return (
    <div className="dashboard-home min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            AEON Dashboard
          </h1>
          <p className="text-gray-400 text-lg">Unleash your creativity with AEON's next-generation AI tools.</p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-200">Your Creative Hub</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="AEON Studio"
              description="Craft modular 1-minute videos with precision and ease."
              icon={Clapperboard}
              href="/dashboard/studio"
              primary
            />
            <DashboardCard
              title="Image Generation"
              description="Generate stunning visuals from text prompts in seconds."
              icon={ImageIcon}
              href="/dashboard/image-gen"
            />
            <DashboardCard
              title="Universal Upscaler"
              description="Enhance resolution and quality of your media with AI."
              icon={Sparkles}
              href="/dashboard/upscaler"
            />
          </div>
        </section>

        <section className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-200">Quick Access</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {quickAccessItems.map((item) => (
              <QuickAccessButton key={item.label} {...item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
