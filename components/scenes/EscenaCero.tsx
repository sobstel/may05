import React from "react";

import { quotes, hints } from "../../script";
import { Banner } from "./elements/Banner";

export function EscenaCero() {
  return <Banner quote={quotes[0]} hint={hints[0]} />;
}
