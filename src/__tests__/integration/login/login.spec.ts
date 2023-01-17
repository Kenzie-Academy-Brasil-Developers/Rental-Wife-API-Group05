import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import app from "../../../app";
import request from "supertest";
import {
  mockedEmployerRegister,
  mockedLogin,
  mockedWrongLogin,
  mockedUserNotExistsLogin,
} from "../../mocks";

describe("/login", () => {
  let conn: DataSource;
  const baseUrl = "/login";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (conn = res))
      .catch((err) => {
        console.error("Error during Data Source initialization.", err);
      });
    await request(app).post(baseUrl).send(mockedEmployerRegister);
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("POST /login - ABLE to login with user email and password.", async () => {
    const response = await request(app).post(baseUrl).send(mockedLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  it("POST /login - NOT able to login with user incorrect password or email.", async () => {
    const response = await request(app).post(baseUrl).send(mockedWrongLogin);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  it("POST /login - NOT able to login with non existed.", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(mockedUserNotExistsLogin);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
});
