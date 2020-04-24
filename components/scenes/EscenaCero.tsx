import React from "react";

import { quotes, hints } from "../../script";
import { Banner } from "../shared/Banner";

export function EscenaCero() {
  return <Banner quote={quotes[0]} hint={hints[0]} />;
}
