type SectionProps = {
  children: React.ReactNode;
}
const Section: React.FC<SectionProps> = ({children}) => {
  return (
    <section className="h-[80vh] min-h-fit box-border
    m-[0_2rem] lg:m-[0_10rem] border-[red] 
    pt-[4vh]">
      {children}
    </section>
  )
}

export default Section;