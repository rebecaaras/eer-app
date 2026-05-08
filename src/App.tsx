import './App.css'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./components/ui/navigation-menu"
import {
  BarChart3,
  Globe,
  LayoutDashboard,
} from "lucide-react"

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navbar */}
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-l font-bold text-slate-900">
                Effective Exchange Rates
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {/* Dashboard */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="group inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Reports */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="group inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Reports
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Global */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="group inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Reference Areas
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
    </div>
  )
}

export default App;