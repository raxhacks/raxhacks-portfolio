import Contact from "./Contact";
import Experience from "./Experience";
import Projects from "./Projects";

export default function Slides() {
  return (
    <div className="relative">
      
      {/* Experience section - NOT sticky, takes full scroll height */}
      <Experience />
      
      {/* <div className="sticky top-0 h-screen 
      flex items-center justify-center bg-white">
        <Projects />
      </div>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <Contact />
      </div> */}
    </div>
  );
}
