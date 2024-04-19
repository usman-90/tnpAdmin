import BoxComponent from "../../Components/box/Box";
import LineBarGraph from "../../Components/graph/graph";
import GradientProgressBar from "../../Components/progress/progress";





const Dashboard = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="  flex flex-col lg:flex-row justify-between items-center lg:items-start ">
                <BoxComponent heading="Total Booked" value="24.590" tagText="+12.08%" />
                <BoxComponent heading="30 days Revenue" value="24.590 PKR" tagText="+12.08%" />
                <BoxComponent heading="Total Customers" value="24.590" tagText="+12.08%" />
                <BoxComponent heading="Tour Packages" value="24.590 PKR" tagText="+12.08%" />
            </div>
<div className="flex flex-col lg:flex-row  gap-2 justify-between">
    <div className="lg:w-[70%] bg-pink-600 w-full items-center lg:items-start flex">
            <LineBarGraph />

    </div>
    <div className="lg:w-[30%] h-54 w-full   justify-center items-center lg:items-start flex ">
        <GradientProgressBar text="4078"/>

    </div>

</div>
            
        </div>

    )

}
export default Dashboard;