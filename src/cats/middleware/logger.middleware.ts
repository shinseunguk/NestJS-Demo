import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const now = new Date().toISOString();
        const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const method = req.method;
        const url = req.originalUrl || req.url;
        console.log(`[${now}] ${ip} ${method} ${url}`);
        // 응답이 끝난 후에도 로그를 남기고 싶다면 아래와 같이 작성할 수 있습니다.
        res.on('finish', () => {
            console.log(`[${now}] ${ip} ${method} ${url} - Response: ${res.statusCode}`);
        });
        next();
    }
}