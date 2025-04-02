import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const getConfigFileName = (): string => {
	const environment = process.env.NODE_ENV || 'local';
	return `${environment}.config.yml`;
};

export default () => {
	const route = join(__dirname, '../../config', getConfigFileName())
	return yaml.load(
		readFileSync(route, 'utf8'),
	) as Record<string, any>;
};
