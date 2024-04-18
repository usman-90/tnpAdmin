import BoxComponent from "../../Components/box/Box";
import LineBarGraph from "../../Components/graph/graph";





const Dashboard = () => {
    return (
        <div className="p-4">
            <div className="  flex flex-col lg:flex-row justify-between items-center lg:items-start ">
                <BoxComponent heading="Total Booked" value="24.590" tagText="+12.08%" />
                <BoxComponent heading="30 days Revenue" value="24.590 PKR" tagText="+12.08%" />
                <BoxComponent heading="Total Customers" value="24.590" tagText="+12.08%" />
                <BoxComponent heading="Tour Packages" value="24.590 PKR" tagText="+12.08%" />
            </div>
<div>
    <div className="lg:w-[70%] w-full items-center lg:items-start flex">
            <LineBarGraph />

    </div>

</div>
            
        </div>

    )

}
export default Dashboard;