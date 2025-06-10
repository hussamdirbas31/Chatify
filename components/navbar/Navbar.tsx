import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import AuthButtons from "./AuthButtons";

export default async function Navbar() {
 
  return (
    <header className="relative h-[4rem] flex justify-center items-center z-50 bg-zinc-950 backdrop-blur border-b border-zinc-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[100%] items-center justify-between">
          
          {/* Left side */}
          <div className="flex items-center gap-8">
            <Logo />
 
          {/* Right side */}
          <div className="flex items-center gap-4">
            
            <div className="hidden md:flex items-center gap-2">
              <AuthButtons  />
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <MobileMenu   />
            </div>
          </div>
        </div>
      </div>
 </div>
    </header>
  );
}