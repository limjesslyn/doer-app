import { showFormattedDate } from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Card(props: any) {
    const router = useRouter();
    const data = props.data;
    

    const onEditHandler = () => {
        router.push({
            pathname: '/editTask',
            query: {
                taskID: `${data.id}`,
                name: `${data.name}`,
                description: `${data.description}`
            }
        })
    }

    const onDetailHandler = () => {
        router.push({
            pathname: '/taskDetail',
            query: {
                taskID: `${data.id}`,
                createdAt: `${data.created_at}`,
                name: `${data.name}`,
                description: `${data.description}`,
                isComplete: `${data.is_complete}`
            }
        })
    }

    return (
        <>
            <div className="card bg-neutral text-neutral-content h-full">
                <div className="card-body">
                    <p className="text-gray-400 text-sm text-end">{showFormattedDate(data.created_at)}</p>
                    <button 
                        className="card-title hover:underline"
                        onClick={onDetailHandler}
                    >
                        {props.name}
                    </button>
                    <p className="truncate">{data.description}</p>
                    <div className="card-actions justify-end flex flex-row flex-nowrap gap-4 mt-4">
                        <button
                            className="btn btn-info hover:bg-sky-600 hover:border-sky-600 text-white md:w-1/4 sm:w-1/2"
                            onClick={onEditHandler}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-error hover:bg-red-500 hover:border-red-500 md:w-1/4 sm:w-1/2 text-white"
                            onClick={() => data.onDelete(props.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}