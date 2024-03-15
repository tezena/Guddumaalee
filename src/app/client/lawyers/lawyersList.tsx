import LawyersCard from "@/components/lawyersCard";


const data=[
    {
        id:"1234",
        name:"Mezgebu Dubale",
        imageUrl:"https://img.freepik.com/free-photo/portrait-expressive-young-man-wearing-formal-suit_273609-6942.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1710288000&semt=ais",
        des:"  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu sapien porttitor, blandit velit acvehicula elit. Nunc et ex at turpis rutrum viverra.",
        rate:5,

    },
    {
        id:"1234",
        name:"Mezgebu Dubale",
        imageUrl:"https://img.freepik.com/free-photo/portrait-expressive-young-man-wearing-formal-suit_273609-6942.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1710288000&semt=ais",
        des:"  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu sapien porttitor, blandit velit acvehicula elit. Nunc et ex at turpis rutrum viverra.",
        rate:5,

    },
    {
        id:"1234",
        name:"Mezgebu Dubale",
        imageUrl:"https://img.freepik.com/free-photo/portrait-expressive-young-man-wearing-formal-suit_273609-6942.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1710288000&semt=ais",
        des:"  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu sapien porttitor, blandit velit acvehicula elit. Nunc et ex at turpis rutrum viverra.",
        rate:5,

    },
    {
        id:"1234",
        name:"Mezgebu Dubale",
        imageUrl:"https://img.freepik.com/free-photo/portrait-expressive-young-man-wearing-formal-suit_273609-6942.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1710288000&semt=ais",
        des:"  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu sapien porttitor, blandit velit acvehicula elit. Nunc et ex at turpis rutrum viverra.",
        rate:5,

    },
    
]
const LawyersList=()=>{

    return (
        <div className="container px-5 py-5 mx-auto">
           <div className="flex flex-wrap -m-4 text-center">
           
           {data.map((item,inex)=>{
                  return (
                    <LawyersCard id={item.id} name={item.name} imageUrl={item.imageUrl} des={item.des} rate={item.rate}/>

                  )
           })}   
           </div>

  </div>

    )
}


export default LawyersList;