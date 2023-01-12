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

  it("Should be able to login with the user", async () => {
    const response = await request(app).post(baseUrl).send(mockedLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  it("Should not be able to login with the user with incorrect password or email", async () => {
    const response = await request(app).post(baseUrl).send(mockedWrongLogin);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  it("Should not find user", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(mockedUserNotExistsLogin);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
});
