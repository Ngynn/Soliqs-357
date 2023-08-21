import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
    constructor() { }

    async verifyToken(idToken: string) {
        try {
            let verifiedToken = await admin.auth().verifyIdToken(idToken);
            return verifiedToken;
        } catch {
            return null;
        }
    }
}
