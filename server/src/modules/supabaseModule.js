// const firebase = require("firebase");

// const initializeFirebase = (config) => {
//     firebase.initializeApp(config);
// };

// module.exports = { initializeFirebase };
import { supabaseConfig } from "../../config.js";

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(supabaseConfig.url, supabaseConfig.key);
