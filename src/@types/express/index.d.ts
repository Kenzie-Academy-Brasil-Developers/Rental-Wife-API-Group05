import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        name: string;
        email: string;
        password: string;
        isHired: boolean;
        avatar: string;
        gender: string;
      };
      address: {
        street: string;
        number: string;
        district: string;
        city: string;
        state: string;
        zipCode: string;
        state: string;
      };
      proposal: {
        title: string;
        description: string;
        status: string;
      };
      rating: {
        rate: number;
        comment: string;
      };
      services: {
        name: string;
      };
    }
  }
}
