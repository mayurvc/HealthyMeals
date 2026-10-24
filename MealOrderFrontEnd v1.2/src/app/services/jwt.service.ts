import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    sub?: string;
    name?: string;
    role?: string;
    [key: string]: any; // Optional: If there are other dynamic properties
}


@Injectable({
    providedIn: 'root'
})
export class JwtService {
    
    constructor() {}

    userRole:any;

    // Method to decode JWT
    decodeToken(token: string): DecodedToken | null {
        try {
            console.log(jwtDecode<DecodedToken>(token));
            return jwtDecode<DecodedToken>(token);
        } catch (Error) {
            console.error('Invalid token', Error);
            return null;
        }
    }

    getToken(){
        return localStorage.getItem('token') || '';
    }

    // Method to get name and role
    getUserInfo(token: string): { name: string | null; role: string | null; sub: string | null } {
        const decoded = this.decodeToken(token);
        console.log(decoded);
        this.userRole = decoded?.role || null
        return {
            name: decoded?.name || null,
            role: this.userRole,
            sub: decoded?.sub || null 
        };
    }

    isAdmin(): boolean {
        this.userRole = this.getUserInfo(localStorage.getItem('token') || '');
        console.log(this.userRole);
        return this.userRole.role === 'admin';
      }
    isProvider(): boolean {
        this.userRole = this.getUserInfo(localStorage.getItem('token') || '');
        console.log(this.userRole);
        return this.userRole.role === 'provider';
      }
      isUser(): boolean {
        this.userRole = this.getUserInfo(localStorage.getItem('token') || '');
        console.log(this.userRole);
        return this.userRole.role === 'user';
      }
    getProviderNameFromToken():string{
        this.userRole = this.getUserInfo(localStorage.getItem('token') || '');
        console.log(this.userRole);
        return this.userRole.sub;
    }
    
}
