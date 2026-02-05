import {z} from "zod";

const EnvSchema = z.object({

});


const raw = {

};

export const env = EnvSchema.parse(raw);