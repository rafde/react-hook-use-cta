import Install from './Install';
import Introduction from './Introduction';
import UseCTA from './UseCTA';

export default function Home() {
	return (
		<>
			<Introduction />
			<section className="z-10 flex flex-col bg-black">
				<Install />
				<UseCTA />
			</section>
		</>
	);
}
