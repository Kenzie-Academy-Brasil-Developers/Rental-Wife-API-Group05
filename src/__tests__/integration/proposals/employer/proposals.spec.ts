import { mockedAdminRegister, mockedUpdateAddress } from './../../../mocks/integration/user.mock';
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import request from "supertest";
import app from "../../../../app";
import { mockedProposalAccept, mockedProposalReject, mockedProposalSend } from "../../../mocks/integration/proposals.mock";
import { mockedEmployerRegister, mockedHiredRegister } from "../../../mocks/integration/register.mock";
import { mockedLoginAdmin, mockedLoginEmployer, mockedLoginHired } from "../../../mocks/integration/login.mock";

describe("/proposals", () => {
    let conn: DataSource;
    const baseUrl = "/proposals";

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (conn = res))
            .catch((err) => {
                console.error("Error during Data Source initialization.", err);
            });
        await request(app).post("/register").send(mockedHiredRegister);
        await request(app).post("/register").send(mockedEmployerRegister);
        await request(app).post("/admin").send(mockedAdminRegister);
    });

    afterAll(async () => {
        await conn.destroy();
    });

    it("POST /proposals/hired/:id - ABLE to create proposal to a hired user.", async () => {
        const hiredLogin = await request(app).post("/login").send(mockedLoginHired);
        const hiredAddress = await request(app).patch("/users/hired/address").send(mockedUpdateAddress).set("Authorization", `Bearer ${hiredLogin.body.token}`);
        const hired = await request(app).get("/users/hired/");

        const employerLogin = await request(app).post("/login").send(mockedLoginEmployer);
        const employerAddress = await request(app).patch("/users/employer/address").send(mockedUpdateAddress).set("Authorization", `Bearer ${employerLogin.body.token}`);
        const employer = await request(app).get("/users/employers").set("Authorization", `Bearer ${employerLogin.body.token}`);

        const response = await request(app).post(`${baseUrl}/hired/${hired.body[0].id}`).send(mockedProposalSend).set("Authorization", `Bearer ${employerLogin.body.token}`);

        expect(response.body).toHaveProperty("rating");
        expect(response.body).toHaveProperty("hired");
        expect(response.status).toBe(201);
    });

    it("PATCH /proposals/:id/hired - ABLE to change a proposal status.", async () => {
        const hiredLogin = await request(app).post("/login").send(mockedLoginHired);
        const proposal = await request(app).get(`${baseUrl}/hired`).set("Authorization", `Bearer ${hiredLogin.body.token}`);

        const response = await request(app).patch(`${baseUrl}/${proposal.body[0].id}/hired`).send(mockedProposalAccept).set("Authorization", `Bearer ${hiredLogin.body.token}`);

        expect(response.body).toHaveProperty("rating");
        expect(response.body).toHaveProperty("hired");
        expect(response.status).toBe(200);
    });

    it("GET /proposals/hired/:id - ABLE to list all proposals from a hired user.", async () => {
        const employerLogin = await request(app).post("/login").send(mockedLoginEmployer);

        const hiredLogin = await request(app).post("/login").send(mockedLoginHired);
        const hired = await request(app).get("/users/hired/");

        const response = await request(app).get(`${baseUrl}/hired/${hired.body[0].id}`).set("Authorization", `Bearer ${employerLogin.body.token}`);

        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);
    });

    it("GET /proposals/hired/ - ABLE to list all proprosals of a hired logged user.", async () => {
        const hiredLogin = await request(app).post("/login").send(mockedLoginHired);

        const response = await request(app).get(`${baseUrl}/hired`).set("Authorization", `Bearer ${hiredLogin.body.token}`);

        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);
    });

    it("GET /proposals/employer/ - ABLE to list all proprosals of a employer logged user.", async () => {
        const employerLogin = await request(app).post("/login").send(mockedLoginEmployer);

        const response = await request(app).get(`${baseUrl}/employers`).set("Authorization", `Bearer ${employerLogin.body.token}`);

        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);
    });

    it("GET /proposals/:id -  ABLE to list a proposal by ID.", async () => {
        const employerLogin = await request(app).post("/login").send(mockedLoginEmployer);
        const proposal = await request(app).get(`${baseUrl}/employers`).set("Authorization", `Bearer ${employerLogin.body.token}`);

        const response = await request(app).get(`${baseUrl}/${proposal.body[0].id}`).set("Authorization", `Bearer ${employerLogin.body.token}`);

        expect(response.status).toBe(200);
    });

    // it("DELETE /proposals/:id -  ABLE to delete a proposal by ID.", async () => {
    //     const hiredLogin = await request(app).post("/login").send(mockedLoginHired);
    //     const employerLogin = await request(app).post("/login").send(mockedLoginEmployer);

    //     const proposal = await request(app).get(`${baseUrl}/hired`).set("Authorization", `Bearer ${hiredLogin.body.token}`);

    //     const response = await request(app).delete(`${baseUrl}/${proposal.body[0].id}`).set("Authorization", `Bearer ${employerLogin.body.token}`);

    //     expect(response.status).toBe(204);
    // });

    // // ----------------------------------------------------------------------------------------------------------------------

    // it("GET /:id - ABLE to list a proposal by ID.", async () => {
    //     await request(app).post("/register").send(mockedEmployerRegister);
    //     await request(app).post("/login").send(mockedLoginEmployer)
    //     const newHired = await request(app).post("/register").send(mockedHiredRegister);
    //     const foo = await request(app).post(`/proposals/hired/${newHired.body.id}`).send(mockedProposalSend);

    //     const response = await request(app).post(`${baseUrl}/fake_id`);

    //     console.log(response.body);


    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(401);
    // });
    // ----------------------------------------------------------------------------------------------------------------------

    // it("GET /hired - ABLE to create proposal without authentication.", async () => {
    //     const response = await request(app).post(`${baseUrl}/hired/fake_id`).send(mockedProposalSend);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(401);
    // });

    // // ----------------------------------------------------------------------------------------------------------------------
    // it("POST /hired/:id - NOT able to create proposal without authentication.", async () => {
    //     const response = await request(app).post(`${baseUrl}/hired/fake_id`).send(mockedProposalSend);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(401);
    // });

    //   it("POST /hired/:id - Must not be able to create proposal if hired id does not exists.", async () => {
    //     const newEmployer = await request(app)
    //       .post("/register")
    //       .send(mockedEmployerRegister);

    //     const employerLogin = await request(app).post("/login").send(mockedLogin);

    //     const response = await request(app)
    //       .post(`${baseUrl}/hired/fakeId`)
    //       .send(mockedProposal)
    //       .set("Authorization", `Bearer ${employerLogin.body.token}`);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(404);
    //   });

    //   it("POST /hired/:id - Must not be able to create proposal without being a employer.", async () => {
    //     const newHired_1 = await request(app)
    //       .post("/register")
    //       .send(mockedHiredRegister);

    //     const employerLogin = await request(app).post("/login").send(mockedLogin);

    //     const newHired_2 = await request(app)
    //       .post("/register")
    //       .send(mockedHired2Register);

    //     const response = await request(app)
    //       .post(`/employer/proposal/${newHired_2.body.id}`)
    //       .send(mockedProposal)
    //       .set("Authorization", `Bearer ${employerLogin.body.token}`);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(406);
    //   });

    //   it("POST /hired/:id - Must be able to create a proposal.", async () => {
    //     const newHired = await request(app)
    //       .post("/register")
    //       .send(mockedHiredRegister);

    //     const newEmployer = await request(app)
    //       .post("/register")
    //       .send(mockedEmployerRegister);

    //     const employerLogin = await request(app).post("/login").send(mockedLogin);

    //     const response = await request(app)
    //       .post(`employer/${baseUrl}/${newHired.body.id}`)
    //       .send(mockedProposal)
    //       .set("Authorization", `Bearer ${employerLogin.body.token}`);

    //     expect(response.body).toHaveProperty("title");
    //     expect(response.body).toHaveProperty("description");
    //     expect(response.body).toHaveProperty("status");
    //     expect(response.body).toHaveProperty("employer");
    //     expect(response.body).toHaveProperty("hired");
    //     expect(response.status).toBe(201);
    //   });

    //   it("GET /hired/:id - Must not be able to list proposal without authentication.", async () => {
    //     const response = await request(app).get(`${baseUrl}/fakeId`);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(401);
    //   });

    //   // !PAREI AQUI
    //   it("GET /hired/:id - Must not be able to proposal ID do not exists.", async () => {
    //     await request(app).post("/register").send(mockedEmployerRegister);

    //     const userEmployer = await request(app).post("/login").send(mockedLogin);

    //     const response = await request(app)
    //       .get(`${baseUrl}/fakeId`)
    //       .set("Authorization", `Bearer ${userEmployer.body.token}`);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(404);
    //   });

    //   it("GET /hired/:id - Must be able to list propose ", async () => {
    //     const userHired = await request(app)
    //       .post("/register")
    //       .send(mockedHiredRegister);
    //     await request(app).post("/register").send(mockedEmployerRegister);
    //     const loginEmployer = await request(app).post("/login").send(mockedLogin);
    //     const propose = await request(app)
    //       .post(`employer/${baseUrl}/${userHired.body.id}`)
    //       .send(mockedProposal)
    //       .set("Authorization", `Bearer ${loginEmployer.body.token}`);
    //     const response = await request(app)
    //       .get(`employer/${baseUrl}/${propose.body.id}`)
    //       .set("Authorization", `Bearer ${loginEmployer.body.token}`);

    //     expect(response.body).toHaveProperty("title");
    //     expect(response.body).toHaveProperty("description");
    //     expect(response.body).toHaveProperty("status");
    //     expect(response.body).toHaveProperty("employer");
    //     expect(response.body).toHaveProperty("hired");
    //     expect(response.status).toBe(200);
    //   });

    //   it("PATCH /hired/:id -  Must not be able to edit proposal without authentication.", async () => {
    //     const response = await request(app)
    //       .patch(`employer/${baseUrl}/dsd65f1ds6f2d1f`)
    //       .send(mockedEditProposal);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(401);
    //   });

    //   it("PATCH /hired/:id -  Proposal id does not exist.", async () => {
    //     await request(app).post("/register").send(mockedEmployerRegister);
    //     const userEmployer = await request(app).post("/login").send(mockedLogin);
    //     const response = await request(app)
    //       .patch(`employer/${baseUrl}/5041asdasd`)
    //       .send(mockedProposal)
    //       .set("Authorization", `Bearer ${userEmployer.body.token}`);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(404);
    //   });

    //   it("PATCH /hired/:id -  You are not the owner of the proposal.", async () => {
    //     const userHired = await request(app)
    //       .post("/register")
    //       .send(mockedHiredRegister);
    //     await request(app).post("/register").send(mockedEmployerRegister);
    //     const loginEmployer = await request(app).post("/login").send(mockedLogin);
    //     await request(app).post("/register").send(mockedEmployer2Register);
    //     const loginEmployer2 = await request(app)
    //       .post("/login")
    //       .send(mockedLoginEmployer2);
    //     const propose = await request(app)
    //       .post(`employer/${baseUrl}/${userHired.body.id}`)
    //       .send(mockedProposal)
    //       .set("Authorization", `Bearer ${loginEmployer.body.token}`);
    //     const response = await request(app)
    //       .patch(`employer/${baseUrl}/${propose.body.id}`)
    //       .send(mockedEditProposal)
    //       .set("Authorization", `Bearer ${loginEmployer2.body.token}`);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.body).toBe(401);
    //   });

    //   it("PATCH /hired/:id -  Successfully edited.", async () => {
    //     const userHired = await request(app)
    //       .post("/register")
    //       .send(mockedHiredRegister);
    //     await request(app).post("/register").send(mockedEmployerRegister);
    //     const loginEmployer = await request(app).post("/login").send(mockedLogin);
    //     const propose = await request(app)
    //       .post(`employer/${baseUrl}/${userHired.body.id}`)
    //       .send(mockedProposal)
    //       .set("Authorization", `Bearer ${loginEmployer.body.token}`);
    //     const response = await request(app)
    //       .patch(`employer/${baseUrl}/${propose.body.id}`)
    //       .send(mockedEditProposal)
    //       .set("Authorization", `Bearer ${loginEmployer.body.token}`);

    //     expect(response.body).toHaveProperty("title");
    //     expect(response.body).toHaveProperty("description");
    //     expect(response.body).toHaveProperty("status");
    //     expect(response.body).toHaveProperty("employer");
    //     expect(response.body).toHaveProperty("hired");
    //     expect(response.body).toBe(200);
    //   });

    //   it("DELETE /hired/:id -  Must not be able to edit proposal without authentication.", async () => {
    //     const response = await request(app).delete(
    //       `employer/${baseUrl}/150515874651`
    //     );

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(401);
    //   });

    //   it("DELETE /hired/:id -  You are not the owner of the proposal.", async () => {
    //     const userHired = await request(app)
    //       .post("/register")
    //       .send(mockedHiredRegister);
    //     await request(app).post("/register").send(mockedEmployerRegister);
    //     const loginEmployer = await request(app).post("/login").send(mockedLogin);
    //     await request(app).post("/register").send(mockedEmployer2Register);
    //     const loginEmployer2 = await request(app)
    //       .post("/login")
    //       .send(mockedLoginEmployer2);
    //     const propose = await request(app)
    //       .post(`employer/${baseUrl}/${userHired.body.id}`)
    //       .send(mockedProposal)
    //       .set("Authorization", `Bearer ${loginEmployer.body.token}`);
    //     const response = await request(app)
    //       .delete(`employer/${baseUrl}/${propose.body.id}`)
    //       .set("Authorization", `Bearer ${loginEmployer2.body.token}`);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.body).toBe(401);
    //   });

    //   it("DELETE /hired/:id -  Proposal id does not exist.", async () => {
    //     const loginEmployer = await request(app).post("/login").send(mockedLogin);
    //     await request(app).post("/register").send(mockedEmployer2Register);
    //     const response = await request(app)
    //       .delete(`employer/${baseUrl}/16916151dfsfd51df`)
    //       .set("Authorization", `Bearer ${loginEmployer.body.token}`);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(404);
    //   });

    //   it("DELETE /hired/:id -  Successfully deleted.", async () => {
    //     const userHired = await request(app)
    //       .post("/register")
    //       .send(mockedHiredRegister);
    //     await request(app).post("/register").send(mockedEmployerRegister);
    //     const loginEmployer = await request(app).post("/login").send(mockedLogin);
    //     await request(app).post("/register").send(mockedEmployer2Register);
    //     const propose = await request(app)
    //       .post(`employer/${baseUrl}/${userHired.body.id}`)
    //       .send(mockedProposal)
    //       .set("Authorization", `Bearer ${loginEmployer.body.token}`);
    //     const response = await request(app)
    //       .delete(`employer/${baseUrl}/${propose.body.id}`)
    //       .set("Authorization", `Bearer ${loginEmployer.body.token}`);

    //     expect(response.status).toBe(204);
    //   });

    //   it("GET /hired/proposal/:id - Must not be able to list propose without authentication.", async () => {
    //     const response = await request(app).get(`hired/${baseUrl}/56165161dsf`);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(401);
    //   });

    //   it("GET /hired/proposal/:id - Must not be able to proposal id not exists", async () => {
    //     await request(app).post("/register").send(mockedHiredRegister);
    //     const loginHired = await request(app)
    //       .post("/login")
    //       .send(mockedUserLoginHired);
    //     const response = await request(app)
    //       .get(`hired/${baseUrl}/54S165a1s651df6`)
    //       .set("Authorization", `Bearer ${loginHired.body.token}`);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(404);
    //   });

    //   it("GET /hired/proposal/:id - Must be able to list propose ", async () => {
    //     const userHired = await request(app)
    //       .post("/register")
    //       .send(mockedHiredRegister);
    //     await request(app).post("/register").send(mockedEmployerRegister);
    //     const loginEmployer = await request(app).post("/login").send(mockedLogin);
    //     const loginHired = await request(app)
    //       .post("/login")
    //       .send(mockedUserLoginHired);
    //     const propose = await request(app)
    //       .post(`employer/${baseUrl}/${userHired.body.id}`)
    //       .send(mockedProposal)
    //       .set("Authorization", `Bearer ${loginEmployer.body.token}`);
    //     const response = await request(app)
    //       .get(`hired/${baseUrl}/${propose.body.id}`)
    //       .set("Authorization", `Bearer ${loginHired.body.token}`);

    //     expect(response.body).toHaveProperty("title");
    //     expect(response.body).toHaveProperty("description");
    //     expect(response.body).toHaveProperty("status");
    //     expect(response.body).toHaveProperty("employer");
    //     expect(response.body).toHaveProperty("hired");
    //     expect(response.status).toBe(200);
    //   });

    //   it("PATCH /hired/proposal/:id -  Must not be able to edit propose without authentication.", async () => {
    //     const response = await request(app)
    //       .patch(`hired/${baseUrl}/dsd65f1ds6f2d1f`)
    //       .send(mockedEditProposal);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(401);
    //   });

    //   it("PATCH /hired/proposal/:id -  Proposal id does not exist.", async () => {
    //     await request(app).post("/register").send(mockedHiredRegister);
    //     const userHired = await request(app)
    //       .post("/login")
    //       .send(mockedUserLoginHired);
    //     const response = await request(app)
    //       .patch(`hired/${baseUrl}/5041asdasd`)
    //       .send(mockedEditProposal)
    //       .set("Authorization", `Bearer ${userHired.body.token}`);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(404);
    //   });

    //   it("PATCH /hired/proposal/:id -  You are not the owner of the proposal.", async () => {
    //     const userHired = await request(app)
    //       .post("/register")
    //       .send(mockedHiredRegister);
    //     await request(app).post("/register").send(mockedEmployerRegister);
    //     const loginEmployer = await request(app).post("/login").send(mockedLogin);
    //     await request(app).post("/register").send(mockedHired2Register);
    //     const hiredlogin2 = await request(app)
    //       .post("/login")
    //       .send(mockedLoginHired2);
    //     const propose = await request(app)
    //       .post(`employer/${baseUrl}/${userHired.body.id}`)
    //       .send(mockedProposal)
    //       .set("Authorization", `Bearer ${loginEmployer.body.token}`);
    //     const response = await request(app)
    //       .patch(`hired/${baseUrl}/${propose.body.id}`)
    //       .send(mockedEditProposal)
    //       .set("Authorization", `Bearer ${hiredlogin2.body.token}`);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.body).toBe(401);
    //   });

    //   it("PATCH /hired/proposal/:id -  Must be able to edit a proposal.", async () => {
    //     const userHired = await request(app)
    //       .post("/register")
    //       .send(mockedHiredRegister);
    //     const hiredSession = await request(app)
    //       .post("/register")
    //       .send(mockedEmployerRegister);
    //     const loginEmployer = await request(app).post("/login").send(mockedLogin);
    //     const propose = await request(app)
    //       .post(`employer/${baseUrl}/${userHired.body.id}`)
    //       .send(mockedProposal)
    //       .set("Authorization", `Bearer ${loginEmployer.body.token}`);
    //     const response = await request(app)
    //       .patch(`hired/${baseUrl}/${propose.body.id}`)
    //       .send(mockedEditProposal)
    //       .set("Authorization", `Bearer ${hiredSession.body.token}`);

    //     expect(response.body).toHaveProperty("title");
    //     expect(response.body).toHaveProperty("description");
    //     expect(response.body).toHaveProperty("status");
    //     expect(response.body).toHaveProperty("employer");
    //     expect(response.body).toHaveProperty("hired");
    //     expect(response.body).toBe(200);
    //   });

    //   it("DELETE /hired/proposal/:id -  Must not be able to delete proposal without authentication.", async () => {
    //     const response = await request(app).delete(`hired/${baseUrl}/150515874651`);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(401);
    //   });

    //   it("DELETE /hired/proposal/:id -  Must not be able to delete proposal if it not owner.", async () => {
    //     const userHired = await request(app)
    //       .post("/register")
    //       .send(mockedHiredRegister);
    //     await request(app).post("/register").send(mockedEmployerRegister);
    //     const loginEmployer = await request(app).post("/login").send(mockedLogin);
    //     await request(app).post("/register").send(mockedHired2Register);
    //     const hiredSession2 = await request(app)
    //       .post("/login")
    //       .send(mockedLoginHired2);
    //     const propose = await request(app)
    //       .post(`employer/${baseUrl}/${userHired.body.id}`)
    //       .send(mockedProposal)
    //       .set("Authorization", `Bearer ${loginEmployer.body.token}`);
    //     const response = await request(app)
    //       .delete(`hired/${baseUrl}/${propose.body.id}`)
    //       .set("Authorization", `Bearer ${hiredSession2.body.token}`);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.body).toBe(401);
    //   });

    //   it("DELETE /hired/proposal/:id -  Must not be able to delete proposal if id does not exists.", async () => {
    //     await request(app).post("/register").send(mockedHiredRegister);
    //     const loginHired = await request(app)
    //       .post("/login")
    //       .send(mockedUserLoginHired);
    //     const response = await request(app)
    //       .delete(`hired/${baseUrl}/16916151dfsfd51df`)
    //       .set("Authorization", `Bearer ${loginHired.body.token}`);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(404);
    //   });

    //   it("DELETE /hired/proposal/:id -  Must be able to delete propose .", async () => {
    //     const userHired = await request(app)
    //       .post("/register")
    //       .send(mockedHiredRegister);
    //     const userHiredSession = await request(app)
    //       .post("/login")
    //       .send(mockedUserLoginHired);
    //     await request(app).post("/register").send(mockedEmployerRegister);
    //     const loginEmployer = await request(app).post("/login").send(mockedLogin);
    //     const propose = await request(app)
    //       .post(`employer/${baseUrl}/${userHired.body.id}`)
    //       .send(mockedProposal)
    //       .set("Authorization", `Bearer ${loginEmployer.body.token}`);
    //     const response = await request(app)
    //       .delete(`hired/${baseUrl}/${propose.body.id}`)
    //       .set("Authorization", `Bearer ${userHiredSession.body.token}`);

    //     expect(response.status).toBe(204);
    //   });
});
