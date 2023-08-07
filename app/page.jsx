import Tasklist from "@/components/Tasklist";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <div className="mb-8"> 
        <Header />
      </div>
      <Tasklist />
    </>
  )
}
