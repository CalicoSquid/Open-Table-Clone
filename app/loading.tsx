import Header from "./components/Header";

const loadingCards = Array.from(Array(12)).map((card, i) => {
    return (
    <div 
    className="animate-pulse bg-slate-200 w-64 m-3 h-72 rounded overflow-hidden border cursor-pointer" 
    key={i}
    >
    </div>)
})

export default function loading() {
  return (
    <main>
        <Header />
        <div className="py-3 mt-10 flex flex-wrap px-36">
            {loadingCards}
        </div>
    </main>
  )
}
