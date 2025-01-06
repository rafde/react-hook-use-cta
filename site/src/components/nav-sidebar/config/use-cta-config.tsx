import { NavItem, } from './index';
import Code from '../../ui/code';
import { useCTAParameterActionsCustomConfig, } from './use-cta-parameter-actions-custom-config';
import { useCTAParameterActionsOverridableConfig, } from './use-cta-parameter-actions-override-built-in-config';
import { useCTAReturnValues1DispatchConfig, } from './use-cta-return-values-1-dispatch-config';

export const useCTABasicExampleConfig: NavItem = {
	desc: <>
		<Code>useCTA</Code>
		{' '}
		Basic Example
	</>,
	href: 'use-cta-basic-example',
	title: 'useCTA Basic Example',
	navTitle: 'Basic Example',
};
export const useCTAParameterInitialConfig: NavItem = {
	desc: <>
		Parameter:
		{' '}
		<Code>initial</Code>
	</>,
	href: 'use-cta-parameter-initial',
	title: 'Parameter: initial',
};
export const useCTAParameterOnInitExampleConfig: NavItem = {
	desc: <>
		<Code>onInit</Code>
		{' '}
		Example
	</>,
	href: 'use-cta-parameter-on-init-example',
	title: 'Parameter: onInit Example',
};
export const useCTAParameterOnInitConfig: NavItem = {
	desc: <>
		Parameter:
		{' '}
		<Code>onInit</Code>
	</>,
	href: 'use-cta-parameter-on-init',
	subNav: [
		useCTAParameterOnInitExampleConfig,
	],
	title: 'Parameter: onInit',
};
export const useCTAParameterCompareExampleConfig: NavItem = {
	desc: <>
		<Code>compare</Code>
		{' '}
		Example
	</>,
	href: 'use-cta-parameter-compare-example',
	title: 'Parameter: compare Example',
};
export const useCTAParameterCompareConfig: NavItem = {
	desc: <>
		Parameter:
		{' '}
		<Code>compare</Code>
	</>,
	href: 'use-cta-parameter-compare',
	subNav: [
		useCTAParameterCompareExampleConfig,
	],
	title: 'Parameter: compare',
};

export const useCTAParameterAfterActionChangeExampleConfig: NavItem = {
	desc: <>
		Parameter:
		{' '}
		<Code>afterActionChange</Code>
		{' '}
		Example
	</>,
	navTitle: <>
		<Code>afterActionChange</Code>
		{' '}
		Example
	</>,
	href: 'use-cta-parameter-after-action-change-example',
	title: 'Parameter: afterActionChange Example',
};
export const useCTAParameterAfterActionChangeConfig: NavItem = {
	desc: <>
		Parameter:
		{' '}
		<Code>afterActionChange</Code>
	</>,
	href: 'use-cta-parameter-after-action-change',
	subNav: [
		useCTAParameterAfterActionChangeExampleConfig,
	],
	title: 'Parameter: afterActionChange',
};

export const useCTAParameterTransformExampleConfig: NavItem = {
	desc: <>
		Parameter:
		{' '}
		<Code>transform</Code>
		{' '}
		Example
	</>,
	navTitle: <>
		<Code>transform</Code>
		{' '}
		Example
	</>,
	href: 'use-cta-parameter-transform-example',
	title: 'Parameter: transform Example',
};
export const useCTAParameterTransformConfig: NavItem = {
	desc: <>
		Parameter:
		{' '}
		<Code>transform</Code>
	</>,
	href: 'use-cta-parameter-transform',
	subNav: [
		useCTAParameterTransformExampleConfig,
	],
	title: 'Parameter: transform',
};

export const useCTAReturnValues0HistoryConfig: NavItem = {
	desc: <>
		<Code>useCTA return</Code>
		{' '}
		value
		{' '}
		<Code>[0]</Code>
		:
		{' '}
		<Code>history</Code>
	</>,
	href: 'use-cta-return-value-0-history',
	navTitle: <>
		<Code>[0]</Code>
		:
		{' '}
		<Code>history</Code>
	</>,
	title: 'Return value [0]: history',
};
export const useCTAReturnValuesConfig: NavItem = {
	desc: <>
		<Code>useCTA return</Code>
		{' '}
		values
	</>,
	navTitle: <>
		<Code>return</Code>
		{' '}
		values
	</>,
	href: 'use-cta-return-values',
	subNav: [
		useCTAReturnValues0HistoryConfig,
		useCTAReturnValues1DispatchConfig,
	],
	title: 'return values',
};
export const useCTAParameterActionsConfig: NavItem = {
	desc: <>
		Parameter:
		{' '}
		<Code>actions</Code>
	</>,
	href: 'use-cta-parameter-actions',
	subNav: [
		useCTAParameterActionsOverridableConfig,
		useCTAParameterActionsCustomConfig,
	],
	title: 'Parameter: actions',
};
export const useCTAConfig: NavItem = {
	href: 'use-cta',
	subNav: [
		useCTABasicExampleConfig,
		useCTAParameterInitialConfig,
		useCTAParameterOnInitConfig,
		useCTAParameterCompareConfig,
		useCTAParameterTransformConfig,
		useCTAParameterAfterActionChangeConfig,
		useCTAParameterActionsConfig,
		useCTAReturnValuesConfig,
	],
	title: 'useCTA',
	desc: <Code>useCTA</Code>,
};
