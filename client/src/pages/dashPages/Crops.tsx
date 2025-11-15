import DashMenuLayout from "../../components/DashMenuLayout.tsx";
import NewsCardGroup from "../../components/NewsCardGroup.tsx";

const Crops = () => {
    return (
        <div>
            <DashMenuLayout title={`Crops`}>
                <p className="font-semibold text-xl">Plant and Crops Related Memes</p>
                <NewsCardGroup apiUrl="https://newsapi.org/v2/everything?q=crops"/>
            </DashMenuLayout>
        </div>
    );
};

export default Crops;