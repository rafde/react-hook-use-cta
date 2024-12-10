/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
};

if ( process.env.NODE_ENV === 'production' ) {
	nextConfig.output = 'export';
}

module.exports = nextConfig;
