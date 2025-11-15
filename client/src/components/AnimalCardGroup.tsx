import NewsCardGroup from "./NewsCardGroup.tsx";

const AnimalCardGroup = () => {
	return (
		<div>
			<p className={`font-semibold text-lg text-gray-800`}>Animal News</p>
			<NewsCardGroup apiUrl="https://newsapi.org/v2/everything?q=farm+animal"/>
		</div>
	);
};

export default AnimalCardGroup;
