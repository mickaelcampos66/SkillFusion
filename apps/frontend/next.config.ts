import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	eslint: {
		dirs: ["<rootDir>"],
	},
};

export default nextConfig;
