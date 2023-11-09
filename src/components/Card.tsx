import { showFormattedDate } from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Card(props: any) {
    const router = useRouter();

    const onEditHandler = () => {
        router.push({
            pathname: '/editTask',
            query: {
                taskID: `${props.id}`,
                name: `${props.name}`,
                description: `${props.description}`
            }
        })
    }

    const onDetailHandler = () => {
        router.push({
            pathname: '/taskDetail',
            query: {
                taskID: `${props.id}`,
                createdAt: `${props.created_at}`,
                name: `${props.name}`,
                description: `${props.description}`,
                isComplete: `${props.is_complete}`
            }
        })
    }

    return (
        <>
            <div className="card bg-neutral text-neutral-content h-full">
                <div className="card-body">
                    <p className="text-gray-400 text-sm text-end">{showFormattedDate(props.created_at)}</p>
                    <button 
                        className="card-title hover:underline"
                        onClick={onDetailHandler}
                    >
                        {props.name}
                    </button>
                    <p className="truncate">{props.description}</p>
                    <div className="card-actions justify-end flex flex-row flex-nowrap gap-4 mt-4">
                        <button
                            className="btn btn-info hover:bg-sky-600 hover:border-sky-600 text-white md:w-1/4 sm:w-1/2"
                            onClick={onEditHandler}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-error hover:bg-red-500 hover:border-red-500 md:w-1/4 sm:w-1/2 text-white"
                            onClick={() => props.onDelete(props.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}