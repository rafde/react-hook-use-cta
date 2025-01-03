import CreateCTATopic from '../components/topics/create-cta';
import CreateCTAContextTopic from '../components/topics/create-cta-context';
import ExportTypesTopic from '../components/topics/export-types';
import InstallTopic from '../components/topics/install';
import IntroductionTopic from '../components/topics/introduction';
import ReturnCTAParameterTopic from '../components/topics/return-cta-parameter';
import UseCTATopic from '../components/topics/use-cta';
import getSourceFiles from '../util/getSourceFiles';

export default async function Home() {
	const sourceCodeRecord = await getSourceFiles();
	return (
		<>
			<IntroductionTopic />
			<section className="z-10 flex flex-col bg-black">
				<InstallTopic />
				<UseCTATopic sourceCodeRecord={sourceCodeRecord} />
				<CreateCTATopic sourceCodeRecord={sourceCodeRecord} />
				<CreateCTAContextTopic sourceCodeRecord={sourceCodeRecord} />
				<ReturnCTAParameterTopic />
				<ExportTypesTopic sourceCodeRecord={sourceCodeRecord} />
			</section>
		</>
	);
}
