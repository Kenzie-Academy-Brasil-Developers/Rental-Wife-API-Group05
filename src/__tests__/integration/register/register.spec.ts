import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import app from "../../../app";
import request from "supertest";
import { mockedAlreadyRegister, mockedEmployerRegister } from "../../mocks";

describe("POST - /register", () => {
  let conn: DataSource;
  const baseUrl = "/register";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (conn = res))
      .catch((err) => {
        console.error("Error during Data Source initialization.", err);
      });
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("Should create an User", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(mockedEmployerRegister);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("avatar_url");
    expect(response.body).toHaveProperty("is_hired");
    expect(response.body).not.toHaveProperty("password");
    expect(response.status).toBe(201);
  });

  it("Should not be able to create a user that already exists", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send(mockedAlreadyRegister);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });
});
