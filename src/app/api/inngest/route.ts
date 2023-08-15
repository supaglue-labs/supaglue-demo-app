import { inngest } from "@/inngest/client";
import { transformAndWriteObject } from "@/inngest/functions";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve(inngest, [transformAndWriteObject]);
