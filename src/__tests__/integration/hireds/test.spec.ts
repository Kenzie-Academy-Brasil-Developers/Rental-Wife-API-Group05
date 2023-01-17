import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedEmployerRegister,
  mockedHiredRegister,
} from "../../mocks/integration/register.mock";

describe("/hireds", () => {
  let conn: DataSource;
  const baseUrl = "/users/hired";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (conn = res))
      .catch((err) => {
        console.error("Error during Data Source initialization.", err);
      });
    await request(app).post("/register").send(mockedHiredRegister);
    await request(app).post("/register").send(mockedEmployerRegister);
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("GET /hireds - Must be able to list all hired users.", async () => {
    const response = await request(app).get(baseUrl);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });
});
