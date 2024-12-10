import Code from './ui/code';

export const introductionConfig = {
	href: 'introduction',
	title: 'Introduction',
	desc: <>
		react-hook-use-cta: <Code>useCTA</Code> (use Call To Action)
	</>,
};
export const installNPMConfig = {
	href: 'install-npm',
	title: 'NPM',
};
export const installYarnConfig = {
	href: 'install-yarn',
	title: 'Yarn',
};
export const installConfig = {
	href: 'install',
	subNav: [
		installNPMConfig,
		installYarnConfig,
	],
	title: 'Install',
};

export const useCTAParameterInitialConfig = {
	desc: <>
		Parameter:
		{' '}
		<Code>initial</Code>
	</>,
	href: 'use-cta-parameter-initial',
	title: 'Parameter: initial',
};

export const useCTAParameterOnInitConfig = {
	desc: <>
		Parameter:
		{' '}
		<Code>onInit</Code>
	</>,
	href: 'use-cta-parameter-on-init',
	title: 'Parameter: onInit',
};

export const useCTAParameterCompareConfig = {
	desc: <>
		Parameter:
		{' '}
		<Code>compare</Code>
	</>,
	href: 'use-cta-parameter-compare',
	title: 'Parameter: compare',
};

export const useCTAParameterActionsConfig = {
	desc: <>
		Parameter:
		{' '}
		<Code>actions</Code>
	</>,
	href: 'use-cta-parameter-actions',
	title: 'Parameter: actions',
};

export const useCTAParameterActionsDefaultConfig = {
	desc: <>
		Overridable Default
		{' '}
		<Code>actions</Code>
	</>,
	href: 'use-cta-parameter-actions-overridable-default',
	title: 'Overridable Default actions',
};

export const useCTAParameterActionsDefaultParameterCTAHistoryConfig = {
	desc: <>
		Overridable Default <Code>action</Code> Parameter: <Code>CTAHistory</Code>
	</>,
	href: 'use-cta-parameter-actions-overridable-default-parameter-cta-history',
	title: 'Overridable Default action Parameter: CTAHistory',
};

export const useCTAParameterActionsDefaultParameterPayloadConfig = {
	desc: <>
		Overridable Default <Code>action</Code> Parameter: <Code>payload</Code>
	</>,
	href: 'use-cta-parameter-actions-overridable-default-parameter-cta-payload',
	title: 'Overridable Default action Parameter: payload',
};

export const useCTAParameterActionsDefaultReturnConfig = {
	desc: <>
		Overridable Default <Code>return</Code> value
	</>,
	href: 'use-cta-parameter-actions-overridable-default-return-value',
	title: 'Overridable Default return value',
};

export const useCTAParameterActionsCustomConfig = {
	desc: <>
		Custom
		{' '}
		<Code>actions</Code>
	</>,
	href: 'use-cta-parameter-actions-custom',
	title: 'Custom actions',
};

export const useCTAParameterActionsParameterCustomCTAHistoryConfig = {
	desc: <>
		Custom <Code>action</Code> Parameter: <Code>CustomCTAHistory</Code>
	</>,
	href: 'use-cta-parameter-actions-custom-cta-history',
	title: 'Custom action Parameter: CustomCTAHistory',
};

export const useCTAParameterActionsParameterCustomParametersArgsConfig = {
	desc: <>
		Custom <Code>action</Code> Parameters: <Code>...args</Code>
	</>,
	href: 'use-cta-parameter-actions-custom-parameters-args',
	title: 'Custom action Parameters: ...args',
};

export const useCTAParameterActionsCustomReturnConfig = {
	desc: <>
		Custom <Code>action</Code> <Code>return</Code> value
	</>,
	href: 'use-cta-parameter-actions-custom-return',
	title: 'Custom actions return value',
};

export const useCTAReturnValuesConfig = {
	desc: <>
		<Code>return</Code> values
	</>,
	href: 'use-cta-return-values',
	title: 'return values',
};

