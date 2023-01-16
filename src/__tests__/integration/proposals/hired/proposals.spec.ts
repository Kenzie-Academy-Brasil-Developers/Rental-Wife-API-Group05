import { DataSource } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import request from "supertest";
import app from "../../../../app";
import {
  mockedEditProposal,
  mockedEmployer2Register,
  mockedEmployerRegister,
  mockedHired2Register,
  mockedHiredRegister,
  mockedLogin,
  mockedLoginEmployer2,
  mockedLoginHired2,
  mockedProposal,
  mockedUserLoginHired,
} from "../../../mocks";
jest.mock("uuid");

describe("/proposals", () => {
  let conn: DataSource;
  const baseUrl = "/proposals";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (conn = res))
      .catch((err) => {
        console.error("Error during Data Source initialization.", err);
      });
    await request(app).post("/register").send(mockedEmployerRegister);
    await request(app).post("/register").send(mockedHiredRegister);
  });

  afterAll(async () => {
    await conn.destroy();
  });

  // /users/employer/id

  it("POST /hired/:id - Must not be able to create proposal without authentication.", async () => {
    const response = await request(app)
      .post(`${baseUrl}/hired/fakeId`)
      .send(mockedProposal);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("POST /hired/:id - Must not be able to create proposal if hired id does not exists.", async () => {
    const newEmployer = await request(app)
      .post("/register")
      .send(mockedEmployerRegister);

    const employerLogin = await request(app).post("/login").send(mockedLogin);

    const response = await request(app)
      .post(`${baseUrl}/hired/fakeId`)
      .send(mockedProposal)
      .set("Authorization", `Bearer ${employerLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  it("POST /hired/:id - Must not be able to create proposal without being a employer.", async () => {
    const newHired_1 = await request(app)
      .post("/register")
      .send(mockedHiredRegister);

    const employerLogin = await request(app).post("/login").send(mockedLogin);

    const newHired_2 = await request(app)
      .post("/register")
      .send(mockedHired2Register);

    const response = await request(app)
      .post(`/employer/proposal/${newHired_2.body.id}`)
      .send(mockedProposal)
      .set("Authorization", `Bearer ${employerLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(406);
  });

  it("POST /hired/:id - Must be able to create a proposal.", async () => {
    const newHired = await request(app)
      .post("/register")
      .send(mockedHiredRegister);

    const newEmployer = await request(app)
      .post("/register")
      .send(mockedEmployerRegister);

    const employerLogin = await request(app).post("/login").send(mockedLogin);

    const response = await request(app)
      .post(`employer/${baseUrl}/${newHired.body.id}`)
      .send(mockedProposal)
      .set("Authorization", `Bearer ${employerLogin.body.token}`);

    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("employer");
    expect(response.body).toHaveProperty("hired");
    expect(response.status).toBe(201);
  });
});
