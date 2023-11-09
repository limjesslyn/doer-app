import { useEffect, useState } from 'react';
import Card from "./Card"

export default function CardList({ taskList, onDelete }: any) {

    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const decrease = () => {
        let value = currentPage;
        if (value - 1 < 1) {
            setCurrentPage(1);
        } else {
            setCurrentPage(value - 1);
        }
    };

    const increase = (totalPages: any) => {
        var value = currentPage;
        if (value + 1 > totalPages) {
            setCurrentPage(value);
        } else {
            setCurrentPage(value + 1);
        }
    };

    const generateCard = () => {
        if (taskList.length === 0) {
            return (
                <h3>Empty Now...</h3>
            )
        }

        let components = []
        for (let i = (itemsPerPage * currentPage) - itemsPerPage; i < Math.min(itemsPerPage * currentPage, taskList.length); i++) {
            components.push(<Card key={i} data={taskList[i]} onDelete={onDelete} />);
        }

        return components;
    }

    const generatePagination = () => {
        const totalPages = Math.ceil(taskList.length / itemsPerPage);

        return (
            <div className='flex flex-col items-center'>
                <div className="join mt-10">
                    <div className='mt-2'>
                        <button className="join-item btn" onClick={decrease}>«</button>
                        <button
                            className="join-item btn"
                        >
                            {currentPage}
                        </button>
                        <button className="join-item btn rounded-r" onClick={() => increase(totalPages)}>»</button>
                    </div>
                </div>
                <p className='pt-2'>
                    Showing {currentPage} of {totalPages}
                </p>
            </div>
        )
    }


    if (taskList === undefined) {
        return null;
    }

    return (
        <div className="p-4">
            <div className='md:h-96'>
                <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
                    {generateCard()}
                </div>
            </div>
            {generatePagination()}
        </div>
    )
}