export const useCTAReturnValues0HistoryConfig = {
	desc: <>
		<Code>return</Code> value
		{' '}
		<Code>[0]</Code>
		:
		{' '}
		<Code>history</Code>
	</>,
	href: 'use-cta-return-value-0-history',
	title: 'Return value [0]: history',
};

export const useCTAReturnValues1DispatchConfig = {
	desc: <>
		<Code>return</Code> value
		{' '}
		<Code>[1]</Code>
		:
		{' '}
		<Code>dispatch</Code>
	</>,
	href: 'use-cta-return-value-1-dispatch',
	title: 'Return value [1]: dispatch',
};

export const useCTAReturnValuesDispatchCTAUpdateConfig = {
	desc:<Code>dispatch.cta.update</Code>,
	href: 'use-cta-return-value-1-dispatch-cta-update',
	title: 'dispatch.cta.update',
};

export const useCTAReturnValuesDispatchCTAReplaceConfig = {
	desc:<Code>dispatch.cta.replace</Code>,
	href: 'use-cta-return-value-1-dispatch-cta-replace',
	title: 'dispatch.cta.replace',
};

export const useCTAReturnValuesDispatchCTAResetConfig = {
	desc:<Code>dispatch.cta.reset</Code>,
	href: 'use-cta-return-value-1-dispatch-cta-reset',
	title: 'dispatch.cta.reset',
};

export const useCTAReturnValuesDispatchCTAUpdateInitialConfig = {
	desc:<Code>dispatch.cta.updateInitial</Code>,
	href: 'use-cta-return-value-1-dispatch-cta-updateInitial',
	title: 'dispatch.cta.updateInitial',
};

export const useCTAReturnValuesDispatchCTAReplaceInitialConfig = {
	desc:<Code>dispatch.cta.replaceInitial</Code>,
	href: 'use-cta-return-value-1-dispatch-cta-replaceInitial',
	title: 'dispatch.cta.replaceInitial',
};

export const useCTAReturnValuesDispatchCTACustomActionConfig = {
	desc:<Code>dispatch.cta.YourCustomAction</Code>,
	href: 'use-cta-return-value-1-dispatch-cta-custom-action',
	title: 'dispatch.cta.YourCustomAction',
};

export const useCTAReturnValuesDispatchHistoryConfig = {
	desc:<Code>dispatch.history</Code>,
	href: 'use-cta-return-value-1-dispatch-history',
	title: 'dispatch.history',
};

export const useCTAConfig = {
	href: 'use-cta',
	subNav: [
		useCTAParameterInitialConfig,
		useCTAParameterOnInitConfig,
		useCTAParameterCompareConfig,
		useCTAParameterActionsConfig,
		useCTAParameterActionsDefaultConfig,
		useCTAParameterActionsDefaultParameterCTAHistoryConfig,
		useCTAParameterActionsDefaultReturnConfig,
		useCTAParameterActionsCustomConfig,
		useCTAParameterActionsParameterCustomCTAHistoryConfig,
		useCTAParameterActionsParameterCustomParametersArgsConfig,
		useCTAParameterActionsCustomReturnConfig,
		useCTAReturnValuesConfig,
		useCTAReturnValues0HistoryConfig,
		useCTAReturnValues1DispatchConfig,
		useCTAReturnValuesDispatchCTAUpdateConfig,
		useCTAReturnValuesDispatchCTAReplaceConfig,
		useCTAReturnValuesDispatchCTAResetConfig,
		useCTAReturnValuesDispatchCTAUpdateInitialConfig,
		useCTAReturnValuesDispatchCTAReplaceInitialConfig,
		useCTAReturnValuesDispatchCTACustomActionConfig,
		useCTAReturnValuesDispatchHistoryConfig,
	],
	title: 'useCTA',
};

export const navList: {
	href: string
	subNav?: Array<{
		title: string
		href: string
	}>
	title: string
}[] = [
	introductionConfig,
	installConfig,
	useCTAConfig,
];
