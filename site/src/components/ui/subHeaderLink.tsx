import HeaderLink, { HeaderLinkProps, } from './headerLink';

type SubHeaderLinkProps = Pick<
	HeaderLinkProps,
	'desc' | 'href' | 'title'
>;

export default function SubHeaderLink( props: SubHeaderLinkProps, ) {
	return <HeaderLink {...{
		...props,
		wrapperClassName: '',
		headerClassName: 'text-xl',
		Header: 'h3',
	}} />;
}
