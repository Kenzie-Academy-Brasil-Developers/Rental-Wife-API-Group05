import request from "supertest";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import app from "../../../app";
import { mockedEmployerRegister, mockedLogin } from "../../mocks";

describe("/employers", () => {
  let conn: DataSource;
  const baseUrl = "/employers";

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

  it("GET /employers - Must be able to list all employer users.", async () => {
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
    expect(response.status).toBe(200);
  });

  it("GET /employers/:id - Must not be able to get a hired data without authentication.", async () => {
    const response = await request(app).get(`${baseUrl}/fakeId`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("GET /employers/:id - Must not be able to get a hired data with a invalid ID.", async () => {
    const response = await request(app).get(`${baseUrl}/fakeId`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  it("GET /employers/:id - Must be able to get a hired data.", async () => {
    const newEmployer = await request(app)
      .post("/register")
      .send(mockedEmployerRegister);

    const employerLogin = await request(app).post("/login").send(mockedLogin);

    const response = await request(app)
      .get(`${baseUrl}/${newEmployer.body.id}`)
      .set("Authorization", `Bearer ${employerLogin.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body.name).toEqual("email@email.com");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("avatar_img");
    expect(response.body).toHaveProperty("address");
    expect(response.status).toBe(200);
  });

  it("PATCH /employers/:id - Must not be able to update a employer data without authentication.", async () => {
    const response = await request(app).patch(`${baseUrl}/fakeId`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("PATCH /employers/:id - Must not be able to update a employer data with a invalid ID.", async () => {
    const response = await request(app).patch(`${baseUrl}/fakeId`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  it("PATCH /employers/:id - Must not be able to update a employer data different from your own.", async () => {
    const newEmployer_1 = await request(app)
      .post("/register")
      .send(mockedEmployerRegister);

    const newEmployer_2 = await request(app)
      .post("/register")
      .send(mockedEmployerRegister);

    const employerLogin = await request(app).post("/login").send(mockedLogin);

    const response = await request(app)
      .patch(`${baseUrl}/${newEmployer_2.body.id}`)
      .set("Authorization", `Bearer ${employerLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("PATCH /employers/:id - Must be able to update a employer data.", async () => {
    const newEmployer = await request(app)
      .post("/register")
      .send(mockedEmployerRegister);

    const employerLogin = await request(app).post("/login").send(mockedLogin);

    const response = await request(app)
      .patch(`${baseUrl}/${newEmployer.body.id}`)
      .set("Authorization", `Bearer ${employerLogin.body.token}`);

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

  it("DELETE /employers/:id - Must not be able to delete a employer data without authentication.", async () => {
    const response = await request(app).delete(`${baseUrl}/fakeId`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("DELETE /employers/:id - Must not be able to delete a employer data with a invalid ID.", async () => {
    const response = await request(app).delete(`${baseUrl}/fakeId`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  it("DELETE /employers/:id - Must not be able to delete a employer data different from your own.", async () => {
    const newEmployer_1 = await request(app)
      .post("/register")
      .send(mockedEmployerRegister);

    const newEmployer_2 = await request(app)
      .post("/register")
      .send(mockedEmployerRegister);

    const employerLogin = await request(app).post("/login").send(mockedLogin);

    const response = await request(app)
      .delete(`${baseUrl}/${newEmployer_2.body.id}`)
      .set("Authorization", `Bearer ${employerLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("DELETE /employers/:id - Must be able to delete a employer data.", async () => {
    const newEmployer = await request(app)
      .post("/register")
      .send(mockedEmployerRegister);

    const employerLogin = await request(app).post("/login").send(mockedLogin);

    const response = await request(app)
      .delete(`${baseUrl}/${newEmployer.body.id}`)
      .set("Authorization", `Bearer ${employerLogin.body.token}`);

    expect(response.status).toBe(204);
  });

  it("GET /employers/address - Must not be able to get a employer address without authentication.", async () => {
    const response = await request(app).get(`${baseUrl}/address`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("GET /employers/address - Must be able to get a employer address.", async () => {
    const newEmployer = await request(app)
      .post("/register")
      .send(mockedEmployerRegister);

    const employerLogin = await request(app).post("/login").send(mockedLogin);

    const response = await request(app)
      .get(`${baseUrl}/address`)
      .set("Authorization", `Bearer ${employerLogin.body.token}`);

    expect(response.status).toBe(200);
  });

  it("PATCH /employer/address - Must not be able to update a employer address without authentication.", async () => {
    const response = await request(app).patch(`${baseUrl}/address`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("PATCH /employer/address - Must be able to update a employer address.", async () => {
    const newHired = await request(app)
      .post("/register")
      .send(mockedEmployerRegister);

    const hiredLogin = await request(app).post("/login").send(mockedLogin);

    const response = await request(app)
      .patch(`${baseUrl}/address`)
      .set("Authorization", `Bearer ${hiredLogin.body.token}`);

    expect(response.status).toBe(200);
  });
});
