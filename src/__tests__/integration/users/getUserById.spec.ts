import request from "supertest";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import app from "../../../app";
import { mockedEmployerRegister, mockedHiredRegister } from "../../mocks";

describe("/users", () => {
  let conn: DataSource;
  const baseUrl = "/users";

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

  it("Should not be able to get user data with another user ID.", async () => {
    const response = await request(app).get(`${baseUrl}/fakeId`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  it("Should not be able to get user data by id without authentication.", async () => {
    const response = await request(app).get(`${baseUrl}/fakeId`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  it("Should not be able to get user data by id with invalid id.", async () => {
    const response = await request(app).get(`${baseUrl}/fakeId`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("Should be able to get employer data by user id.", async () => {
    const newUser = await request(app)
      .post("/register")
      .send(mockedEmployerRegister);

    const userLogin = await request(app)
      .post("/login")
      .send({ email: "email@mail.com", password: "123456" });

    const response = await request(app)
      .get(`${baseUrl}/${newUser.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("avatar_img");
    expect(response.body).toHaveProperty("address");
    expect(response.body).not.toHaveProperty("services");
    expect(response.body).toHaveLength(1);
    expect(response.body.name).toEqual("name");
    expect(response.body.name).toEqual("email@email.com");
    expect(response.status).toBe(200);
  });

  it("Should be able to get hired data by user id.", async () => {
    const newUser = await request(app)
      .post("/register")
      .send(mockedHiredRegister);

    const userLogin = await request(app)
      .post("/login")
      .send({ email: "email@mail.com", password: "123456" });

    const response = await request(app)
      .get(`${baseUrl}/${newUser.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("avatar_img");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("services");
    expect(response.body).toHaveLength(1);
    expect(response.body.name).toEqual("name");
    expect(response.body.name).toEqual("email@email.com");
    expect(response.status).toBe(200);
  });
});
