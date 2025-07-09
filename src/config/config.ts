import { readFileSync } from "fs";
import * as yaml from 'js-yaml';
import * as path from 'path';

const YAML_CONFIG_PROD = 'production.yaml';
const YAML_CONFIG_DEV = 'development.yaml';

export default () => {
  try {
    // 다양한 경로 시도
    const possiblePaths = [
      path.join(__dirname, YAML_CONFIG_PROD),
      path.join(process.cwd(), 'dist/config', YAML_CONFIG_PROD),
      path.join(process.cwd(), 'src/config', YAML_CONFIG_PROD)
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
    
    throw new Error('Config file not found in any location');
  } catch (e) {
    console.error('Config error:', e);
    // 기본 설정 반환
    return {
      server: { port: 3000 }
    };
  }
}