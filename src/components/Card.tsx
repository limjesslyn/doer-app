export default function Card() {
    return (
        <>
            <div className="card bg-neutral text-neutral-content h-full">
                <div className="card-body">
                    <h2 className="card-title">Cookies!</h2>
                    <p className="truncate">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <div className="card-actions justify-end flex flex-row flex-nowrap gap-4 mt-4">
                        <button className="btn btn-primary md:w-1/4 sm:w-1/2">Edit</button>
                        <button className="btn btn-error md:w-1/4 sm:w-1/2 text-white">Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}