import { mockedUserLoginHired } from "./../../mocks/integration/login.mock";
import { mockedHiredRegister } from "./../../mocks/integration/register.mock";
import request from "supertest";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import app from "../../../app";

describe("/hireds", () => {
  let conn: DataSource;
  const baseUrl = "/hireds";

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

  it("GET /hireds - Must be able to list all hired users.", async () => {
    const response = await request(app).get(baseUrl);

    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body.name).toEqual("email@email.com");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("avatar_img");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("services");
    expect(response.status).toBe(200);
  });

  it("GET /hireds/:id - Must not be able to get a hired data without authentication.", async () => {
    const response = await request(app).get(`${baseUrl}/fakeId`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("GET /hireds/:id - Must not be able to get a hired data with a invalid ID.", async () => {
    const response = await request(app).get(`${baseUrl}/fakeId`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  it("GET /hireds/:id - Must be able to get a hired data.", async () => {
    const newHired = await request(app)
      .post("/register")
      .send(mockedHiredRegister);

    const hiredLogin = await request(app)
      .post("/login")
      .send(mockedUserLoginHired);

    const response = await request(app)
      .get(`${baseUrl}/${newHired.body.id}`)
      .set("Authorization", `Bearer ${hiredLogin.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body.name).toEqual("email@email.com");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("avatar_img");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("services");
    expect(response.status).toBe(200);
  });

  it("PATCH /hireds/:id - Must not be able to update a hired data without authentication.", async () => {
    const response = await request(app).patch(`${baseUrl}/fakeId`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("PATCH /hireds/:id - Must not be able to update a hired data with a invalid ID.", async () => {
    const response = await request(app).patch(`${baseUrl}/fakeId`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  it("PATCH /hireds/:id - Must not be able to update a hired data different from your own.", async () => {
    const newHired_1 = await request(app)
      .post("/register")
      .send(mockedHiredRegister);

    const newHired_2 = await request(app)
      .post("/register")
      .send(mockedHiredRegister);

    const hiredLogin = await request(app)
      .post("/login")
      .send(mockedUserLoginHired);

    const response = await request(app)
      .patch(`${baseUrl}/${newHired_2.body.id}`)
      .set("Authorization", `Bearer ${hiredLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("PATCH /hireds/:id - Must be able to update a hired data.", async () => {
    const newHired = await request(app)
      .post("/register")
      .send(mockedHiredRegister);

    const hiredLogin = await request(app)
      .post("/login")
      .send(mockedUserLoginHired);

    const response = await request(app)
      .patch(`${baseUrl}/${newHired.body.id}`)
      .set("Authorization", `Bearer ${hiredLogin.body.token}`);

    expect(response.body).toHaveProperty("gender");
    expect(response.body).toHaveProperty("avatar_img");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("id");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).not.toHaveProperty("address");
    expect(response.body).not.toHaveProperty("services");
    expect(response.status).toBe(200);
  });

  it("DELETE /hireds/:id - Must not be able to delete a hired data without authentication.", async () => {
    const response = await request(app).delete(`${baseUrl}/fakeId`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("DELETE /hireds/:id - Must not be able to delete a hired data with a invalid ID.", async () => {
    const response = await request(app).delete(`${baseUrl}/fakeId`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  it("DELETE /hireds/:id - Must not be able to delete a hired data different from your own.", async () => {
    const newHired_1 = await request(app)
      .post("/register")
      .send(mockedHiredRegister);

    const newHired_2 = await request(app)
      .post("/register")
      .send(mockedHiredRegister);

    const hiredLogin = await request(app)
      .post("/login")
      .send(mockedUserLoginHired);

    const response = await request(app)
      .delete(`${baseUrl}/${newHired_2.body.id}`)
      .set("Authorization", `Bearer ${hiredLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("DELETE /hireds/:id - Must be able to update a hired data.", async () => {
    const newHired = await request(app)
      .post("/register")
      .send(mockedHiredRegister);

    const hiredLogin = await request(app)
      .post("/login")
      .send(mockedUserLoginHired);

    const response = await request(app)
      .delete(`${baseUrl}/${newHired.body.id}`)
      .set("Authorization", `Bearer ${hiredLogin.body.token}`);

    expect(response.status).toBe(204);
  });

  it("GET /hireds/address - Must not be able to get a hired address without authentication.", async () => {
    const response = await request(app).get(`${baseUrl}/address`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("GET /hireds/address - Must be able to get a hired address.", async () => {
    const newHired = await request(app)
      .post("/register")
      .send(mockedHiredRegister);

    const hiredLogin = await request(app)
      .post("/login")
      .send(mockedUserLoginHired);

    const response = await request(app)
      .get(`${baseUrl}/address`)
      .set("Authorization", `Bearer ${hiredLogin.body.token}`);

    expect(response.status).toBe(200);
  });

  it("PATCH /hireds/address - Must not be able to update a hired address without authentication.", async () => {
    const response = await request(app).patch(`${baseUrl}/address`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("PATCH /hireds/address - Must be able to update a hired address.", async () => {
    const newHired = await request(app)
      .post("/register")
      .send(mockedHiredRegister);

    const hiredLogin = await request(app)
      .post("/login")
      .send(mockedUserLoginHired);

    const response = await request(app)
      .patch(`${baseUrl}/address`)
      .set("Authorization", `Bearer ${hiredLogin.body.token}`);

    expect(response.status).toBe(200);
  });
});
