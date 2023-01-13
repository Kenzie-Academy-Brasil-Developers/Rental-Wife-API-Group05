import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        name?: string;
        email?: string;
        password?: string;
        isHired?: boolean;
        avatar_img?: string;
        gender?: string;
      };
      address: {
        id: string;
        street: string;
        number: string;
        district: string;
        city: string;
        state: string;
        zipCode: string;
        state: string;
      };
      proposal: {
        id: string;
        title: string;
        description: string;
        status: string;
      };
      rating: {
        id: string;
        rate: number;
        comment: string;
      };
      services: {
        id: string;
        name: string;
      };
    }
  }
}
