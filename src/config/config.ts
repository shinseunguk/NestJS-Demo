import { readFileSync } from "fs";
import * as yaml from 'js-yaml';
import * as path from 'path';

const YAML_CONFIG_PROD = 'production.yaml';
const YAML_CONFIG_DEV = 'development.yaml';

export default () => {
  try {
    // NODE_ENV에 따라 설정 파일 결정
    const nodeEnv = process.env.NODE_ENV || 'development';
    const configFile = nodeEnv === 'production' ? YAML_CONFIG_PROD : YAML_CONFIG_DEV;
    
    console.log(`Using ${nodeEnv} environment, config file: ${configFile}`);
    
    // 다양한 경로 시도
    const possiblePaths = [
      path.join(__dirname, configFile),
      path.join(process.cwd(), 'dist/config', configFile),
      path.join(process.cwd(), 'src/config', configFile)
    ];
    
    console.log('Trying paths:', possiblePaths);
    
    // 가능한 경로에서 파일 찾기
    for (const filePath of possiblePaths) {
      try {
        console.log('Attempting to read:', filePath);
        const fileContent = readFileSync(filePath, 'utf8');
        return yaml.load(fileContent) as Record<string, any>;
      } catch (err) {
        console.log(`Failed to read from ${filePath}`);
      }
    }
    
    throw new Error(`Config file ${configFile} not found in any location`);
  } catch (e) {
    console.error('Config error:', e);
    // 기본 설정 반환 (환경에 따라 다르게 설정)
    const nodeEnv = process.env.NODE_ENV || 'development';
    return {
      server: { port: nodeEnv === 'production' ? 3001 : 3000 }
    };
  }
}