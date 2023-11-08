import { API_BASE_URL, showFormattedDate } from "@/utils/utils";

export default function Card(props: any) {
    console.log(props);


    return (
        <>
            <div className="card bg-neutral text-neutral-content h-full">
                <div className="card-body">
                    <p className="text-gray-400 text-sm text-end">{showFormattedDate(props.created_at)}</p>
                    <h2 className="card-title">{props.name}</h2>
                    <p className="truncate">{props.description}</p>
                    <div className="card-actions justify-end flex flex-row flex-nowrap gap-4 mt-4">
                        <button className="btn btn-info hover:bg-sky-600 hover:border-sky-600 text-white md:w-1/4 sm:w-1/2">Edit</button>
                        <button
                            className="btn btn-error hover:bg-red-500 hover:border-red-500 md:w-1/4 sm:w-1/2 text-white"
                            onClick={() => props.onDelete(props.id)}
                        >Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}