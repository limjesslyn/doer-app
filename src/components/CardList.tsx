import Card from "./Card"

export default function CardList({taskList, onDelete}:any) {
    // const taskList = props.taskList;

    console.log(taskList);

    const generateCard = () => {
        let content = taskList.map((task: any) => {
            return (
                <Card
                    key={task.id}
                    {...task}
                    onDelete={onDelete}
                />
            )
        })
        console.log(content);
        

        if (content.length === 0) {
            return (
                <h3>Empty Now...</h3>
            )
        }
        return content;
    }

    if(taskList === undefined){
        return null;
    }

    return (
        <div className="p-6 gap-4 grid grid-cols-1 md:grid-cols-2">
            {generateCard()}
        </div>
    )
}