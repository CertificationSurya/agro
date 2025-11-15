const About = () => {
	return (
		<div className="min-h-screen bg-white text-black flex items-center justify-center p-8">
			<div className="max-w-3xl text-center space-y-6">
				<h1 className="text-4xl font-semibold tracking-wide">
					About Our Platform
				</h1>

				<p className="text-lg leading-relaxed text-gray-700">
					Our agro-support platform connects{" "}
					<span className="font-medium">farmers</span> with
					<span className="font-medium"> agricultural experts</span>, creating a
					space where knowledge is shared freely, problems are solved quickly,
					and better farming decisions are made with confidence.
				</p>

				<p className="text-lg leading-relaxed text-gray-700">
					Farmers can ask questions, upload field images, seek crop guidance,
					and get instant suggestions from verified experts. Experts can provide
					solutions, share research-based insights, and help improve
					agricultural productivity.
				</p>

				<p className="text-lg leading-relaxed text-gray-700">
					Our goal is simple — make farming smarter, easier, and more accessible
					through a clean, reliable, and supportive digital platform.
				</p>

				<hr className="border-black/20 my-8" />

				<p className="text-md text-gray-600">
					Empowering agriculture, one conversation at a time.
				</p>
			</div>
		</div>
	);
};

export default About;
