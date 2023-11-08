import Card from "./Card"

export default function CardList() {
    return(
        <div className="p-6 gap-4 grid grid-cols-1 md:grid-cols-2">
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    )
}