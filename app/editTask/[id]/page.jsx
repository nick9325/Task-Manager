import EditTaskForm from "@/components/EditTaskForm";


const getTaskById = async(id) =>{
  try{
    const res=await fetch(`http://localhost:3000/api/tasks/${id}`,{
      cache: "no-store",
    })
    if(!res.ok){
      throw new Error("Failed to fetch topic");
    }
    return res.json();
  }
  catch(error){
      console.log(error);
  }
}


export default async function EditTask({params}) {
  const {id}=params;
  const {task}=await getTaskById(id);
  const {title, description} = task;
  return <EditTaskForm id={id} title={title} description={description}/>
}
