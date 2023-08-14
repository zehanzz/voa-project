import express from "express";
import listRouter from "./routes/lists.js";
import authRouter from "./routes/auth.js";
import ticketsRouter from "./routes/tickets.js";
import visitorRouter from "./routes/visitor.js";
import orderRouter from "./routes/orders.js";
import showsRouter from "./routes/shows.js";
import attractionRouter from "./routes/attraction.js";
import parkingRouter from "./routes/parking.js";
import storeRouter from "./routes/store.js"
import summRouter from "./routes/summ.js";
import { dbUtil } from "./dbUtil.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { parking } from "./controllers/parking.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/lists", listRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/visitors", visitorRouter);
app.use("/api/orders", orderRouter);
app.use("/api/shows", showsRouter);
app.use("/api/attractions", attractionRouter);
app.use("/api/parking", parkingRouter);
app.use("/api/store", storeRouter);
app.use("/api/summ", summRouter);
// app.use("/api/attraction", attractionRouter)
// app.use("/api/attraction", attractionRouter)

app.use(cors({
    origin: '*'
}));

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})
