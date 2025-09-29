import hood from "@/assets/hood-tee.jpg"
import testsrc from "@/assets/toy-hero2.jpg"
import Category from "./category"


const CategorySection = () => {
    const categoryItem = [
        {
            gender:'Hats',
            src:testsrc
        }, {
            gender:'Tees',
            src:hood
        }
    ]

    return(
        <section className="w-full h-[110vh] py-10">
            <div className="h-full w-[90%] mx-auto space-y-10">
                <h2 className="text-4xl">Collections</h2>
                <div className="flex flex-col md:flex-row w-full h-full  gap-5">
                    {categoryItem.map((item:any) => <Category gender={item.gender} src={item.src}/>)}
                </div>
            </div>
            
        </section>
    )
}

export default CategorySection